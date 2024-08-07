"use client";

import { Menu } from "lucide-react";

export default function ToggleButton() {
  const handleToggle = () => {
    const navbar = document.getElementById("navbar-sticky");
    if (navbar) {
      navbar.classList.toggle("hidden");
    }
  };

  return (
    <button
      data-collapse-toggle="navbar-sticky"
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-sticky"
      aria-expanded="false"
      onClick={handleToggle}
    >
      <span className="sr-only">Open main menu</span>
      <Menu className="text-gray-600" />
    </button>
  );
}
