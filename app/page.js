"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Home() {
  const { push } = useRouter();
  if(!sessionStorage.getItem('authtoken')){
    push("/pages/login");
  }
  return (
    <>
      <div className="container-main-sec"></div>
    </>
  );
}
