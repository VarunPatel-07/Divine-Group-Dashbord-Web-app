"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "../styles/style.module.css";
import noteContext from "@/context/noteContext";
import Eye from "../helper/Eye";
function Setting() {
  const initialState = [];
  const current_Password = useRef();
  const New_Password_ref = useRef();
  const context = useContext(noteContext);
  const [IsEyeClose, setIsEyeClose] = useState(false);
  const [Current_Password, setCurrent_Password] = useState(initialState);
  const [Current_Page_Indicator, setCurrent_Page_Indicator] =
    useState("change_password");
  const [IsEyeClose_confirm_pass, setIsEyeClose_confirm_pass] = useState(false);
  const [IsEyeClose_new_pass, setIsEyeClose_new_pass] = useState(false);
  const [IsEyeClose_fill_current_pass, setIsEyeClose_fill_current_pass] =
    useState(false);
  const [NewPassword_state, setNewPassword_state] = useState({
    New_Password: [],
    Confirm_Password: [],
  });
  const [Is_Password_Editing, setIs_Password_Editing] = useState(false);
  const [
    Is_Editing_Two_Step_Verification,
    setIs_Editing_Two_Step_Verification,
  ] = useState(false);
  const [
    The_password_container_for_two_step_verification,
    setThe_password_container_for_two_step_verification,
  ] = useState(initialState);
  const {
    AuthToken,
    Compare_Password_API_Calling_Function,
    ComparPassword_Result,
    Change_Password_API_Calling_function,
    setComparPassword_Result,
    FetchUserDetail,
    UserInfo,
    Two_step_verification_is_completed,
    setTwo_step_verification_is_completed,
    toggle_two_step_verification_API_Calling_Function,
  } = context;
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
  const New_Password_Input_Filed = (e) => {
    setNewPassword_state({
      ...NewPassword_state,
      [e.target.name]: e.target.value,
    });
    console.log(NewPassword_state);
  };
  const EyeClickBtn_confirm_pass = () => {
    if (IsEyeClose_confirm_pass) {
      setIsEyeClose_confirm_pass(false);
    } else {
      setIsEyeClose_confirm_pass(true);
    }
  };
  const EyeClickBtn_new_pass = () => {
    if (IsEyeClose_new_pass) {
      setIsEyeClose_new_pass(false);
    } else {
      setIsEyeClose_new_pass(true);
    }
  };
  const EyeClickBtn_fill_current_pass = () => {
    if (IsEyeClose_fill_current_pass) {
      setIsEyeClose_fill_current_pass(false);
    } else {
      setIsEyeClose_fill_current_pass(true);
    }
  };
  const ChangePassword_Btn = () => {
    Change_Password_API_Calling_function(
      AuthToken,
      NewPassword_state.New_Password
    );
  };
  const Start_Editing_Password = () => {
    current_Password.current.focus();
    setIs_Password_Editing(true);
  };
  const Cancel_Btn = () => {
    setCurrent_Password([]);
    setComparPassword_Result({
      password_Is_true: false,
      password_IS_Wrong_Shake: false,
    });
  };
  const Start_Editing_Two_Step_Verification = () => {
    setIs_Editing_Two_Step_Verification(true);
  };
  const Cancel_Editing_Two_Step_Verification = () => {
    setIs_Editing_Two_Step_Verification(false);
  };
  const Toggle_Two_Step_Verification = () => {
    
    toggle_two_step_verification_API_Calling_Function(
      AuthToken,
      The_password_container_for_two_step_verification
    );
    sessionStorage.clear("User_InforMation");
  };
  const two_step_verification_Password_Input_Filed = (e) => {
    setThe_password_container_for_two_step_verification(e.target.value);
  };
  useEffect(() => {
    current_Password.current.focus();
  }, [Is_Password_Editing]);
  useEffect(() => {
    New_Password_ref.current?.focus();
  }, [ComparPassword_Result.password_Is_true]);
  useEffect(() => {
    FetchUserDetail(AuthToken);
  }, []);
  useEffect(() => {
    FetchUserDetail(AuthToken);
    setIs_Editing_Two_Step_Verification(false);
  }, [Two_step_verification_is_completed.success]);
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
                      <div
                        className={`${styles.input_field} ${
                          ComparPassword_Result.password_IS_Wrong_Shake
                            ? "shake-horizontal"
                            : ""
                        }`}
                      >
                        <input
                          type={IsEyeClose ? "text" : "password"}
                          id="Current_Password"
                          onChange={Current_Password_Input_Filed}
                          placeholder="Enter Your Current Password To Change Password"
                          disabled={!Is_Password_Editing}
                          ref={current_Password}
                          value={Current_Password}
                        />
                        <button onClick={EyeClickBtn} type="button">
                          <Eye isEyeClose={IsEyeClose} />
                        </button>
                      </div>
                    </div>
                    {ComparPassword_Result.password_Is_true ? (
                      <>
                        <div className={styles.fill_the_current_password_filed}>
                          <label htmlFor="New_Password">new Password</label>
                          <div
                            className={`${styles.input_field} ${
                              ComparPassword_Result.password_IS_Wrong_Shake
                                ? "shake-horizontal"
                                : ""
                            }`}
                          >
                            <input
                              type={IsEyeClose_new_pass ? "text" : "password"}
                              id="New_Password"
                              name="New_Password"
                              onChange={New_Password_Input_Filed}
                              placeholder="New Password"
                              ref={New_Password_ref}
                            />
                            <button
                              onClick={EyeClickBtn_new_pass}
                              type="button"
                            >
                              <Eye isEyeClose={IsEyeClose_new_pass} />
                            </button>
                          </div>
                        </div>
                        <div className={styles.fill_the_current_password_filed}>
                          <label htmlFor="Confirm_Password">
                            Confirm Password
                          </label>
                          <div
                            className={`${styles.input_field} ${
                              ComparPassword_Result.password_IS_Wrong_Shake
                                ? "shake-horizontal"
                                : ""
                            }`}
                          >
                            <input
                              type={
                                IsEyeClose_confirm_pass ? "text" : "password"
                              }
                              id="Confirm_Password"
                              name="Confirm_Password"
                              onChange={New_Password_Input_Filed}
                              placeholder="Confirm Password"
                            />
                            <button
                              onClick={EyeClickBtn_confirm_pass}
                              type="button"
                            >
                              <Eye isEyeClose={IsEyeClose_confirm_pass} />
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    {ComparPassword_Result.password_Is_true ? (
                      <div className={styles.Button_section}>
                        <button
                          className="transperent-btn py-2 mx-2"
                          onClick={Cancel_Btn}
                        >
                          Cancel
                        </button>
                        <button
                          className="filled-btn py-2 mx-2"
                          onClick={ChangePassword_Btn}
                          disabled={
                            NewPassword_state.New_Password !==
                            NewPassword_state.Confirm_Password
                          }
                        >
                          save
                        </button>
                      </div>
                    ) : (
                      <div className={styles.Button_section}>
                        {Is_Password_Editing ? (
                          <button
                            className="filled-btn py-2"
                            onClick={CheckPassword_Button}
                          >
                            sumbit
                          </button>
                        ) : (
                          <button
                            className="filled-btn py-2"
                            onClick={Start_Editing_Password}
                          >
                            edit
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {Current_Page_Indicator === "two_step_verification" ? (
            <>
              <div className={styles.Two_Step_Verification_Main_Section}>
                <div className={styles.Two_Step_Verification_Inner_Section}>
                  <div className={styles.Title_Main_Section}>
                    <h3>
                      two step verification is{" "}
                      {UserInfo.twoStepVerification ? (
                        <span>on</span>
                      ) : (
                        <span>off</span>
                      )}
                    </h3>
                  </div>
                  <div className={styles.Input_And_Button_Section}>
                    {Is_Editing_Two_Step_Verification ? (
                      <div className={styles.fill_the_current_password_filed}>
                        <label htmlFor="New_Password">
                          enter your Password
                        </label>
                        <div
                          className={`${styles.input_field} ${
                            Two_step_verification_is_completed.password_is_wrong
                              ? "shake-horizontal"
                              : ""
                          }`}
                        >
                          <input
                            type={
                              IsEyeClose_fill_current_pass ? "text" : "password"
                            }
                            id="fill_current_password"
                            name="fill_current_password"
                            onChange={
                              two_step_verification_Password_Input_Filed
                            }
                            placeholder="enter your Password"
                            ref={New_Password_ref}
                          />
                          <button
                            onClick={EyeClickBtn_fill_current_pass}
                            type="button"
                          >
                            <Eye isEyeClose={IsEyeClose_fill_current_pass} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className={styles.Button_Section}>
                      {Is_Editing_Two_Step_Verification ? (
                        <>
                          <button
                            className="transperent-btn py-2 mx-2"
                            onClick={Cancel_Editing_Two_Step_Verification}
                          >
                            Cancel
                          </button>
                          <button
                            className="filled-btn py-2 mx-2"
                            onClick={Toggle_Two_Step_Verification}
                            disabled={
                              The_password_container_for_two_step_verification.length <
                              6
                            }
                          >
                            {!UserInfo.twoStepVerification
                              ? "turn on"
                              : " turn off"}
                          </button>
                        </>
                      ) : (
                        <button
                          className="filled-btn py-2 mx-2"
                          onClick={Start_Editing_Two_Step_Verification}
                        >
                          {!UserInfo.twoStepVerification
                            ? "turn on"
                            : " turn off"}
                        </button>
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
