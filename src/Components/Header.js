// components/Header.js
import { useState } from "react";
import { Button, Group } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";

export default function AppHeader() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <Image src="/logo.png" alt="Logo" width={50} height={50} />
              <span className="ml-3 text-2xl font-bold text-gray-800">
                Resume Analyzer
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <span className="relative text-gray-700 cursor-pointer group">
                Home
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>

            {/* Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span className="relative text-gray-700 cursor-pointer group">
                Tools
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </span>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-10 left-0 w-40 bg-white shadow-lg rounded-md py-2 overflow-hidden transition-all duration-300 transform origin-top ${
                  isDropdownOpen
                    ? "scale-y-100 opacity-100"
                    : "scale-y-0 opacity-0"
                }`}
              >
                <Link href="/analyze">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Analysis
                  </span>
                </Link>
                <Link href="/match">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Job Match
                  </span>
                </Link>
              </div>
            </div>

            <Link href="/about">
              <span className="relative text-gray-700 cursor-pointer group">
                About
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="subtle"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <IoMdMenu size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg w-full">
            <Link href="/">
              <span className="block px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer">
                Home
              </span>
            </Link>

            <div className="px-6 py-3">
              <span className="text-gray-700 font-medium">Tools</span>
              <div className="mt-2 pl-4">
                <Link href="/analyze">
                  <span className="block py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Analysis
                  </span>
                </Link>
                <Link href="/match">
                  <span className="block py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Job Match
                  </span>
                </Link>
              </div>
            </div>

            <Link href="/about">
              <span className="block px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer">
                About
              </span>
            </Link>
          </div>
        )}
      </header>
      <div className="pb-20"></div>
    </>
  );
}
