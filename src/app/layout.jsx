import "./globals.css";
import Navbar from "@/components/shared/Navbar";

export const metadata = {
  title: "FitLog | Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap"
        />
      </head>

      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}