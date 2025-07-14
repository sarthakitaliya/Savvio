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
    const parentId = url.searchParams.get("parentId");
    if (!parentId) {
      return NextResponse.json(
        { error: "Parent ID is required" },
        { status: 400 }
      );
    }
    const folders = await prismaClient.folder.findMany({
      where: {
        userId: session.user.id,
        parentId: parentId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            bookmarks: true,
          },
        },
      },
    });

    return NextResponse.json({ folders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subfolders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
