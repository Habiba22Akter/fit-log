"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header>
      <nav className="container nav">
        <Link href="/" className="brand">
          <Image
            src="/assets/logo.png"
            width={28}
            height={28}
            alt="FitLog logo"
          />
          FITLOG
        </Link>

        <div className="nav-links">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            aria-current={pathname === "/my-plan" ? "page" : undefined}
          >
            My Plan
          </Link>
        </div>

        <div className="badges">
          <Link href="/my-plan" className="badge filled">
            Plan <b>0</b>
          </Link>

          <Link href="/my-plan?tab=saved" className="badge">
            Saved <b>0</b>
          </Link>
        </div>
      </nav>
    </header>
  );
}