import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { images } from "@/constants";

const DashBoard = () => {
  const cards = [
    {
      title: "Total Assets",
      number: 12635,
      icon: images.total_assets,
    },
    {
      title: "Total Floors",
      number: 12635,
      icon: images.total_floors,
    },
    {
      title: "Total Reader",
      number: 12635,
      icon: images.total_reader,
    },
    {
      title: "Total Vendor",
      number: 12635,
      icon: images.total_vender,
    },
  ];
  return (
    <section className="h-screen w-full">
      <div
        className="bannerSection w-full h-40 rounded-lg"
        style={{
          backgroundImage: `url(/assets/images/dashboard_bg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="cardContainer mt-[-20px] grid grid-cols-2 xl:grid-cols-4 gap-5 px-5">
        {cards.map((card, index) => (
          <Card className="bg-white border-none h-52 lg:h-40 ">
            <div className="flex justify-around items-center flex-col lg:flex-row h-full">
              <div className="relative w-4/12">
                <Image
                  height={92}
                  width={100}
                  objectFit="cover"
                  layout="responsive"
                  src={card.icon}
                  alt="icon"
                ></Image>
              </div>

              <div className="flex flex-col items-center justify-center">
                <p className="text-xl text-primary-1">{card.title}</p>
                <h5 className="text-3xl font-bold text-primary-1">
                  {card.number}
                </h5>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default DashBoard;
