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
    "Experience the highest level of real estate expertise with Divine Group, a company that is rapidly expanding and committed to redefining industry standards. Our dedication to excellence, along with our passion for innovation, guarantees unmatched service and satisfaction for each and every client. Discover a world of possibilities and elevate your real estate experience with Divine Group today.",
    keywords:'real este'
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
