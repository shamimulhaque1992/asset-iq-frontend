import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TbSlash } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { TbSquareRoundedArrowLeft } from "react-icons/tb";
import { CiTrash } from "react-icons/ci";
import { BiCheckboxChecked } from "react-icons/bi";
import { useRouter } from "next/router";
import BackButton from "@/components/BackButton";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";

const page = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center py-4">
        <h4 className="text-3xl text-red font-bold text-primary-1">
          Add Assets
        </h4>
        <CustomBreadcrumb ></CustomBreadcrumb>
      </div>
      <div className="flex justify-between items-center py-4">
        <div className="w-6/12 flex items-center space-x-8 text-primary-1">
          <BackButton></BackButton>
          <Button className="text-lg flex items-center justify-center gap-2 px-0 w-[110px] bg-white">
            <CiTrash className="text-xl"></CiTrash>
            Delete
          </Button>
        </div>
        <div className="">
          <Button className="text-lg flex items-center justify-center gap-1 px-0 w-[110px] text-white bg-primary-1">
            <BiCheckboxChecked className="text-3xl rounded-lg"></BiCheckboxChecked>
            Save
          </Button>
        </div>
      </div>
      <div className="h-screen bg-white">
        <div className="h-16 bg-secondary-3 rounded-t-lg flex items-center ps-8">
          <h4 className="text-2xl text-red font-bold">Create Asset</h4>
        </div>
      </div>
    </div>
  );
};

export default page;
