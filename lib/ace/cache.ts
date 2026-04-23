import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

function cacheRoot() {
  return path.join(process.cwd(), ".cache", "ace");
}

function cachePath(namespace: string, key: string) {
  const digest = createHash("sha256").update(key).digest("hex");
  return path.join(cacheRoot(), namespace, `${digest}.json`);
}

export async function readAceCache<T>(namespace: string, key: string) {
  try {
    const filePath = cachePath(namespace, key);
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeAceCache<T>(namespace: string, key: string, value: T) {
  const filePath = cachePath(namespace, key);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}
