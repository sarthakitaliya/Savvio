import { prismaClient } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../lib/middleware";
import { detectType } from "../../../lib/utils";
import { z } from "zod";

const bookmarkSchema = z.object({
  url: z.string().url(),
  notes: z.string().max(500).optional(),
  folderId: z.string().uuid().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth(req);
    if (!session || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookmarks = await prismaClient.bookmark.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ bookmarks }, { status: 200 });
  } catch (error) {
    console.error("Error in bookmarks API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth(req);
    if (!session || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();

    const validation = bookmarkSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues },
        { status: 400 }
      );
    }
    const { url, notes, folderId } = validation.data;

    const type = detectType(url);

    const bookmark = await prismaClient.bookmark.create({
      data: {
        title: "untitled", // fetch metadata later
        url,
        notes,
        type,
        userId: session.user.id,
        folderId: folderId || null,
      },
    });
    return NextResponse.json({ bookmark }, { status: 201 });
  } catch (error) {
    console.error("Error in bookmarks API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireAuth(req);
    if (!session || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { id, url, notes, folderId } = body;

    const validation = bookmarkSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues },
        { status: 400 }
      );
    }

    const bookmark = await prismaClient.bookmark.update({
      where: { id },
      data: {
        url,
        notes,
        folderId: folderId || null,
      },
    });
    return NextResponse.json({ bookmark }, { status: 200 });
  } catch (error) {
    console.error("Error in bookmarks API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await requireAuth(req);
    if (!session || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Bookmark ID is required" },
        { status: 400 }
      );
    }

    await prismaClient.bookmark.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Bookmark deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in bookmarks API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
