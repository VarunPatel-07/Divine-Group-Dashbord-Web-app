"use client";
import React, { useState, useContext } from "react";
import styles from "../styles/style.module.css";
import BgImg from "../../../images/header-bg.png";
import Image from "next/image";
import Logo from "../../../images/Logo.png";
import Eye from "../helper/Eye";
import noteContext from "@/context/noteContext";
import { useRouter } from "next/navigation";

function Login() {
  const { push } = useRouter();
  const context = useContext(noteContext);
  const { content, LogInToYourAccount } = context;
  const [isEyeClose, setisEyeClose] = useState(false);
  const [InputFileds, setInputFileds] = useState({
    username: "",
    password: "",
  });
  const EyeClickBtn = (e) => {
    e.preventDefault();
    if (isEyeClose) {
      setisEyeClose(false);
    } else {
      setisEyeClose(true);
    }
  };
  const CreateAccountBtn = () => {
    push("/pages/sign-up");
  };
  const OnChange = (e) => {
    console.log(InputFileds);
    setInputFileds({ ...InputFileds, [e.target.name]: e.target.value });
  };
  const OnSumbitButton = (e) => {
    e.preventDefault();
    LogInToYourAccount(InputFileds);
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
          <form className={styles.LoginCardPage} onSubmit={OnSumbitButton}>
            <div className={styles.LoginCardInnerSection}>
              <div className={styles.logoImg}>
                <Image src={Logo} alt="logo" width="100%" height="100%"></Image>
              </div>
              <div className={styles.Input}>
                <div className="col-md-12">
                  <div className={styles.InputFlexSec}>
                    <label htmlFor="UserName">User Name</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Plese Enter Your UserName"
                      onChange={OnChange}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className={styles.InputFlexSec}>
                    <label htmlFor="UserName">password</label>
                    <div className="w-100 position-relative height-48">
                      <input
                        type={isEyeClose ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Plese Enter Password"
                        onChange={OnChange}
                      />
                      <button onClick={EyeClickBtn} type="button">
                        <Eye isEyeClose={isEyeClose} />
                      </button>
                    </div>
                  </div>
                  <button className={styles.navigatorBtn}>
                    Forgot Password?
                  </button>
                </div>
              </div>
              <div className={styles.Buttons}>
                <div className="col-md-12">
                  <button className="filled-btn" type="submit">
                    Sign In
                  </button>
                  <button
                    className={styles.navigatorBtn}
                    type="button"
                    onClick={CreateAccountBtn}
                  >
                    Don`t Have an Account? <span> create account </span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
