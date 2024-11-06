"use client";
import React, { Fragment } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

export default function ViewClashItems({ clash }: { clash: ClashType }) {
  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {clash?.ClashItem &&
          clash.ClashItem.length > 0 &&
          clash.ClashItem.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                  <div className="w-full flex justify-center items-center  p-2 h-[300px]">
                    <Image
                      src={getImageUrl(item.image)}
                      width={500}
                      height={500}
                      alt="preview-1"
                      className="w-full h-[300px] object-contain rounded-xl"
                    />
                  </div>
                </div>

                {index % 2 === 0 && (
                  <div className="flex w-full lg:w-auto justify-center items-center">
                    <h1 className="text-7xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                      VS
                    </h1>
                  </div>
                )}
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}
