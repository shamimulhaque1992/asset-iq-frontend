"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { TbSlash } from "react-icons/tb";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BreadcrumbObject } from "@/types/asset";

const CustomBreadcrumb = () => {
  const pathname = usePathname();
  function createBreadcrumbs(path: string): BreadcrumbObject[] {
    const segments = path.split("/").filter(Boolean); // Split by '/' and remove empty strings
    let currentPath = ""; // Initialize an empty string to build the href

    return segments.map((segment) => {
      currentPath += `/${segment}`; // Build the href for each segment

      return {
        name: segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalize and format the name
        href: currentPath, // Set the href for this segment
      };
    });
  }

  // Example usage:
  const breadcrumbs = createBreadcrumbs(pathname);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs?.map((item, index) => {
          if (index !== breadcrumbs.length - 1) {
            return (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="text-primary-1 hover:text-primary-1"
                    href={item.href}
                  >
                    {item?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <TbSlash />
                </BreadcrumbSeparator>
              </>
            );
          } else {
            return (
              <BreadcrumbItem>
                <BreadcrumbPage className="text-secondary-1">
                  {item.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
