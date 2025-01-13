"use client";
import React from "react";
import { Button } from "./ui/button";
import { TbSquareRoundedArrowLeft } from "react-icons/tb";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      className="text-lg flex items-center justify-center gap-2 px-0 w-[110px] bg-white"
      onClick={() => router.back()}
    >
      <TbSquareRoundedArrowLeft className="text-xl"></TbSquareRoundedArrowLeft>
      Back
    </Button>
  );
};

export default BackButton;
