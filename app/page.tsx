"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BeraIcon from "../public/img/poker_logo.png";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, [router]);

  return (
    <div className="flex flex-col py-11 px-10 max-sm:p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full self-center">
        <div className="flex flex-col p-5 h-96 gap-2 items-center justify-center bg-white rounded-xl shadow-lg col-span-2">
          <div className="flex flex-col justify-center items-center gap-8">
            <div className="flex items-center">
              <Image src={BeraIcon} alt="Pocket icon" />
              <div className="ml-7  max-sm:ml-4">
                <p className="text-black text-3xl max-sm:text-2xl font-semibold">
                  POCKET RADAR
                </p>
              </div>
            </div>
            <div>
              <i className="fa-solid fa-spinner animate-spin fa-4x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
