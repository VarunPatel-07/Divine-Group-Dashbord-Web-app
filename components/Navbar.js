"use client";
import React, { useEffect, useContext } from "react";
import styles from "./styles/style.module.css";
import Image from "next/image";
import userImg from "../images/userimg.png";
import { usePathname } from "next/navigation";
import noteContext from "@/context/noteContext";
function Navbar() {
  const path = usePathname();
  const context = useContext(noteContext);
  const { AuthToken, FetchUserDetail , UserInfo } = context;
  useEffect(() => {
      FetchUserDetail(AuthToken);
     
  }, [ ]);
  return (
    <>
      <nav
        className={`${styles.navberMain} ${
          path === "/pages/login" || path === "/pages/sign-up"
            ? "notVisibles"
            : ""
        }`}
      >
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
                  <h6 className={styles.username}> {UserInfo.name} </h6>
                  <p className={styles.userrole}> {UserInfo.role} </p>
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
