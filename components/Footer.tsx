import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-dark-brown px-20 py-12 pb-14 text-white">
      <div className="footer">
        <div>
          <span className="footer-title">Company</span>
          <Link href="">About us</Link>
          <Link href="">Contact us</Link>
          <Link href="">Careers</Link>
          <Link href="">Terms of Service</Link>
        </div>
        <div>
          <span className="footer-title">Support</span>
          <Link href="">Feedback & Bug Report</Link>
          <Link href="">Requests</Link>
        </div>
      </div>
      <hr className="my-3" />
      <div className="flex justify-between">
        <div>{/* Discord/Twitter/Tg */}</div>
        <p className="text-xs">2023 Powered by Berachain</p>
      </div>
    </footer>
  );
}
