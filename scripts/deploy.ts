import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

function run(cmd: string, cwd?: string) {
  return execSync(cmd, { cwd, stdio: "inherit" });
}

function get(cmd: string, cwd?: string): string {
  return execSync(cmd, { cwd, encoding: "utf8" }).trim();
}

console.log("1. Building static export...");
run("npm run build");

const outDir = resolve(process.cwd(), "out");
if (!existsSync(resolve(outDir, "index.html"))) {
  throw new Error("Build failed: out/index.html does not exist.");
}

console.log("2. Preparing deploy branch...");
const remoteUrl = get("git remote get-url origin");

// Reinitialize git in out directory cleanly
const gitDir = resolve(outDir, ".git");
if (existsSync(gitDir)) {
  rmSync(gitDir, { recursive: true, force: true });
}

run("git init -b deploy", outDir);
run(`git remote add origin "${remoteUrl}"`, outDir);
run("git add -A", outDir);
const commitMsg = `Deploy: ${new Date().toISOString()}`;
run(`git commit -m "${commitMsg}"`, outDir);

console.log("3. Pushing to branch 'deploy' on GitHub...");
run("git push origin deploy --force", outDir);

console.log("\nDone! Pushed static files to branch 'deploy'.");
console.log("Di hPanel Hostinger:");
console.log("1. Buka menu Git.");
console.log("2. Pilih branch 'deploy'.");
console.log("3. Set directory ke 'public_html'.");
console.log("4. Klik Deploy / Pull.");
