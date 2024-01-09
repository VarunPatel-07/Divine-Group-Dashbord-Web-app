"use client";
import React, { useContext, useState } from "react";
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
import noteContext from "@/context/noteContext";
import cookie from "cookie-cutter";
function Sidebar() {
  const pathname = usePathname();
  const context = useContext(noteContext);
  const { UserInfo } = context;
  const [VerificationConsent, setVerificationConsent] = useState(false);

  if (!UserInfo.twoStepVerification) {
    if (!cookie.get("Two_Step_Verification_Delay_48Hour")) {
      setTimeout(() => {
        setVerificationConsent(true);
      }, 4000);
    }
  }

  const EnableTwoStepVerification = () => {};
  const CancelButton = () => {
    const oneDay = 24 * 60 * 60 * 1000;
    cookie.set("Two_Step_Verification_Delay_48Hour", true, {
      expires: Date.now() - oneDay,
    });
    setVerificationConsent(false);
  };
  if (
    pathname === "/pages/auth/login" ||
    pathname === "/pages/auth/login" ||
    pathname === "/pages/auth/Otp"
  ) {
  } else {
    return (
      <>
        <div className={styles.sidebarMainSec}>
          <div className={styles.SidebarInner}>
            <div className={styles.FlexSectionMain}>
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

                  <li
                    className={pathname == "/pages/customers" ? "active" : ""}
                  >
                    <Link href="/pages/customers">
                      <span>
                        <PiUsersThreeFill />
                      </span>
                      customers
                    </Link>
                  </li>
                  {UserInfo.role === "Admin" ? (
                    <li className={pathname == "/pages/users" ? "active" : ""}>
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
      </>
    );
  }
}

export default Sidebar;
