import { cp, mkdir, rm, access } from "node:fs/promises";
import path from "node:path";

async function exists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const root = process.cwd();
  const distDir = path.join(root, "dist");
  const standaloneDir = path.join(root, ".next", "standalone");
  const staticDir = path.join(root, ".next", "static");
  const publicDir = path.join(root, "public");

  if (!(await exists(standaloneDir))) {
    throw new Error("Missing .next/standalone. Run `npm run build` first.");
  }

  if (!(await exists(staticDir))) {
    throw new Error("Missing .next/static. Run `npm run build` first.");
  }

  // Start from a clean output directory to avoid stale files in deployments.
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  // Copy standalone server bundle to dist root.
  await cp(standaloneDir, distDir, { recursive: true });

  // Copy static assets to dist/.next/static.
  await mkdir(path.join(distDir, ".next"), { recursive: true });
  await cp(staticDir, path.join(distDir, ".next", "static"), {
    recursive: true,
  });

  // Copy public directory when present.
  if (await exists(publicDir)) {
    await cp(publicDir, path.join(distDir, "public"), { recursive: true });
  }

  console.log("dist rebuilt with standalone structure.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
