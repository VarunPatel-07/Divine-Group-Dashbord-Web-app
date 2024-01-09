"use client";
import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "../../styles/style.module.css";
import BgImg from "../../../../images/header-bg.png";
import Image from "next/image";
import Logo from "../../../../images/Logo.png";
import Eye from "../../helper/Eye";
import noteContext from "@/context/noteContext";
import { useRouter } from "next/navigation";

function OTP() {
  const { push } = useRouter();
  const inputRef = useRef(0);
  const context = useContext(noteContext);
  const { VerifyOTP } = context;
  const initialState = [];
  const [VerificationInput, setVerificationInputFiled] = useState(initialState);
  const [ActiveOtpState, setActiveOtpState] = useState(0);

  const OnChange = (e) => {
    setVerificationInputFiled({
      ...VerificationInput,
      [e.target.name]: e.target.value,
    });
    if (ActiveOtpState <= 2) {
      setActiveOtpState(ActiveOtpState + 1);
    }
  };

  const OnSumbit = (e) => {
    e.preventDefault();
    const VerificationText =
      VerificationInput.InputFiledOne +
      VerificationInput.InputFiledTwo +
      VerificationInput.InputFiledThree +
      VerificationInput.InputFiledFour;
    VerifyOTP(VerificationText);
  };
  window.addEventListener("keydown", function (event) {
    const key = event.key; // "a", "1", "Shift", etc.

    if (key === "Backspace") {
     
      if(ActiveOtpState !== 0){
          setActiveOtpState(ActiveOtpState - 1);
      }
      
    }
  });
  useEffect(() => {
    const Input = document.querySelectorAll("#Input");
  
    Input[ActiveOtpState].focus();
  }, [ActiveOtpState]);
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
          <form className={styles.LoginCardPage} onSubmit={OnSumbit}>
            <div className={styles.LoginCardInnerSection}>
              <div className={styles.logoImg}>
                <Image src={Logo} alt="logo" width="100%" height="100%"></Image>
              </div>
              <div className={styles.Input}>
                <div className={styles.VerificationText}>
                  <h3>Verification</h3>
                  <p>
                    Enter the 4-digit code sent to you at saraxxxxx@gmail.com
                  </p>
                </div>
                <div className="row p-0">
                  <div className="col-md-3 ">
                    <div className={styles.InputFlexSecVerification}>
                      <input
                        type="text"
                        id="Input"
                        name="InputFiledOne"
                        placeholder="0"
                        onChange={OnChange}
                        className="text-center"
                        maxLength="1"
                        ref={inputRef}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 ">
                    <div className={styles.InputFlexSecVerification}>
                      <input
                        type="text"
                        id="Input"
                        name="InputFiledTwo"
                        placeholder="0"
                        onChange={OnChange}
                        className="text-center"
                        maxLength="1"
                        ref={inputRef}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 ">
                    <div className={styles.InputFlexSecVerification}>
                      <input
                        type="text"
                        id="Input"
                        name="InputFiledThree"
                        placeholder="0"
                        onChange={OnChange}
                        className="text-center"
                        maxLength="1"
                        ref={inputRef}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className={styles.InputFlexSecVerification}>
                      <input
                        type="text"
                        id="Input"
                        name="InputFiledFour"
                        placeholder="0"
                        onChange={OnChange}
                        className="text-center"
                        maxLength="1"
                        ref={inputRef}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.Buttons}>
                <div className="col-md-12 w-100">
                  <button className="filled-btn" type="submit">
                    Continue
                  </button>
                  <div className={styles.BackPageButton}>
                    <button className={styles.navigatorBtn} type="button">
                      Havent received a code? <span> Resend</span>
                    </button>
                    <button className={styles.navigatorBtn} type="button">
                      Back to Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OTP;
