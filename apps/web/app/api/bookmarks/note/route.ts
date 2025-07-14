import { prismaClient } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../../lib/middleware";

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth();
    if (!session || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Bookmark ID is required" },
        { status: 400 }
      );
    }

    const bookmark = await prismaClient.bookmark.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        tags: true,
      },
    });
    console.log("Fetched bookmark:", bookmark);

    return NextResponse.json({ bookmark }, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
