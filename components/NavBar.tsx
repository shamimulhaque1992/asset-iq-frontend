import { FaBell, FaUserCircle } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="w-full h-16 flex items-center justify-between px-6 shadow-md rounded-md">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 text-primary-1" />
        <Input
          type="text"
          id="text"
          placeholder="Search"
          className="pl-10 pr-3 py-2 text-md w-96 border border-gray rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-gray-500 placeholder:text-gray" // Add additional styling as needed
        />
      </div>

      {/* Right-side Icons and User Info */}
      <div className="flex items-center space-x-6">
        <IoIosNotificationsOutline className="text-xl text-gray-600 rounded-lg h-8 w-8 bg-primary-1 text-white" />
        <div className="flex items-center space-x-2">
          <CiUser className="text-2xl text-gray-600 rounded-lg h-8 w-8 bg-primary-1 text-white" />
          <span className="text-gray-700 font-medium">John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
