"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <Link href="/" className="inline-flex items-center">
          <img
            alt="MongoDB logo"
            className="h-10 inline"
            src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg"
          />
        </Link>

        <Link
          href="/create"
          className={`inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3
            ${pathname === "/create" ? "bg-slate-100" : ""}`}
        >
          Create User
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
