"use client";
import React from "react";
import styles from "./styles/style.module.css";
import Link from "next/link";
import { GoGraph } from "react-icons/go";
import Image from "next/image";
import Logo from "../images/Logo.png";
import { usePathname } from "next/navigation";
import { IoMdSettings } from "react-icons/io";
import { PiUsersThreeFill } from "react-icons/pi";
import { LuUsers } from "react-icons/lu";
import { IoChatbubblesSharp } from "react-icons/io5";
import { BsFillBuildingsFill } from "react-icons/bs";

function Sidebar() {
  const pathname = usePathname();
  const path = usePathname();
  return (
    <>
      <div
        className={`${styles.sidebarMainSec} ${path === "/pages/login" ||path === "/pages/sign-up" ? "notVisibles" : ""}`}
      >
        <div className={styles.SidebarInner}>
          <div className={styles.FlexSectionMain}>
            <div className={styles.LogoSection}>
              <Image src={Logo} height="100%" width="100%" alt="company logo" />
            </div>
            <div className={styles.LinkSection}>
              <ul className={styles.ul}>
                <li className={pathname == "/" ? "active" : ""}>
                  <Link href="/">
                    <span>
                      <GoGraph />
                    </span>
                    Dashboard
                  </Link>
                </li>
                <li className={pathname == "/pages/projects" ? "active" : ""}>
                  <Link href="/pages/projects">
                    <span>
                      <BsFillBuildingsFill />
                    </span>
                    projects
                  </Link>
                </li>
                <li className={pathname == "/pages/chats" ? "active" : ""}>
                  <Link href="/pages/chats">
                    <span>
                      <IoChatbubblesSharp />
                    </span>
                    chats
                  </Link>
                </li>
                <li className={pathname == "/pages/users" ? "active" : ""}>
                  <Link href="/pages/users">
                    <span>
                      <LuUsers />
                    </span>
                    users
                  </Link>
                </li>

                <li className={pathname == "/pages/customers" ? "active" : ""}>
                  <Link href="/pages/customers">
                    <span>
                      <PiUsersThreeFill />
                    </span>
                    customers
                  </Link>
                </li>
                <li className={pathname == "/pages/setting" ? "active" : ""}>
                  <Link href="/pages/setting">
                    <span>
                      <IoMdSettings />
                    </span>
                    setting
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
