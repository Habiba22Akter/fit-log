"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const workoutsActive =
    pathname === "/" || pathname.startsWith("/workouts");

  const planActive = pathname === "/my-plan";

  return (
    <header className="fit-header">
      <nav className="navbar fit-nav" aria-label="Main navigation">
        <Link href="/" className="fit-brand">
          <Image
            src="/assets/logo.png"
            width={36}
            height={36}
            alt=""
            className="fit-logo"
          />
          <span>FITLOG</span>
        </Link>

        <div className="fit-nav-links">
          <Link
            href="/"
            className={`btn btn-ghost fit-nav-link ${
              workoutsActive ? "fit-nav-active" : ""
            }`}
            aria-current={workoutsActive ? "page" : undefined}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan?tab=today"
            className={`btn btn-ghost fit-nav-link ${
              planActive ? "fit-nav-active" : ""
            }`}
            aria-current={planActive ? "page" : undefined}
          >
            My Plan
          </Link>
        </div>

        <div className="fit-nav-counts">
          <Link
            href="/my-plan?tab=today"
            className="fit-counter"
          >
            <span>Plan</span>
            <span className="badge fit-plan-count">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="fit-counter fit-saved-link"
          >
            <span>Saved</span>
            <span className="badge fit-saved-count">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}