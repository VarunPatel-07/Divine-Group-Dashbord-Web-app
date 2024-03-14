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
import { useSearchParams } from "next/navigation";

function ResetPassword() {
  const searchParams = useSearchParams();
  const forgotPassToken = searchParams.get("forgotPassToken");
  const user_id = searchParams.get("id");
  console.log(forgotPassToken, user_id);
  const context = useContext(noteContext);
  const {
    ErrorState,
    GlobalLoadingState,
    Reset_Password_API_Calling_Function,
    Reset_password,
  } = context;
  const [IsEyeClose, setIsEyeClose] = useState(false);
  const [IsEyeClose_confirm, setIsEyeClose_confirm] = useState(false);
  const [InputFields, setInputFields] = useState({
    new_password: "",
    confirm_password: "",
  });

  const EyeClickBtn = (e) => {
    if (IsEyeClose) {
      setIsEyeClose(false);
    } else {
      setIsEyeClose(true);
    }
  };
  const EyeClickBtn_confirm = (e) => {
    if (IsEyeClose_confirm) {
      setIsEyeClose_confirm(false);
    } else {
      setIsEyeClose_confirm(true);
    }
  };
  const OnChange = (e) => {
    setInputFields({ ...InputFields, [e.target.name]: e.target.value });
  };
  const OnSumbitButton = (e) => {
    e.preventDefault();
    Reset_Password_API_Calling_Function(
      InputFields.new_password,
      forgotPassToken,
      user_id
    );
  };

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
            <form className={styles.LoginCardPage} onSubmit={OnSumbitButton}>
              <div className={`${styles.LoginCardInnerSection} h-100`}>
                <div className={styles.logoImg}>
                  <Image
                    src={Logo}
                    alt="logo"
                    width="100%"
                    height="100%"
                  ></Image>
                </div>
                {Reset_password.success || Reset_password.samePass ? (
                  <div className="w-100">
                    {Reset_password.success ? (
                      <h4 className="forgot-pass-h4">
                        password changed successfully
                      </h4>
                    ) : (
                      <h4 className="forgot-pass-h4">
                        password cant be same as previous password
                      </h4>
                    )}
                  </div>
                ) : (
                  <>
                    <div className={styles.Input}>
                      <div className="col-md-12 w-100">
                        <div className={styles.InputFlexSec}>
                          <label htmlFor="new_password"> new password</label>
                          <div className="w-100 position-relative height-48">
                            <input
                              type={IsEyeClose ? "text" : "password"}
                              id="new_password"
                              name="new_password"
                              placeholder="Please Enter Password"
                              onChange={OnChange}
                            />
                            <button onClick={EyeClickBtn} type="button">
                              <Eye isEyeClose={IsEyeClose} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 w-100">
                        <div className={styles.InputFlexSec}>
                          <label htmlFor="confirm_password">
                            Confirm password
                          </label>
                          <div className="w-100 position-relative height-48">
                            <input
                              type={IsEyeClose_confirm ? "text" : "password"}
                              id="confirm_password"
                              name="confirm_password"
                              placeholder="Please Enter Password"
                              onChange={OnChange}
                            />
                            <button onClick={EyeClickBtn_confirm} type="button">
                              <Eye isEyeClose={IsEyeClose_confirm} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.Buttons}>
                      <div className="col-md-12 w-100">
                        <button
                          className="filled-btn"
                          type="submit"
                          disabled={
                            InputFields.new_password !==
                              InputFields.confirm_password ||
                            InputFields.new_password.length < 6
                          }
                        >
                          {GlobalLoadingState.LogInLoading ? (
                            <Loader />
                          ) : (
                            "save"
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
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

export default ResetPassword;
