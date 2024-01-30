"use client";
import React, { useEffect, useContext } from "react";
import styles from "./styles/style.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import userImg from "../images/userimg.png";
import { usePathname } from "next/navigation";
import noteContext from "@/context/noteContext";
import { IoMdSearch } from "react-icons/io";

function Navbar() {
  const pathname = usePathname();
  const context = useContext(noteContext);
  const { AuthToken, FetchUserDetail, UserInfo, GlobalLoadingState } = context;
  const { push } = useRouter();
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
  const ProfilePageButton = () => {
    push("/pages/profilePage");
  };

  useEffect(() => {
    FetchUserDetail(AuthToken);
  }, []);
  if (
    pathname === "/pages/auth/login" ||
    pathname === "/pages/auth/sign-up" ||
    pathname === "/pages/auth/Otp"
  ) {
  } else {
    return (
      <>
        <nav className={styles.navberMain}>
          <div className={styles.nav}>
            <div className={styles.SearchBarSection}>
              {pathname === "/pages/projects" ? (
                <div className={styles.SearchFlexSection}>
                  <div className={styles.SearchInput}>
                    <input
                      type="search"
                      name="search"
                      placeholder="Search"
                      id=""
                    />
                  </div>
                  <div className={styles.SearchButton}>
                    <button>
                      <IoMdSearch />
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div
              className={styles.NavbarProfileSection}
              onClick={ProfilePageButton}
            >
              {GlobalLoadingState.Profile_Loding ? (
                "loding"
              ) : (
                <div className={styles.profile}>
                  <div className={styles.image}>
                    {UserInfo.ProfileImage ? (
                      <picture>
                        <source src={UserInfo.ProfileImage} type="" />
                        <img
                          src={UserInfo.ProfileImage}
                          alt=""
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </picture>
                    ) : (
                      <div
                        className={styles.DefaultProfile}
                        style={{ backgroundColor: BgColorGenerator() }}
                      >
                        <div className={styles.pera}>
                          <p>{UserInfo.name?.split(" ")[0].split("")[0]}</p>
                          <p>{UserInfo.name?.split(" ")[1].split("")[0]}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={styles.UserName}>
                    <div className={styles.flex}>
                      <h6 className={styles.username}> {UserInfo.username} </h6>
                      <p className={styles.userrole}> {UserInfo.role} </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
