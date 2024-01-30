"use client";
import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "../../styles/style.module.css";
import BgImg from "../../../../images/header-bg.png";
import Image from "next/image";
import Logo from "../../../../images/Logo.png";
import Eye from "../../helper/Eye";
import noteContext from "@/context/noteContext";
import { useRouter } from "next/navigation";
import Loader from "@/utils/Loader";

function OTP() {
  const { push } = useRouter();
  const inputRefs = useRef([]);
  const context = useContext(noteContext);
  const { AuthToken, VerifyOTP, GlobalLoadingState } = context;
  const initialState = [];
  const [ActiveOtpState, setActiveOtpState] = useState(0);
  const [OTPArray, setOTPArray] = useState(new Array(4).fill(""));
  const OnChange = (index, e) => {
    const length = 4;
    const value = e.target.value;
    if (isNaN(value)) return;
    const NewOtp = [...OTPArray];
    NewOtp[index] = value.substring(value.length - 1);
    setOTPArray(NewOtp);
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const OnSumbit = (e) => {
    e.preventDefault();
    const combinedOtp = OTPArray.join("");

    const OTPTxt = {
      oneTimeToken: combinedOtp,
    };
    VerifyOTP(AuthToken, OTPTxt);
  };
  const HandelClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    if (index > 0 && !OTPArray[index - 1]) {
      inputRefs.current[OTPArray.indexOf("")].focus()
    }
  };
  const HandelKeyDown = (index, e) => {
    if (
      e.key == "Backspace" &&
      !OTPArray[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
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
                  {OTPArray.map((value, index) => (
                    <div className="col-md-3 " key={index}>
                      <div className={styles.InputFlexSecVerification}>
                        <input
                          type="text"
                          id="Input"
                          name="InputFiledOne"
                          placeholder="0"
                          onChange={(e) => OnChange(index, e)}
                          onClick={() => HandelClick(index)}
                          onKeyDown={(e) => HandelKeyDown(index, e)}
                          className="text-center"
                          ref={(input) => (inputRefs.current[index] = input)}
                          value={value}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.Buttons}>
                <div className="col-md-12 w-100">
                  <button className="filled-btn" type="submit">
                    {GlobalLoadingState.OTP_Verification_Loding ? (
                      <Loader />
                    ) : (
                      " Continue"
                    )}
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
