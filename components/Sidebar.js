"use client";
import React, { useContext, useState, useEffect } from "react";
import styles from "./styles/style.module.css";
import Link from "next/link";
import { GoGraph } from "react-icons/go";
import Image from "next/image";
import Logo from "../images/Logo.png";
import { usePathname } from "next/navigation";
import { IoMdSettings, IoIosCloseCircle } from "react-icons/io";
import { PiUsersThreeFill } from "react-icons/pi";
import { LuBadgeHelp, LuUsers } from "react-icons/lu";
import { IoChatbubblesSharp } from "react-icons/io5";
import { BsFillBuildingsFill } from "react-icons/bs";

import noteContext from "@/context/noteContext";
import cookie from "cookie-cutter";
function Sidebar() {
  const pathname = usePathname();
  const context = useContext(noteContext);
  const { UserInfo, Responsive_Button_Click, Button_Clicked } = context;
  const [VerificationConsent, setVerificationConsent] = useState(false);
  const [CookiesConsent, setCookiesConsent] = useState(false);
  const User_Info = JSON.parse(sessionStorage.getItem("User_InforMation"));

  useEffect(() => {
    if (!User_Info?.twoStepVerification) {
      if (!cookie.get("Two_Step_Verification_Delay_48Hour")) {
        setTimeout(() => {
          setVerificationConsent(true);
        }, 4000);
      } else {
        setVerificationConsent(false);
      }
    } else {
      setVerificationConsent(false);
    }
  }, [User_Info?.twoStepVerification]);

  if (
    !localStorage.getItem("User_Accepted_CookiesConsent") &&
    !cookie.get("User_Accepted_CookiesConsent")
  ) {
    setTimeout(() => {
      setCookiesConsent(true);
    }, 1000);
  }

  const EnableTwoStepVerification = () => {};
  const CancelButton = () => {
    const oneDay = 72 * 60 * 60 * 1000;
    cookie.set("Two_Step_Verification_Delay_48Hour", true, {
      expires: Date.now() - oneDay,
    });
    setVerificationConsent(false);
  };
  const AcceptCookiesConsent = () => {
    localStorage.setItem("User_Accepted_CookiesConsent", true);
    cookie.set("User_Accepted_CookiesConsent", true);
    setCookiesConsent(false);
  };
  const Click_Button = () => {
    Button_Clicked();
  };
  if (
    pathname === "/pages/auth/login" ||
    pathname === "/pages/auth/sign-up" ||
    pathname === "/pages/auth/Otp" ||
    pathname === "/pages/auth/forgot-password" ||
    pathname === "/pages/auth/reset-password"
  ) {
  } else {
    return (
      <>
        <div
          className={`${styles.sidebarMainSec} ${
            Responsive_Button_Click ? "responsive_sideBar" : ""
          }`}
        >
          <div className={styles.SidebarInner}>
            <div className={styles.FlexSectionMain}>
              <div className={styles.respo_Btn}>
                <button onClick={Click_Button}>
                  <IoIosCloseCircle />
                </button>
              </div>
              <div className={styles.LogoSection}>
                <Image
                  src={Logo}
                  height="100%"
                  width="100%"
                  alt="company logo"
                />
              </div>
              <div className={styles.LinkSection}>
                <ul className={styles.ul}>
                  <li
                    className={pathname == "/" ? "active" : ""}
                    onClick={Click_Button}
                  >
                    <Link href="/">
                      <span>
                        <GoGraph />
                      </span>
                      Dashboard
                    </Link>
                  </li>
                  <li
                    className={pathname == "/pages/projects" ? "active" : ""}
                    onClick={Click_Button}
                  >
                    <Link href="/pages/projects">
                      <span>
                        <BsFillBuildingsFill />
                      </span>
                      projects
                    </Link>
                  </li>
                  <li
                    className={pathname == "/pages/chats" ? "active" : ""}
                    onClick={Click_Button}
                  >
                    <Link href="/pages/chats">
                      <span>
                        <IoChatbubblesSharp />
                      </span>
                      chats
                    </Link>
                  </li>

                  <li
                    className={pathname == "/pages/customers" ? "active" : ""}
                    onClick={Click_Button}
                  >
                    <Link href="/pages/customers">
                      <span>
                        <PiUsersThreeFill />
                      </span>
                      customers
                    </Link>
                  </li>
                  {UserInfo.role === "Admin" ? (
                    <li
                      className={pathname == "/pages/users" ? "active" : ""}
                      onClick={Click_Button}
                    >
                      <Link href="/pages/users">
                        <span>
                          <LuUsers />
                        </span>
                        users
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  <li
                    className={pathname == "/pages/setting" ? "active" : ""}
                    onClick={Click_Button}
                  >
                    <Link href="/pages/setting">
                      <span>
                        <IoMdSettings />
                      </span>
                      setting
                    </Link>
                  </li>
                  <li
                    className={pathname == "/pages/HelpCenter" ? "active" : ""}
                    onClick={Click_Button}
                  >
                    <Link href="/pages/HelpCenter">
                      <span>
                        <LuBadgeHelp />
                      </span>
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {VerificationConsent ? (
          <div className={styles.TwoStepVerificationSection}>
            <div className={styles.InnerSec}>
              <div className={styles.TextSec}>
                <p>
                  Please enhance the security of your account by enabling
                  two-step verification
                </p>
              </div>
              <div className={styles.buttonGroups}>
                <button onClick={CancelButton}>cancel</button>
                <button onClick={EnableTwoStepVerification}>enable</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {CookiesConsent ? (
          <div className={styles.TwoStepVerificationSection}>
            <div className={styles.InnerSec}>
              <div className={styles.TextSec}>
                <p>
                  Cookies help us deliver the best experience on our website. By
                  using our website, you agree to the use of cookies. Find out
                  how we use cookies.
                </p>
              </div>
              <div className={styles.buttonGroups}>
                <button onClick={AcceptCookiesConsent}>accept</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Sidebar;
