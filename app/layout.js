import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import ContextApi from "@/context/ContextApi";
import "react-loading-skeleton/dist/skeleton.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Divine Group || An Growing Real Estate Company",
  description:
    "Experience unparalleled real estate expertise with Divine Group. We are a rapidly expanding company committed to redefining industry standards. Our unwavering dedication to excellence, combined with our passion for innovation, guarantees that every client receives top-notch service and satisfaction. Embark on a journey of endless possibilities and elevate your real estate experience with Divine Group today.",
  keywords:
    "Real estate expertise , Divine Group , Industry standards ,Top-notch service ,Client satisfaction, Innovation in real estate ,Endless possibilities, Elevate real estate experience, Rapidly expanding company, Unwavering dedication, Excellence in real estate ,Real estate journey , Divine Group services ,Real estate innovation ,Redefining industry standards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextApi>
          <Navbar />
          <Sidebar />
          {children}
        </ContextApi>
      </body>
    </html>
  );
}
