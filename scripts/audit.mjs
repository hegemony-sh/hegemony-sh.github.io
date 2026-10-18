import { spawnSync } from "node:child_process";

// Dependency audit gate: fail on any moderate-or-worse advisory, like
// `npm audit --audit-level=moderate`, except the advisories listed below.
// An entry is only for an advisory that has no patched release to upgrade or
// override to. It stops applying when it expires or when npm audit reports a
// fix without a breaking change, so the gate fails again and the entry gets
// resolved instead of lingering.
const gatedSeverities = new Set(["moderate", "high", "critical"]);
const allowlist = [
  {
    id: "GHSA-vfj7-8cjw-p6xm",
    package: "braces",
    expires: "2027-01-18",
    // No patched release: every braces version (<=3.0.3) is affected and the
    // upstream issue (micromatch/braces#70) has no fix planned. braces is
    // reached only through micromatch in markdownlint-cli2 and stylelint,
    // which expand the glob patterns from this repository's own scripts and
    // config; it is not part of the built site.
    reason: "no patched braces release; dev-only lint tooling on repository-owned globs",
  },
];

// A shell resolves npm on every platform (npm.cmd on Windows); the command is
// a fixed string, so nothing is interpolated into it.
const result = spawnSync("npm audit --json", { encoding: "utf8", shell: true });
let report;
try {
  report = JSON.parse(result.stdout ?? "");
} catch {
  console.error(result.error?.message || result.stderr || result.stdout);
  console.error("npm audit did not return a JSON report.");
  process.exit(1);
}
if (report.error) {
  console.error(`npm audit failed: ${report.error.summary ?? JSON.stringify(report.error)}`);
  process.exit(1);
}

// npm reports `true` for a fix within the declared ranges, `false` for none,
// and {name, version, isSemVerMajor} for a fix that needs --force; only the
// last one with isSemVerMajor set is a breaking change.
function isNonBreakingFix(fixAvailable) {
  if (fixAvailable === true) {
    return true;
  }
  return typeof fixAvailable === "object" && fixAvailable !== null && !fixAvailable.isSemVerMajor;
}

const today = new Date().toISOString().slice(0, 10);
const failures = [];
const allowed = new Set();
const matchedEntries = new Set();

for (const vulnerability of Object.values(report.vulnerabilities ?? {})) {
  // `via` lists advisories (objects) and the vulnerable dependencies the
  // package pulls in (strings); only the advisories themselves are gated.
  for (const advisory of vulnerability.via) {
    if (typeof advisory !== "object" || !gatedSeverities.has(advisory.severity)) {
      continue;
    }
    const id = advisory.url.split("/").pop();
    const label = `${advisory.severity} ${id} in ${advisory.name}@${advisory.range}: ${advisory.title}`;
    const entry = allowlist.find((item) => item.id === id && item.package === advisory.name);

    if (!entry) {
      failures.push(label);
      continue;
    }
    matchedEntries.add(entry);
    if (entry.expires < today) {
      failures.push(`${label} (allowlist entry expired on ${entry.expires})`);
    } else if (isNonBreakingFix(vulnerability.fixAvailable)) {
      failures.push(`${label} (npm audit reports a non-breaking fix)`);
    } else {
      allowed.add(`${id} in ${advisory.name} until ${entry.expires}: ${entry.reason}`);
    }
  }
}

for (const line of allowed) {
  console.log(`Allowed: ${line}`);
}
for (const entry of allowlist) {
  if (!matchedEntries.has(entry)) {
    console.log(`Allowlist entry ${entry.id} (${entry.package}) no longer matches; remove it.`);
  }
}

if (failures.length > 0) {
  console.error(`npm audit found ${failures.length} moderate-or-worse advisories:`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}
console.log("npm audit: no moderate-or-worse advisories outside the allowlist.");
