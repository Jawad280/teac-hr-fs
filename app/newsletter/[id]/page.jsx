"use client";
import React from "react";
import useSWR from "swr";
import { PrinterIcon } from "lucide-react";
import Image from "next/image";

const PublicNewsletter = ({ params }) => {
  const id = params.id;
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${apiUrl}/api/newsletters/${id}`,
    fetcher
  );

  const sortedSections = data?.sections.sort((a, b) => a.index - b.index);

  function splitArrayIntoChunks(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  }

  return (
    <div className="box-border flex flex-col items-center relative w-full">
      <div className="box-border m-0 p-0 relative min-w-[325px] w-full flex flex-col items-center">
        {sortedSections?.map((sect) => (
          <div key={sect.id} className="box-border w-full">
            {sect.isCover && (
              <div className="box-border flex flex-col items-center p-4 gap-6 justify-center w-full">
                <div className="font-bold text-[45px] box-border w-full flex flex-col items-center">
                  {sect?.title}
                </div>
                <Image width={400} height={400} alt="logo" src="/logo.svg" />
                <div className="font-semibold text-[25px]">
                  {" "}
                  {sect?.subtitle}
                </div>
              </div>
            )}

            {sect.isImage &&
              splitArrayIntoChunks(sect.gallery, 9).map((arr, index) => (
                <div
                  className="box-border flex flex-col items-center justify-center p-4 gap-6 w-full"
                  key={index}
                >
                  <div className="font-bold text-[20px]">{sect?.title}</div>
                  <div className="font-semibold text-[18px]">
                    {sect?.subtitle}
                  </div>
                  <div className="flex flex-wrap gap-6 box-border justify-center">
                    {arr.map((img, index) => (
                      <div key={index} className="relative w-[5cm] h-[7cm]">
                        <Image
                          fill
                          src={img}
                          objectFit="cover"
                          alt="pictures"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            {!sect.isCover && !sect.isImage && (
              <div className="box-border flex flex-col items-center justify-center min-h-[14.8cm] gap-6 w-full">
                <div className="font-bold text-[40px] text-center">
                  {sect?.title}
                </div>
                <div
                  className="font-semibold text-[30px] text-center"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {sect?.subtitle}
                </div>
                <div
                  className="font-default text-[18px] px-10 box-border w-full"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {sect?.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicNewsletter;
