"use client";

import Navbar from "@/features/navbar/navbar";
import Sidebar from "@/features/sidebar/sidebar";
import { useState } from "react";


export default function NavbarClient() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar setIsOpen={setIsOpen} />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
