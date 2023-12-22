"use client";
import React, { useState } from "react";
import styles from "../styles/style.module.css";
import BgImg from "../../../images/header-bg.png";
import Image from "next/image";
import Logo from "../../../images/Logo.png";
import Eye from "../helper/Eye";

function Login() {
  const [isEyeClose, setisEyeClose] = useState(false);
  const EyeClickBtn = () => {
    if (isEyeClose) {
      setisEyeClose(false);
    } else {
      setisEyeClose(true);
    }
  };
  return (
    <div className="login-sign-up-page">
      <div className={styles.loginSignUpPageSection}>
        <div className={styles.backgroundImage}>
          <Image
            src={BgImg}
            width="100%"
            height="100%"
            alt="backgroun image"
          ></Image>
        </div>
        <div className={styles.LoginCardPageMainSection}>
          <div className={styles.LoginCardPage}>
            <div className={styles.LoginCardInnerSection}>
              <div className={styles.logoImg}>
                <Image src={Logo} alt="logo" width="100%" height="100%"></Image>
              </div>
              <div className={styles.Input}>
                <div className="col-md-12">
                  <div className={styles.InputFlexSec}>
                    <label htmlFor="UserName">UserName</label>
                    <input
                      type="text"
                      id="UserName"
                      placeholder="Plese Enter Your UserName"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className={styles.InputFlexSec}>
                    <label htmlFor="UserName">password</label>
                    <div className="w-100 position-relative height-48">
                      <input
                        type={isEyeClose ? "text" : "password"}
                        id="UserName"
                        placeholder="Plese Enter Your UserName"
                      />
                      <button onClick={EyeClickBtn}>
                        <Eye isEyeClose={isEyeClose} />
                      </button>
                    </div>
                  </div>
                  <p>Forgot Password?</p>
                </div>
              </div>
              <div className={styles.Buttons}>
                <div className="col-md-12">
                  <button className="filled-btn">Sign In</button>
                  <p>
                    Don`t Have an Account? <span> create account </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
