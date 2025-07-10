import { prismaClient } from "@repo/db";
import type { Bookmark, Folder, Tag } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../lib/middleware";
import { z } from "zod";
import type { SearchResult } from "@repo/types";
import { buildFullSlug } from "../../../lib/fullSlug";

const searchQuerySchema = z.object({
  q: z.string().min(1, "Query cannot be empty"),
  scope: z.enum(["dashboard", "folder"]).default("dashboard"),
  folderId: z.string().uuid().optional(),
});

type BookmarkWithTags = Bookmark & {
  tags: Tag[];
};

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth(req);
    if (!session || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchQuerySchema.safeParse({
      q: searchParams.get("q"),
      scope: searchParams.get("scope"),
      folderId: searchParams.get("folderId") ?? undefined,
    });

    if (!query.success) {
      return NextResponse.json(
        { error: query.error.errors.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    const { q, scope, folderId } = query.data;

    const searchClause = {
      OR: [
        { title: { contains: q, mode: "insensitive" as const } },
        { url: { contains: q, mode: "insensitive" as const } },
        { notes: { contains: q, mode: "insensitive" as const } },
        {
          tags: {
            some: {
              name: { contains: q, mode: "insensitive" as const },
            },
          },
        },
      ],
    };

    let bookmarks: BookmarkWithTags[] = [];
    let folders: Folder[] = [];

    if (scope === "dashboard") {
      bookmarks = await prismaClient.bookmark.findMany({
        where: {
          userId: session.user.id,
          ...searchClause,
        },
        include: {
          tags: true,
        },
        take: 20,
      });
      folders = await prismaClient.folder.findMany({
        where: {
          userId: session.user.id,
          name: { contains: q, mode: "insensitive" as const },
        },
        include: {
          bookmarks: true,
        },
        take: 20,
      });
    } else if (scope === "folder" && folderId) {
      bookmarks = await prismaClient.bookmark.findMany({
        where: {
          userId: session.user.id,
          folderId,
          ...searchClause,
        },
        include: {
          tags: true,
        },
        take: 20,
      });

      folders = await prismaClient.folder.findMany({
        where: {
          userId: session.user.id,
          parentId: folderId,
          name: { contains: q, mode: "insensitive" as const },
        },
        take: 20,
      });
    } else {
      return NextResponse.json(
        { error: "Invalid search scope or folderId" },
        { status: 400 }
      );
    }
    const allFolders = await prismaClient.folder.findMany({
      where: {
        userId: session.user.id,
      },
    });
    const foldersMap = new Map<string, Folder>();
    for (const folder of allFolders) {
      foldersMap.set(folder.id, folder);
    }

    const bookmarkResults: SearchResult[] = bookmarks.map((bookmark) => ({
      id: bookmark.id,
      type: "bookmark",
      bookmarkType: bookmark.type,
      favicon: bookmark.favicon || null,
      createdAt: bookmark.createdAt.toISOString(),
      title: bookmark.title,
      url: bookmark.url,
      notes: bookmark.notes,
      folderId: bookmark.folderId,
      tags: bookmark.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
    }));

    const folderResults: SearchResult[] = folders.map((folder) => ({
      id: folder.id,
      type: "folder",
      slug: buildFullSlug(folder, foldersMap),
      icon: folder.icon,
      color: folder.color,
      createdAt: folder.createdAt.toISOString(),
      name: folder.name,
      parentId: folder.parentId,
    }));

    const combined: SearchResult[] = [...bookmarkResults, ...folderResults];

    return NextResponse.json(combined);
  } catch (error) {
    console.error("Error in search handler:", error);
    return NextResponse.json(
      { error: "Something went wrong while processing your search." },
      { status: 500 }
    );
  }
}
