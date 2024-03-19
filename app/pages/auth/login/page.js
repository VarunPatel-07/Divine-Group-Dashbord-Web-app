"use client";
import React, { useState, useContext } from "react";
import styles from "../../styles/style.module.css";
import BgImg from "../../../../images/header-bg.png";
import Image from "next/image";
import Logo from "../../../../images/Logo.png";
import Eye from "../../helper/Eye";
import noteContext from "@/context/noteContext";
import { useRouter } from "next/navigation";
import Loader from "@/utils/Loader";

function Login() {
  const { push } = useRouter();
  const context = useContext(noteContext);
  const { LogInToYourAccount, ErrorState, GlobalLoadingState } = context;
  const [IsEyeClose, setIsEyeClose] = useState(false);
  const [InputFields, setInputFields] = useState({
    username: "",
    password: "",
  });
  const EyeClickBtn = (e) => {
    if (IsEyeClose) {
      setIsEyeClose(false);
    } else {
      setIsEyeClose(true);
    }
  };
  const CreateAccountBtn = () => {
    push("/pages/auth/sign-up");
  };
  const OnChange = (e) => {
    setInputFields({ ...InputFields, [e.target.name]: e.target.value });
  };
  const OnSumbitButton = (e) => {
    e.preventDefault();
    LogInToYourAccount(InputFields);
  };
  const ForgotPassword_Btn = () => {
    push("/pages/auth/forgot-password");
  };
  return (
    <>
      <div className="login-sign-up-page w-100 ">
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
                  <Image
                    src={Logo}
                    alt="logo"
                    width="100%"
                    height="100%"
                  ></Image>
                </div>
                <div className={styles.Input}>
                  <div className="col-md-12 w-100">
                    <div className={styles.InputFlexSec}>
                      <label htmlFor="UserName">User Name</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Please Enter Your UserName"
                        onChange={OnChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 w-100">
                    <div className={styles.InputFlexSec}>
                      <label htmlFor="UserName">password</label>
                      <div className="w-100 position-relative height-48">
                        <input
                          type={IsEyeClose ? "text" : "password"}
                          id="password"
                          name="password"
                          placeholder="Please Enter Password"
                          onChange={OnChange}
                        />
                        <button onClick={EyeClickBtn} type="button">
                          <Eye isEyeClose={IsEyeClose} />
                        </button>
                      </div>
                    </div>
                    <button
                      className={styles.navigatorBtn}
                      type="button"
                      onClick={ForgotPassword_Btn}
                      style={{
                        width: "fit-content",
                        marginLeft: "auto",
                        display: "flex",
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>
                <div className={styles.Buttons}>
                  <div className="col-md-12 w-100">
                    <button
                      className="filled-btn"
                      type="submit"
                      disabled={
                        InputFields.username.length >= 3 &&
                        InputFields.password.length >= 8
                          ? false
                          : true
                      }
                    >
                      {GlobalLoadingState.LogInLoading ? <Loader /> : "Sign In"}
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
      {ErrorState.IsError ? (
        <div className={styles.InformationModalSection}>
          <div className={styles.InformationModalInnerSection}>
            <div className={styles.paragraph}>
              <p>{ErrorState.ErrorMessage}</p>
            </div>
            <div className={styles.progressBar}></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Login;
