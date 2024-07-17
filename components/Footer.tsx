/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="gradient-bg flex justify-between gap-4 items-center py-10 px-14 max-sm:px-8 max-sm:flex-col max-sm:justify-center">
        <div>
          <img src="/icons/team.svg" alt="team" />
        </div>
        <div className="text-white flex flex-col gap-3 text-xl max-sm:text-center max-sm:text-sm">
          <p className="font-semibold uppercase">
            Are you ready to be part of the blockchain revolution, real time?
          </p>
          <p className="font-light">
            Join us at MegaLabs and contribute to shaping the future of crypto
            economy.
          </p>
        </div>
        <a
          href="#"
          className="bg-green_jade text-xl tracking-widest max-sm:text-sm py-2 px-6 border border-black rounded-tr-2xl rounded-bl-2xl"
        >
          Join the family
        </a>
      </div>
      <div className="bg-white px-20 py-6 max-sm:px-10 max-sm:py-6 text-white">
        <div className="flex justify-between text-black">
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/coach-pal-be1f4.appspot.com/o/brxSwhYGolYSQLxiFpDmHFawE.png.png?alt=media&token=f8606f58-30ee-4fee-aff2-a57b3653d706"
              alt="logo"
            />
          </div>
          <div className="flex justify-between gap-10 text-4xl max-sm:text-2xl max-sm:gap-4 max-sm:items-center">
            <a href="#">
              <i className="fa-brands fa-telegram text-black"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-x-twitter text-black"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-discord text-black"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-github text-black"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
