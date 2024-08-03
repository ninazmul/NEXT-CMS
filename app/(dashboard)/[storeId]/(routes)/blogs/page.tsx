import prismadb from "@/lib/prismadb";
import BlogClient from "./components/client";
import { format } from "date-fns";
import { BlogColumn } from "./components/columns";

export default async function BlogsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const blogs = await prismadb.blog.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBlogs: BlogColumn[] = blogs.map((item) => ({
    id: item.id,
    title: item.title,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogClient data={formattedBlogs} />
      </div>
    </div>
  );
}
