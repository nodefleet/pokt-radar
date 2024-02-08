import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-black px-20 py-12 max-sm:px-10 max-sm:py-6 pb-14 text-white">
      <hr className="my-3" />
      <div className="flex justify-between">
        <div className="flex justify-between gap-3 text-xl">
          <a href="#">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-discord"></i>
          </a>
        </div>
        <div className="flex justify-between gap-1">
          <p className="text-xs">2024 Powered by</p>
          <Image
            src={"/img/nodofleet.png"}
            alt="logo_Nodefleet"
            className="w-14 h-4 translate-y-0.5"
            width={100}
            height={100}
          />
        </div>
      </div>
    </footer>
  );
}
