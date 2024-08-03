import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    if (!params.blogId) {
      return new NextResponse("Blog ID is required!", { status: 400 });
    }

    const blog = await prismadb.blog.findUnique({
      where: {
        id: params.blogId,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; blogId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { title, content, media } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Title is required!", { status: 400 });
    }

    if (!content) {
      return new NextResponse("Content is required!", { status: 400 });
    }

    if (!params.blogId) {
      return new NextResponse("Blog ID is required!", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized!", {
        status: 403,
      });
    }

    const blog = await prismadb.blog.updateMany({
      where: {
        id: params.blogId,
      },
      data: {
        title,
        content,
        media,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; blogId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.blogId) {
      return new NextResponse("Blog ID is required!", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized!", {
        status: 403,
      });
    }

    const blog = await prismadb.blog.deleteMany({
      where: {
        id: params.blogId,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
