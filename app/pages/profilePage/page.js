"use client";
import React, { useRef, useContext, useState, useEffect } from "react";
import styles from "../styles/style.module.css";
import noteContext from "@/context/noteContext";
import { LuCamera } from "react-icons/lu";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

function Profile() {
  const initialState = [];
  const { push } = useRouter();
  const context = useContext(noteContext);
  const {
    AuthToken,
    setIsLogIn,
    IsLogIn,
    UserInfo,
    Update_User_Information,
    FetchUserDetail,
  } = context;
  const BgColorGenerator = () => {
    return localStorage.getItem("backgroundColor");
  };
  const [ProfilePhoto, setProfilePhoto] = useState(initialState);
  const [Updated_Info, setUpdated_Info] = useState(initialState);
  const [EditInfo, setEditInfo] = useState(false);
  const HtmlRef = useRef(null);
  const LogOutButton = () => {
    let getToken = getCookie("Users_Authentication_Token");
    if (getToken) {
      setIsLogIn(false);
      deleteCookie("Users_Authentication_Token");
      sessionStorage.clear("User_InforMation");
    }
  };
  const EditProfileButton = () => {
    if (!EditInfo) {
      setEditInfo(true);
      setTimeout(() => {
        HtmlRef.current.focus();
      }, 1);
    } else {
      setEditInfo(false);
    }
  };
  const EditUserInformationButton = () => {
    if (Updated_Info.name || Updated_Info.username || Updated_Info.email) {
      console.log(Updated_Info)
      const formdata = new FormData();
      formdata.append("ProfileImage", ProfilePhoto);
      formdata.append("name", Updated_Info.name);
      formdata.append("username", Updated_Info.username);
      formdata.append("email", Updated_Info.email);
      setEditInfo(false);
      Update_User_Information(AuthToken, formdata);
    }
  };
  const UpdateInfo = (e) => {
    setUpdated_Info({ ...Updated_Info, [e.target.name]: e.target.value });
    console.log(Updated_Info);
  };
  const Profile_Input_filed = (e) => {
    setProfilePhoto(e.target.files[0]);
  };
  useEffect(() => {
    if (!IsLogIn) {
      push("/pages/auth/login");
    } else {
      FetchUserDetail();
    }
  }, [IsLogIn]);
  return (
    <div className="container-main-sec">
      <div className={styles.ProfilePageMainSection}>
        <div className={styles.TitleSection}>
          <div className={styles.HeaderFlexSection}>
            <div className={styles.TextSec}>
              <h1>My Profile</h1>
            </div>
            <div className={styles.ButtonGroupSec}>
              <button className="filled-btn" onClick={LogOutButton}>
                log out
              </button>
            </div>
          </div>
        </div>
        <div className={styles.UserInformationSection}>
          <div className={styles.UserInformationFlexSection}>
            <div className={styles.UserProfileImage}>
              <div className={styles.ProfileImage}>
                <div
                  className={styles.DefaultProfile}
                  style={{ backgroundColor: BgColorGenerator() }}
                >
                  {UserInfo.ProfileImage ? (
                    <picture>
                      <source src={UserInfo.ProfileImage} type="" />
                      <img
                        src={UserInfo.ProfileImage}
                        alt=""
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </picture>
                  ) : (
                    <div className={styles.pera}>
                      <p>{UserInfo.name?.split(" ")[0].split("")[0]}</p>
                      <p>{UserInfo.name?.split(" ")[1].split("")[0]}</p>
                    </div>
                  )}
                </div>
                <div className={styles.UpdateImage}>
                  <label htmlFor="ProfileImage">
                    <LuCamera />
                  </label>
                  <input
                    type="file"
                    name="ProfileImage"
                    id="ProfileImage"
                    className="d-none"
                    disabled={!EditInfo}
                    onChange={Profile_Input_filed}
                  />
                </div>
              </div>
            </div>
            <div className={styles.UserInformation}>
              <div className={styles.HeaderSection}>
                <div className={styles.HeaderFlexSection}>
                  <div className={styles.Text}>
                    <h2>Personal Information</h2>
                  </div>
                  <div className={styles.Buttons}>
                    {EditInfo ? (
                      <button
                        className="filled-btn"
                        onClick={EditUserInformationButton}
                      >
                        save
                      </button>
                    ) : (
                      <button
                        className="filled-btn"
                        onClick={EditProfileButton}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.Information}>
                <div className={styles.RowOne}>
                  <div className={styles.Column12}>
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      placeholder={UserInfo.name}
                     
                      disabled={!EditInfo}
                      ref={HtmlRef}
                      onChange={UpdateInfo}
                      name="name"
                    />
                  </div>
                </div>
                <div className={styles.RowOne}>
                  <div className={styles.Column6}>
                    <label htmlFor="">UserName</label>
                    <input
                      type="text"
                      placeholder={UserInfo.username}
                      
                      disabled={!EditInfo}
                      onChange={UpdateInfo}
                      name="username"
                    />
                  </div>
                  <div className={styles.Column6}>
                    <label htmlFor="">Role</label>
                    <input
                      type="text"
                      placeholder={UserInfo.role}
                      style={{cursor:'not-allowed'}}
                      disabled
                    />
                  </div>
                </div>
                <div className={styles.RowOne}>
                  <div className={styles.Column12}>
                    <label htmlFor="">Email</label>
                    <input
                      type="text"
                      placeholder={UserInfo.email}
                      disabled={!EditInfo}
                      onChange={UpdateInfo}
                      name="email"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
