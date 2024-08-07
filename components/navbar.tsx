import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "./theme-toggle";
import ToggleButton from "./ui/toggle-button";

export default async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <nav className="bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600 py-2 px-2 md:px-4 lg:px-6">
      <div className="max-w-screen-xl flex flex-wrap justify-between items-center mx-auto gap-2">
        <StoreSwitcher items={stores} />
        <div className="flex lg:order-2 gap-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
          <ToggleButton />
        </div>
        <div className="w-full lg:flex lg:w-auto lg:order-1" id="navbar-sticky">
          <MainNav className="lg:mx-6" />
        </div>
      </div>
    </nav>
  );
}
