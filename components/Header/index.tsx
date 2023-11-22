"use client";

import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="flex h-16 items-center border-b px-6 shadow-sm">
      <Link
        className="text-2xl"
        href="/"
      >
        Dash
      </Link>
    </header>
  );
};

export default Header;
