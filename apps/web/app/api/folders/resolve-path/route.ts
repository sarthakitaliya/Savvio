import { prismaClient } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../../lib/middleware";

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const slugsParams = url.searchParams.get("slug");
    if (!slugsParams) {
      return NextResponse.json(
        { error: "Missing slugs query parameter" },
        { status: 400 }
      );
    }

    const slugs = slugsParams.split(",").map((s) => s.trim());
    let parentId: string | null = null;
    let currentFolder = null;

    for (const slug of slugs) {
      currentFolder = await prismaClient.folder.findFirst({
        where: {
          slug: slug,
          parentId,
          userId: session.user.id,
        },
      });

      if (!currentFolder) {
        return NextResponse.json(
          { error: `Folder '${slug}' not found` },
          { status: 404 }
        );
      }

      parentId = currentFolder.id;
    }

    return NextResponse.json({ folder: currentFolder }, { status: 200 });
  } catch (error) {
    console.error("Error resolving folder path:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
