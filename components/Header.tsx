"use client";

import Link from "next/link";
import Image from "next/image";
import HamburgerButton from "./HamburgerButton";
import { useMenu } from "@/context/MenuContext";

export default function Header() {
  const { isOpen } = useMenu();

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center z-50 py-5 px-8">
      <Link href={"/"} className="relative z-[70]">
        <Image
          src={"/assets/logo.png"}
          width={50}
          height={50}
          alt="logo"
          priority
          unoptimized
          className={`transition-all duration-500  ease-[cubic-bezier(0.22,1,0.36,1) ${
            isOpen ? "invert" : "invert-0"
          }`}
        />
      </Link>
      <HamburgerButton />
    </header>
  );
}
