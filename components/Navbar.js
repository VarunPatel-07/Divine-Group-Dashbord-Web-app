"use client";
import React from "react";
import styles from "./styles/style.module.css";
import Image from "next/image";
import userImg from "../images/userimg.png";
import { usePathname } from "next/navigation";
function Navbar() {
  const path = usePathname();
 
  return (
    <>
      <nav className={`${styles.navberMain} ${path === "/pages/login" ||path === "/pages/sign-up" ? "notVisibles" : ""}`}>
        <div className={styles.nav}>
          <div className={styles.NavbarProfileSection}>
            <div className={styles.profile}>
              <div className={styles.image}>
                <Image
                  src={userImg}
                  height="100%"
                  width="100%"
                  alt="users profile"
                />
              </div>
              <div className={styles.UserName}>
                <div className={styles.flex}>
                  <h6 className={styles.username}>Gabriel Sative</h6>
                  <p className={styles.userrole}>Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
