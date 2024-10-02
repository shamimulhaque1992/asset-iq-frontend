"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Shadcn UI Button component
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Shadcn UI Dropdown components
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import { TbArrowBadgeRight } from "react-icons/tb";
import Image from "next/image";
import { icons } from "@/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [openProductDropdown, setOpenProductDropdown] = useState(false);
  const [openCompanyDropdown, setOpenCompanyDropdown] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="container w-9/12"
      style={{
        height: "100vh",
        backgroundImage: "url(/assets/images/project_cover.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
      <nav className="flex justify-between items-center py-4 bg-white border-b border-gray">
        {/* Left Side: Logo and Nav Items */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link href="/">
            <Image width={50} height={50} src={icons.Logo} alt="logo"></Image>
          </Link>

          {/* Nav Items */}
          <div className="space-x-4">
            {/* Product Dropdown */}
            <DropdownMenu
              open={openProductDropdown}
              onOpenChange={setOpenProductDropdown}
            >
              <DropdownMenuTrigger asChild className="relative">
                <Button variant="link">Product</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white absolute left-[-25px]
              border-none shadow-xl"
              >
                <DropdownMenuItem className="">
                  <Card className="w-[350px] border-none shadow-none">
                    <CardHeader>
                      <CardTitle>Create project</CardTitle>
                      <CardDescription>
                        Deploy your new project in one-click.
                      </CardDescription>
                    </CardHeader>
                    <CardContent></CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button>Deploy</Button>
                    </CardFooter>
                  </Card>
                </DropdownMenuItem>
                <DropdownMenuItem>Feature 2</DropdownMenuItem>
                <DropdownMenuItem>Feature 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Docs */}
            <Link href="/docs">Docs</Link>

            {/* Changelog */}
            <Link href="/changelog">Changelog</Link>

            {/* Pricing */}
            <Link href="/pricing">Pricing</Link>

            {/* Company Dropdown */}
            <DropdownMenu
              open={openCompanyDropdown}
              onOpenChange={setOpenCompanyDropdown}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="link">Company</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>About Us</DropdownMenuItem>
                <DropdownMenuItem>Careers</DropdownMenuItem>
                <DropdownMenuItem>Contact</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Right Side: Sign In / Dashboard */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <Link href="/sign-in">Sign In</Link>
          ) : (
            <>
              <SignOutButton>
                <Button className="bg-transparent shadow-none">Sign Out</Button>
              </SignOutButton>{" "}
              <Link href="/dashboard">
                <Button
                  className="bg-black text-white flex items-center relative overflow-hidden"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  Dashboard
                  <TbArrowBadgeRight
                    className={`transition-transform duration-300 ease-in-out ${
                      hovered
                        ? "translate-x-3 opacity-0"
                        : "translate-x-1 opacity-100"
                    }`}
                  ></TbArrowBadgeRight>
                  <TbArrowBadgeRight
                    className={`transition-transform duration-300 ease-in-out ${
                      hovered
                        ? "-translate-x-1 opacity-100"
                        : "-translate-x-3 opacity-0"
                    }`}
                  ></TbArrowBadgeRight>
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
