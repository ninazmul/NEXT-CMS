"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BlogColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface BlogClientProps {
  data: BlogColumn[];
}

const BlogClient: React.FC<BlogClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Blogs (${data.length})`}
          description="Manage blogs for your store."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/blogs/create`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
      <Heading title="API" description="API calls for Blogs" />
      <Separator />
      <ApiList entityName="blogs" entityIdName="blogId" />
    </>
  );
};

export default BlogClient;
