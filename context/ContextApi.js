"use client";
import React, { useState } from "react";
import axios from "axios";
import NoteContext from "./noteContext";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
const ContextApi = ({ children }) => {
  const HOST = "http://localHOST:500";
  const initialState = [];
  const [content, setContent] = useState(initialState);
  const [Projects, setProjects] = useState(initialState);
  const [PublicProjects, setPublicProjects] = useState(initialState);
  const [UserInfo, setUserInfo] = useState(initialState);
  if (typeof localStorage !== "undefined") {
  } else {
  }
  const AuthToken = getCookie("AuthToken");
  const [IsLogIn, setIsLogIn] = useState({
    authToken: AuthToken,
    Is_Login_Status: false,
  });

  const { push } = useRouter();

  const RegisterUser = async (formdata) => {
    try {
      const response = await axios.post(
        `${HOST}/app/api/auth/register`,
        formdata
      );
      if (response.data.success) {
        setIsLogIn({
          authToken: response.data.token,
          Is_Login_Status: true,
        });
        setCookie("AuthToken", response.data.token);
        push("/");
        FetchUserDetail(response.data.token);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const LogInToYourAccount = async (formdata) => {
    try {
      const response = await axios.post(`${HOST}/app/api/auth/login`, formdata);

      if (response.data.success) {
        setIsLogIn({
          authToken: response.data.token,
          Is_Login_Status: true,
        });
        setCookie("AuthToken", response.data.token);
        FetchUserDetail(response.data.token);
        push("/");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FetchUserDetail = async (Token) => {
    try {
      const response = await axios.get(`${HOST}/app/api/auth/getuserinfo`, {
        headers: {
          authtoken: Token,
        },
      });
      const Data = response.data;
      setUserInfo(Data);
    } catch (error) {
      console.log(error);
    }
  };
  const ControlAddProjects = async (formdata, Token) => {
    console.log(Token);
    try {
      const response = await axios({
        method: "post",
        url: `${HOST}/app/api/project/addproject`,
        data: formdata,
        headers: {
          authtoken: Token,
          "Content-Type": `multipart/form-data`,
        },
      });
      FetchAllPublicProjects(Token)
      FetchAllYourProjects(Token);
    } catch (error) {
      console.log(error);
    }
  };
  const FetchAllYourProjects = async (Token) => {
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
  };
  const FetchAllPublicProjects = async (Token) => {
    const response = await axios.get(
      `${HOST}/app/api/project/fetchPublicProjects`,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
          authtoken: Token,
        },
      }
    );
    const Data = response.data
    setPublicProjects(Data)
  };
  const contextValue = {
    content,
    IsLogIn,
    AuthToken,
    UserInfo,
    Projects,
    PublicProjects,
    FetchAllYourProjects,
    ControlAddProjects,
    FetchUserDetail,
    RegisterUser,
    LogInToYourAccount,
    FetchAllPublicProjects
  };
  return (
    <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>
  );
};
export default ContextApi;
