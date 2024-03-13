"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "../styles/style.module.css";
import noteContext from "@/context/noteContext";
import Eye from "../helper/Eye";
function Setting() {
  const initialState = [];
  const context = useContext(noteContext);
  const [IsEyeClose, setIsEyeClose] = useState(false);
  const [Current_Password, setCurrent_Password] = useState(initialState);
  const [Current_Page_Indicator, setCurrent_Page_Indicator] =
    useState("change_password");
  const { AuthToken, Compare_Password_API_Calling_Function } = context;
  const ActiveIndicatorBtn = (Page_Name) => {
    setCurrent_Page_Indicator(Page_Name);
  };
  const EyeClickBtn = () => {
    if (IsEyeClose) {
      setIsEyeClose(false);
    } else {
      setIsEyeClose(true);
    }
  };
  const Current_Password_Input_Filed = (e) => {
    setCurrent_Password(e.target.value);
  };
  const CheckPassword_Button = () => {
    Compare_Password_API_Calling_Function(AuthToken, Current_Password);
  };
  return (
    <div className="container-main-sec">
      <div className={styles.SettingPage_Main_Section}>
        <div className={styles.list_section}>
          <div className={styles.List_Of_Action_Section}>
            <div
              className={`${styles.List_Section_Card} ${
                Current_Page_Indicator === "change_password"
                  ? "active-page-indicator"
                  : ""
              }`}
              onClick={() => ActiveIndicatorBtn("change_password")}
            >
              <span></span>
              <div className={styles.text_section}>
                <p>change Password</p>
              </div>
            </div>
            <div
              className={`${styles.List_Section_Card} ${
                Current_Page_Indicator === "two_step_verification"
                  ? "active-page-indicator"
                  : ""
              }`}
              onClick={() => ActiveIndicatorBtn("two_step_verification")}
            >
              <span></span>
              <div className={styles.text_section}>
                <p>two step verification</p>
              </div>
            </div>
            <div
              className={`${styles.List_Section_Card} ${
                Current_Page_Indicator === "delete_account"
                  ? "active-page-indicator"
                  : ""
              }`}
              onClick={() => ActiveIndicatorBtn("delete_account")}
            >
              <span></span>
              <div className={styles.text_section}>
                <p>delete account</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.More_Detailed_Section}>
          {Current_Page_Indicator === "change_password" ? (
            <>
              <div className={styles.change_password_main_section}>
                <div className={styles.change_password_inner_section}>
                  <div className={styles.main_input_section}>
                    <h3>change password</h3>
                    <div className={styles.fill_the_current_password_filed}>
                      <label htmlFor="Current_Password">Current Password</label>
                      <div className={styles.input_field}>
                        <input
                          type={IsEyeClose ? "text" : "password"}
                          id="Current_Password"
                          onChange={Current_Password_Input_Filed}
                          placeholder="Enter Your Current Password To Change Password"
                        />
                        <button onClick={EyeClickBtn} type="button">
                          <Eye isEyeClose={IsEyeClose} />
                        </button>
                      </div>
                    </div>
                    <div className={styles.Button_section}>
                      {Current_Password.length >= 4 ? (
                        <button
                          className="filled-btn py-2"
                          onClick={CheckPassword_Button}
                        >
                          sumbit
                        </button>
                      ) : (
                        <button className="filled-btn py-2">edit</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Setting;
