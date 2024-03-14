"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "../../styles/style.module.css";
import BgImg from "../../../../images/header-bg.png";
import Image from "next/image";
import Logo from "../../../../images/Logo.png";
import Eye from "../../helper/Eye";
import noteContext from "@/context/noteContext";
import { useRouter } from "next/navigation";
import Loader from "@/utils/Loader";
import { deleteCookie, getCookie } from "cookies-next";

function ForgotPassword() {
  const { push } = useRouter();
  const context = useContext(noteContext);
  const {
    LogInToYourAccount,
    ErrorState,
    GlobalLoadingState,
    Forgot_Password_Token_Generator_API_Calling_Function,
    Mail_Sent,
  } = context;
  const [IsEyeClose, setIsEyeClose] = useState(false);
  const [InputFields, setInputFields] = useState({
    emailAddress: "",
  });

  const OnChange = (e) => {
    setInputFields({ ...InputFields, [e.target.name]: e.target.value });
  };
  const OnSumbitButton = (e) => {
    e.preventDefault();
    Forgot_Password_Token_Generator_API_Calling_Function(
      InputFields.emailAddress
    );
  };
  const GoBack_To_Log_In =()=>{
    push('/pages/auth/login')
  }
//   useEffect(() => {
//     deleteCookie("verification_Token_send");
//   }, []);
  return (
    <>
      <div className="login-sign-up-page w-100 h-100">
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
            <form
              className={styles.LoginCardPage}
              style={{ maxHeight: "350px" }}
              onSubmit={OnSumbitButton}
            >
              <div className={`${styles.LoginCardInnerSection} h-100`}>
                <div className={styles.logoImg}>
                  <Image
                    src={Logo}
                    alt="logo"
                    width="100%"
                    height="100%"
                  ></Image>
                </div>
                {Mail_Sent || getCookie("verification_Token_send") == "true" ? (
                  <div className="w-100">
                    <h4 className="forgot-pass-h4">
                      We have sent a verification link to your Gmail. If you do
                      not receive it within an hour, please try again.
                    </h4>
                  </div>
                ) : (
                  <>
                    <div className={styles.Input}>
                      <div className="col-md-12 w-100">
                        <div className={styles.InputFlexSec}>
                          <label htmlFor="emailAddress">enter your email</label>
                          <input
                            type="email"
                            id="emailAddress"
                            name="emailAddress"
                            placeholder="Please Enter Your Email"
                            onChange={OnChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.Buttons}>
                      <div className="col-md-12 w-100">
                        <button
                          className="filled-btn"
                          type="submit"
                          disabled={
                            InputFields.emailAddress.length >= 3 ? false : true
                          }
                        >
                          {GlobalLoadingState.LogInLoading ? (
                            <Loader />
                          ) : (
                            "Send verification mail"
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
                  <div className={styles.Buttons}>
                  <div className="col-md-12 w-100">
                 
                    <button
                      className={styles.navigatorBtn}
                      type="button"
                     onClick={GoBack_To_Log_In}
                    >
                      go back to <span> login page</span>
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

export default ForgotPassword;
