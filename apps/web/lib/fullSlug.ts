import type { Folder } from "@prisma/client";

export function buildFullSlug(
  folder: Folder,
  foldersMap: Map<string, Folder>
): string {
  const parts = [folder.slug];
  let current = folder;

  while (current.parentId) {
    const parent = foldersMap.get(current.parentId);
    if (!parent) break;
    parts.unshift(parent.slug);
    current = parent;
  }

  return parts.join("/");
}
