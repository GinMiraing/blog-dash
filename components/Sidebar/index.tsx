"use client";

import { ChevronsLeft } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { SidebarItem } from "@/types/sidebar";

import { Button } from "../ui/button";

const SidebarItems: SidebarItem[] = [
  {
    longName: "Comments",
    shortName: "C",
    path: "/",
  },
  {
    longName: "Replies",
    shortName: "R",
    path: "/",
  },
];

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  return (
    <div
      className={cn(
        "relative hidden h-screen flex-col border-r shadow-sm transition-all sm:flex",
        {
          "min-w-[3rem]": !open,
          "min-w-[12rem]": open,
        },
      )}
    >
      {SidebarItems.map((item) => (
        <Button
          key={item.longName}
          className={cn(
            "rounded-none bg-white px-4 text-black hover:bg-black/10",
          )}
        >
          {open ? item.longName : item.shortName}
        </Button>
      ))}
      <div className="absolute -right-10">
        <ChevronsLeft
          onClick={() => setOpen(!open)}
          className={cn(
            "h-10 w-10 rounded p-2 transition-colors hover:cursor-pointer hover:bg-black/5",
            {
              "rotate-180": !open,
              "rotate-0": open,
            },
          )}
        />
      </div>
    </div>
  );
};

export default Sidebar;
