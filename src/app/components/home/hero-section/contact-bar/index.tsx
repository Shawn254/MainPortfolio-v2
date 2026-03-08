"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ContactBar = () => {
  const [contactBarData, setContactBarData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContactBarData(data?.contactBar);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="border-t border-softGray">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 md:py-7">
            {/* Contact Items */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 md:gap-5 lg:gap-11">
              {contactBarData?.contactItems?.map(
                (value: any, index: number) => (
                  <Link
                    className="..."
                        href={value?.link || "https://wa.me/+254721447397"} // This pulls the specific link from your JSON
                        target="_blank"           // This opens it in a new tab (better for UX)
                      >
                        {value?.title}
                  
                    <Image
                      src={getImgPath(value?.icon)}
                      alt={value?.type}
                      width={24}
                      height={24}
                      className="min-w-[24px] min-h-[24px]"
                    />

                    <h6 className="text-sm md:text-base xl:text-xl hover:text-primary">
                      {value?.label}
                    </h6>
                  </Link>
                )
              )}
            </div>

            {/* Social Items */}
            <div className="flex items-center justify-center md:justify-end gap-4 md:gap-2.5">
              {contactBarData?.socialItems?.map((value: any, index: number) => (
                <Link
                  className="..."
                        href={value?.link || "https://www.linkedin.com/in/shawn-nderitu-a6a890200/"} // This pulls the specific link from your JSON
                        target="_blank"           // This opens it in a new tab (better for UX)
                      >
                        {value?.title}
                
                  <Image
                    src={getImgPath(value?.icon)}
                    alt={value?.platform}
                    width={30}
                    height={30}
                    className="hover:opacity-80"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBar;
