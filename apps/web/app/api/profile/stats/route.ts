import { prismaClient } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../../lib/middleware";


export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const [totalFolders, totalBookmarks] = await Promise.all([
      prismaClient.folder.count({
        where: { userId },
      }),
      prismaClient.bookmark.count({
        where: { userId },
      }),
    ]);

    return NextResponse.json({
      totalFolders,
      totalBookmarks,
    });
  } catch (error) {
    console.error("Error fetching profile stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}