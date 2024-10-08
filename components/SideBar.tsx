"use client"; // Next.js client-side rendering
import {
  FaTachometerAlt,
  FaTools,
  FaWrench,
  FaBuilding,
  FaFileAlt,
  FaCog,
  FaShieldAlt,
  FaUsers,
  FaCogs,
  FaChevronDown,
  FaChevronRight,
  FaStar, // Icon for Startech
  FaLaptopCode, // Icon for Techlend
  FaServer, // Icon for Rayans
  FaCalendarAlt, // Icon for Monthly Reports
  FaChartLine, // Icon for Yearly Reports
  FaSlidersH, // Icon for General Configuration
  FaToolbox, // Icon for Advanced Configuration
  FaUserShield, // Icon for Admin Role
  FaUser,
  FaBars,
  FaTimes, // Icon for User Role
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { icons } from "@/constants";
import { RiMenuUnfold4Line } from "react-icons/ri";
import { RiMenuUnfold3Line } from "react-icons/ri";
// Define the sidebar menu items with nested submenus and icons
const menuItems = [
  { href: "/dashboard", title: "Dashboard", icon: FaTachometerAlt },
  { href: "/assets", title: "Assets", icon: FaTools },
  { href: "/maintenance", title: "Maintenance", icon: FaWrench },
  {
    href: "/vendor",
    title: "Vendor",
    icon: FaBuilding,
    children: [
      { href: "/vendor/startech", title: "Startech", icon: FaStar },
      { href: "/vendor/techlend", title: "Techlend", icon: FaLaptopCode },
      { href: "/vendor/rayans", title: "Rayans", icon: FaServer },
    ],
  },
  {
    href: "/reports",
    title: "Reports",
    icon: FaFileAlt,
    children: [
      { href: "/reports/monthly", title: "Monthly", icon: FaCalendarAlt },
      { href: "/reports/yearly", title: "Yearly", icon: FaChartLine },
    ],
  },
  {
    href: "/configuration",
    title: "Configuration",
    icon: FaCog,
    children: [
      { href: "/configuration/general", title: "General", icon: FaSlidersH },
      { href: "/configuration/advanced", title: "Advanced", icon: FaToolbox },
    ],
  },
  {
    href: "/role-permission",
    title: "Role Permission",
    icon: FaShieldAlt,
    children: [
      { href: "/role-permission/admin", title: "Admin", icon: FaUserShield },
      { href: "/role-permission/user", title: "User", icon: FaUser },
    ],
  },
  { href: "/organization", title: "Organization", icon: FaUsers },
  { href: "/settings", title: "Settings", icon: FaCogs },
];

const Sidebar = () => {
  const pathname = usePathname(); // Get the current path
  const [openMenus, setOpenMenus] = useState<string[]>([]); // State to track open submenus
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen size detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsCollapsed(true); // Automatically collapse on smaller screens
      } else {
        setIsMobile(false);
        setIsCollapsed(false); // Default to expanded on larger screens
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle the sidebar's collapsed state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  // Function to toggle menu visibility
  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-60"
      } bg-white text-white flex flex-col rounded-lg h-full overflow-y-auto sidebar transition-all duration-500 ease-in-out`}
    >
      {/* Sidebar top icon */}
      <div className="flex flex-col justify-between items-center py-4">
        <div
          className={`flex ${
            isCollapsed ? "justify-center" : "justify-end pe-4"
          } w-full `}
        >
          <button onClick={toggleSidebar} className="text-black">
            {isCollapsed ? (
              <RiMenuUnfold3Line className="text-2xl" />
            ) : (
              <RiMenuUnfold4Line className="text-2xl" />
            )}
          </button>
        </div>
        <div className="p-4 flex justify-center items-center flex-col">
          <Image
            height={100}
            width={isCollapsed ? 100 : 150}
            objectFit="contain"
            layout="responsive"
            src={icons.siteLogo}
            alt="logo"
          />
        </div>
      </div>

      {/* Sidebar menu items */}
      <nav className="flex-1">
        <ul className="space-y-4 p-4">
          {menuItems.map((item, index) => {
            // Check if the current item is active
            const isActive = pathname === item.href;

            // Check if this menu has children (nested items)
            const hasChildren = !!item.children;

            return (
              <li key={index}>
                <div
                  className={`flex items-center justify-between space-x-2 p-2 rounded-md cursor-pointer font-bold
                    ${
                      isActive
                        ? "text-primary-1 bg-gradient-to-r from-primary-3 to-primary-4 border-l-4 border-primary-1"
                        : "text-gray_theme hover:bg-gray_theme-700"
                    }${isCollapsed ? "justify-center" : ""}`}
                  onClick={() => hasChildren && toggleMenu(item.title)} // Toggle submenu on click
                >
                  <Link
                    href={hasChildren ? "#" : item.href}
                    className="flex items-center space-x-2"
                  >
                    <item.icon />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>

                  {hasChildren && (
                    <span>
                      {openMenus.includes(item.title) ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </div>

                {/* Nested menu (if applicable) */}
                {hasChildren && openMenus.includes(item.title) && (
                  <ul className={`${isCollapsed ? "" : "pl-6"} mt-2 space-y-2`}>
                    {item.children.map((subItem, subIndex) => {
                      const isSubActive = pathname === subItem.href;

                      return (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href}
                            className={`flex items-center space-x-2 p-2 rounded-md
                              ${
                                isSubActive
                                  ? "text-primary-1 bg-gradient-to-r from-primary-3 to-primary-4 border-l-4 border-primary-1"
                                  : "text-gray_theme hover:bg-gray_theme-700"
                              }`}
                          >
                            <subItem.icon />
                            {!isCollapsed && <span>{subItem.title}</span>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
