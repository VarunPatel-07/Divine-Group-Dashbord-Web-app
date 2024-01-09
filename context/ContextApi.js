"use client";
require("dotenv").config();
import React, { useState } from "react";
import axios from "axios";
import NoteContext from "./noteContext";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Cryptr from "cryptr";

//
//
const ContextApi = ({ children }) => {
  const cryptr = new Cryptr("#DEVINE#GROUP123456", {
    encoding: "base64",
    pbkdf2Iterations: 1000,
    saltLength: 10,
  });
  const HOST = "http://localHOST:500";
  const initialState = [];
  const [GlobalLoadingState, setGlobalLoadingState] = useState({
    LogInLoading: false,
  });
  const [ErrorState, setErrorState] = useState({
    IsError: false,
    ErrorMessage: "",
  });
  const [content, setContent] = useState(initialState);
  const [Projects, setProjects] = useState(initialState);
  const [PublicProjects, setPublicProjects] = useState(initialState);
  const [UserInfo, setUserInfo] = useState({
    name: "d g",
  });
  const { push } = useRouter();
  const AuthToken = [];

  const [IsLogIn, setIsLogIn] = useState(() => {
    let getToken = getCookie("Users_Authentication_Token");

    if (getToken === undefined) {
      return false;
    } else {
      return true;
    }
  });

  if (IsLogIn) {
    let token = cryptr.decrypt(getCookie("Users_Authentication_Token"));
    AuthToken.push(JSON.parse(token));
  }

  //  this is the function to make the jwt token very secure
  const SecureTokenCoveter = (Token) => {
    const SecureAuthToken = cryptr.encrypt(JSON.stringify(Token));
    return SecureAuthToken;
  };
  // this the function is used to register user
  const RegisterUser = async (formdata) => {
    try {
      const response = await axios({
        method: "post",
        url: `${HOST}/app/api/auth/register`,
        data: formdata,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });

      if (response.data.success) {
        const SecureToken = SecureTokenCoveter(response.data.token);

        setIsLogIn(true);

        let token = setCookie("Users_Authentication_Token", SecureToken);

        AuthToken.push(token);

        FetchUserDetail(response.data.token);
        push("/auth/Otp");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // this the function is used to login the user
  const LogInToYourAccount = async (formdata) => {
    try {
      setGlobalLoadingState({
        LogInLoading: true,
      });
      const response = await axios.post(`${HOST}/app/api/auth/login`, formdata);
      if (response.data.success) {
        FetchUserDetail(response.data.token);
        const SecureToken = SecureTokenCoveter(response.data.token);

        setIsLogIn(true);

        let token = setCookie("Users_Authentication_Token", SecureToken);
        console.log(token);
        AuthToken.push(token);

        setGlobalLoadingState({
          LogInLoading: false,
        });
        if (response.data.twoStepVerification) {
          push("/auth/Otp");
        } else {
          push("/");
        }
       
      } else {
        setErrorState({ IsError: true, ErrorMessage: response.data.message });
        setTimeout(() => {
          setErrorState({ IsError: false, ErrorMessage: "" });
        }, 3000);
        setGlobalLoadingState({
          LogInLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // verify OTP
  const VerifyOTP = async (VerificationInput) => {
    try {
      const response = await axios.post(
        `${HOST}/app/api/auth/emailvarification` ,VerificationInput
      );
      if (response.data.success) {
        push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // this the function is used to fetch all the user detail
  const FetchUserDetail = async (Token) => {
    try {
      if (Token.length == 0) {
      } else {
        if (!sessionStorage.getItem("User_InforMation")) {
          const response = await axios.get(`${HOST}/app/api/auth/getuserinfo`, {
            headers: {
              authtoken: Token,
            },
          });

          const Data = response.data;
          setUserInfo(Data);

          sessionStorage.setItem("User_InforMation", JSON.stringify(Data));
        } else {
          const Data = JSON.parse(sessionStorage.getItem("User_InforMation"));
          setUserInfo(Data);
        }
      }
    } catch (error) {}
  };
  // this the function is used to add project
  const ControlAddProjects = async (formdata, Token) => {
    try {
      if (Token.length == 0) {
      } else {
        const response = await axios({
          method: "post",
          url: `${HOST}/app/api/project/addproject`,
          data: formdata,
          headers: {
            authtoken: Token,
            "Content-Type": `multipart/form-data`,
          },
        });
        FetchAllPublicProjects(Token);
        FetchAllYourProjects(Token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // this the function is used to fetch all the project which is added by the login user
  const FetchAllYourProjects = async (Token) => {
    try {
      if (Token.length == 0) {
      } else {
        const response = await axios.get(
          `${HOST}/app/api/project/fetchAllUsersProject`,
          {
            headers: {
              "Content-Type": `multipart/form-data`,
              authtoken: Token,
            },
          }
        );
        const Data = response.data;

        setProjects(Data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // this the function is used to fetch all the project present in the database
  const FetchAllPublicProjects = async (Token) => {
    try {
      if (Token.length == 0) {
      } else {
        const response = await axios.get(
          `${HOST}/app/api/project/fetchPublicProjects`,
          {
            headers: {
              "Content-Type": `multipart/form-data`,
              authtoken: Token,
            },
          }
        );
        const Data = response.data;
        setPublicProjects(Data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const contextValue = {
    content,
    IsLogIn,
    AuthToken,
    UserInfo,
    Projects,
    PublicProjects,
    ErrorState,
    GlobalLoadingState,
    VerifyOTP,
    FetchAllYourProjects,
    ControlAddProjects,
    FetchUserDetail,
    RegisterUser,
    LogInToYourAccount,
    FetchAllPublicProjects,
  };
  return (
    <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>
  );
};
export default ContextApi;
