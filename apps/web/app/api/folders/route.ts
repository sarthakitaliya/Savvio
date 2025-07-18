import { prismaClient } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../../lib/middleware";
import { z } from "zod";
import type { CreateFolderPayload, UpdateFolderPayload } from "@repo/types";
import slugify from "slugify";
import { nanoid } from "nanoid";

const folderSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(100),
  parentId: z.string().uuid().optional().nullable(),
  color: z.string().optional(),
  icon: z.string().optional(),
});

export async function GET() {
  try {
    const session = await requireAuth();
    if (!session || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const folders = await prismaClient.folder.findMany({
      where: {
        userId: session.user.id,
        parentId: null, // Fetch only top-level folders
      },
      include: {
        //subfolders
        children: {
          select: {
            id: true,
            name: true,
          },
        },

        _count: { select: { bookmarks: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ folders }, { status: 200 });
  } catch (error) {
    console.error("Error in folders API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    if (!session || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body: CreateFolderPayload = await req.json();

    const validation = folderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues },
        { status: 400 }
      );
    }
    const { name, parentId, color, icon } = validation.data;
    const slug =
      slugify(name, {
        lower: true,
        strict: true,
      }) +
      "-" +
      nanoid(5);
    const folder = await prismaClient.folder.create({
      data: {
        name,
        slug,
        color,
        icon,
        parentId: parentId || null,
        userId: session.user.id,
      },
    });
    return NextResponse.json({ folder }, { status: 201 });
  } catch (error) {
    console.error("Error in folders API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireAuth();
    if (!session || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body: UpdateFolderPayload = await req.json();

    const validation = folderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues },
        { status: 400 }
      );
    }
    const { id, name, parentId, color, icon } = validation.data;

    const folder = await prismaClient.folder.update({
      where: { id },
      data: {
        name,
        color,
        icon,
        parentId: parentId || null,
      },
    });
    return NextResponse.json({ folder }, { status: 200 });
  } catch (error) {
    console.error("Error in folders API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await requireAuth();
    if (!session || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Folder ID is required" },
        { status: 400 }
      );
    }

    await prismaClient.folder.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Folder deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in folders API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
