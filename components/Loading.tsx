/* eslint-disable @next/next/no-img-element */
"use client";

export default function Loading() {
  return (
    <div className="flex flex-col h-screen fixed w-screen top-0 left-0 z-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full self-center h-full">
        <div className="flex flex-col p-5 h-full gap-2 items-center justify-center gradient-bg col-span-2 relative ">
          <div className="flex flex-col justify-center items-center gap-8">
            <div className="flex items-center">
              <div className="w-full flex flex-col justify-center items-center col-span-2 gap-6 py-56 max-sm:py-44 max-sm:pt-20 pt-36">
                <div className="text-7xl max-sm:text-3xl flex w-full justify-center gap-4 font-semibold text-white relative z-10">
                  <p>The</p>
                  <p className="font-light">Mega</p>
                  <p>Explorer</p>
                </div>
                <div className="absolute left-0 bottom-0 z-0 animate-pulse">
                  <img src="/icons/team.svg" className="wigtg" alt="team" />
                </div>
                <div className="text-white flex max-sm:hidden justify-between gap-3 text-xl max-sm:text-center max-sm:text-sm absolute bottom-5 right-5 z-10">
                  <div>
                    <p className="font-semibold uppercase">
                      Are you ready to be part of the blockchain revolution,
                      real time?
                    </p>
                    <p className="font-light">
                      Join us at MegaLabs and contribute to shaping the future
                      of crypto economy.
                    </p>
                  </div>
                  <a
                    href="#"
                    className="bg-green_jade text-xl tracking-widest max-sm:text-sm py-2 px-6 border border-black text-black flex justify-center items-center rounded-tr-2xl rounded-bl-2xl"
                  >
                    Join the family
                  </a>
                </div>
              </div>
            </div>
            <div className="-translate-y-44">
              <i className="fa-solid fa-spinner animate-spin text-white fa-4x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
