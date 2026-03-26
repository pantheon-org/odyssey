#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

const SKILL_NAME = "web-dev-estimation";
const SKILL_FILES = ["SKILL.md", "references/calibration.md", "references/patterns.md", "references/honesty-rules.md", "evals/evals.json"];

const TARGETS = [
  { key: "1", label: "Claude Code (global)", path: path.join(os.homedir(), ".claude", "skills", SKILL_NAME) },
  { key: "2", label: "Cursor (global)", path: path.join(os.homedir(), ".cursor", "skills", SKILL_NAME) },
  { key: "3", label: "Cursor (project)", path: path.join(process.cwd(), ".cursor", "skills", SKILL_NAME) },
  { key: "4", label: "Agent Skills standard (project)", path: path.join(process.cwd(), ".agents", "skills", SKILL_NAME) },
];

function banner() {
  console.log("");
  console.log("  ╔══════════════════════════════════════════════════╗");
  console.log("  ║          web-dev-estimation installer            ║");
  console.log("  ║   Agent-calibrated estimation for AI coders      ║");
  console.log("  ╚══════════════════════════════════════════════════╝");
  console.log("");
  console.log("  by Eric Cappannelli — linkedin.com/in/ecappannelli");
  console.log("  Crafted with love in Baie-Saint-Paul, Quebec, Canada");
  console.log("");
}

function findSkillRoot() {
  // When run via npx from npm registry, files are in the package root
  let root = path.resolve(__dirname, "..");
  if (fs.existsSync(path.join(root, "SKILL.md"))) return root;

  // When run locally
  root = process.cwd();
  if (fs.existsSync(path.join(root, "SKILL.md"))) return root;

  return null;
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      if (["node_modules", ".git", "bin", "package.json", "package-lock.json", "_refs", ".gitignore"].includes(entry)) continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function detectExisting() {
  const found = [];
  for (const t of TARGETS) {
    if (fs.existsSync(path.join(t.path, "SKILL.md"))) {
      found.push(t);
    }
  }
  return found;
}

async function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  banner();

  const skillRoot = findSkillRoot();
  if (!skillRoot) {
    console.error("  Error: Could not find SKILL.md source files.");
    console.error("  Make sure you're running this from the skill directory or via npx.");
    process.exit(1);
  }

  const existing = detectExisting();
  if (existing.length > 0) {
    console.log("  Already installed in:");
    for (const t of existing) console.log(`    - ${t.label} (${t.path})`);
    console.log("");
  }

  console.log("  Where do you want to install?");
  console.log("");
  for (const t of TARGETS) {
    const tag = existing.some((e) => e.key === t.key) ? " [update]" : "";
    console.log(`    ${t.key}) ${t.label}${tag}`);
    console.log(`       ${t.path}`);
  }
  console.log(`    5) Custom path`);
  console.log("");

  const choice = await ask("  Your choice (1-5): ");

  let destPath;
  if (choice === "5") {
    const custom = await ask("  Enter full path: ");
    destPath = path.resolve(custom);
  } else {
    const target = TARGETS.find((t) => t.key === choice);
    if (!target) {
      console.error("  Invalid choice.");
      process.exit(1);
    }
    destPath = target.path;
  }

  if (fs.existsSync(path.join(destPath, "SKILL.md"))) {
    const confirm = await ask(`  ${destPath} already exists. Overwrite? (y/N): `);
    if (confirm.toLowerCase() !== "y") {
      console.log("  Cancelled.");
      process.exit(0);
    }
  }

  console.log("");
  console.log(`  Installing to ${destPath} ...`);

  copyRecursive(skillRoot, destPath);

  // Remove installer artifacts from the destination
  const artifacts = ["bin", "package.json", "package-lock.json", "node_modules"];
  for (const a of artifacts) {
    const p = path.join(destPath, a);
    if (fs.existsSync(p)) {
      fs.rmSync(p, { recursive: true, force: true });
    }
  }

  console.log("");
  console.log("  ✓ Installed successfully!");
  console.log("");
  console.log("  Files:");
  for (const f of SKILL_FILES) {
    const full = path.join(destPath, f);
    if (fs.existsSync(full)) console.log(`    ✓ ${f}`);
  }
  console.log("");
  console.log("  Usage: just ask your agent to estimate a task.");
  console.log('  Example: "How long would it take to add Stripe webhooks?"');
  console.log("");
  console.log("  ─────────────────────────────────────────────────");
  console.log("  github.com/ecappa/web-dev-estimation");
  console.log("  linkedin.com/in/ecappannelli");
  console.log("  ─────────────────────────────────────────────────");
  console.log("");
}

main().catch((err) => {
  console.error("  Error:", err.message);
  process.exit(1);
});
