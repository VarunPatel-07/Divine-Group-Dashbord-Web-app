"use client";
import React, { useEffect, useContext } from "react";
import styles from "./styles/style.module.css";
import Image from "next/image";
import userImg from "../images/userimg.png";
import { usePathname } from "next/navigation";
import noteContext from "@/context/noteContext";
function Navbar() {
  const pathname = usePathname();
  const context = useContext(noteContext);
  const { AuthToken, FetchUserDetail, UserInfo } = context;

  const BackgroundColor = [
    "#006400",
    "#00008B",
    "#800080",
    "#5D4037",
    "#404040",
    "#008B8B",
    "#006400",
    "#00008B",
    "#800080",
    "#5D4037",
    "#404040",
    "#008B8B",
    "#006400",
    "#00008B",
    "#800080",
    "#5D4037",
    "#404040",
    "#008B8B",
    "#006400",
    "#00008B",
    "#800080",
    "#5D4037",
    "#404040",
    "#008B8B",
  ];
  const TextColor = [
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
  ];

  const BgColorGenerator = () => {
    if (!localStorage.getItem("backgroundColor")) {
      const color = BackgroundColor[Math.floor(Math.random() * 5)];
      localStorage.setItem("backgroundColor", color);
      return color;
    } else {
      return localStorage.getItem("backgroundColor");
    }
  };

  const ColorGenerator = () => {
    const color = TextColor[Math.floor(Math.random() * 5)];
    return color;
  };

  useEffect(() => {
    FetchUserDetail(AuthToken);
  }, []);
  if (pathname === "/pages/auth/login" || pathname === "/pages/auth/login" ||pathname === "/pages/auth/Otp") {
  } else {
    return (
      <>
        <nav className={styles.navberMain}>
          <div className={styles.nav}>
            <div className={styles.NavbarProfileSection}>
              <div className={styles.profile}>
                <div className={styles.image}>
                  {/* <Image
                    src={userImg}
                    height="100%"
                    width="100%"
                    alt="users profile"
                  /> */}
                  <div
                    className={styles.DefaultProfile}
                    style={{ backgroundColor: BgColorGenerator() }}
                  >
                    <div
                      className={styles.pera}
                      style={{ color: ColorGenerator() }}
                    >
                      <p>{UserInfo.name.split(" ")[0].split("")[0]}</p>
                      <p>{UserInfo.name.split(" ")[1].split("")[0]}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.UserName}>
                  <div className={styles.flex}>
                    <h6 className={styles.username}> {UserInfo.username} </h6>
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
}

export default Navbar;
