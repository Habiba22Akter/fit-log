import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer fit-footer">
      <div className="fit-footer-inner">
        <Link href="/" className="fit-footer-brand">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 12h12M3 9v6m3-9v12m12-12v12m3-9v6" />
          </svg>

          <span>FITLOG</span>
        </Link>

        <p className="fit-footer-copyright">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}