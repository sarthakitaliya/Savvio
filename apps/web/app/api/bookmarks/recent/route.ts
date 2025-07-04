import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../../lib/middleware";
import { prismaClient } from "@repo/db";

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth(req);
    if (!session || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") || 10);

    const bookmarks = await prismaClient.bookmark.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      include: {
        tags: true,
        folder: true,
      },
    });
    return NextResponse.json({ bookmarks }, { status: 200 });
  } catch (error) {
    console.error("Error in recent bookmarks API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
