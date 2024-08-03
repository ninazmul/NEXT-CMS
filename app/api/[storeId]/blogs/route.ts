import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    if (!params.storeId) {
      return new NextResponse("Store ID is required!", { status: 400 });
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

    const blog = await prismadb.blog.create({
      data: {
        title,
        content,
        media,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required!", { status: 400 });
    }

    const blogs = await prismadb.blog.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
