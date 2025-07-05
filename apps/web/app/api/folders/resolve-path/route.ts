
import { prismaClient } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../../lib/middleware";

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const segmentsParam = url.searchParams.get("segments");
    if (!segmentsParam) {
      return NextResponse.json(
        { error: "Missing segments query parameter" },
        { status: 400 }
      );
    }

    const segments = segmentsParam.split(",").map((s) => s.trim());
    let parentId: string | null = null;
    let currentFolder = null;

    for (const segment of segments) {
      currentFolder = await prismaClient.folder.findFirst({
        where: {
          name: segment,
          parentId,
          userId: session.user.id,
        },
      });

      if (!currentFolder) {
        return NextResponse.json(
          { error: `Folder '${segment}' not found` },
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