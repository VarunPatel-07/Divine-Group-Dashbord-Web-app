"use client";
require("dotenv").config();
import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteContext from "./noteContext";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Cryptr from "cryptr";
import io from "socket.io-client";

//
//
const ContextApi = ({ children }) => {
  const cryptr = new Cryptr("#DEVINE#GROUP123456", {
    encoding: "base64",
    pbkdf2Iterations: 1000,
    saltLength: 10,
  });
  const HOST = "http://localHOST:500";
  const WeatherAPI_Key = "9b860e2afc6486921d1350a0db0190d5";
  var socket = io(HOST);
  const initialState = [];
  const [ChatData, setChatData] = useState(initialState);
  const [GlobalLoadingState, setGlobalLoadingState] = useState({
    LogInLoading: false,
    Sign_In_Loding: false,
    OTP_Verification_Loding: false,
    Single_Project_Loding: false,
    Profile_Loding: false,
  });
  const [ErrorState, setErrorState] = useState({
    IsError: false,
    ErrorMessage: "",
  });
  const [content, setContent] = useState(initialState);
  const [UsersProjects, setUsersProjects] = useState(initialState);
  const [PublicProjects, setPublicProjects] = useState(initialState);
  const [SpecificProjectDetails, setSpecificProjectDetails] =
    useState(initialState);
  const [AllChatUsersInfo, setAllChatUsersInfo] = useState(initialState);
  const [UserInfo, setUserInfo] = useState(initialState);
  const [MessageContent_Container_State, setMessageContent_Container_State] =
    useState(initialState);
  const [Active_State, setActive_State] = useState(false);
  const [ShowGroupInfoModal, setShowGroupInfoModal] = useState(false);
  const [
    Selected_Chat_Users_Data_To_Chat,
    setSelected_Chat_Users_Data_To_Chat,
  ] = useState(initialState);
  const [Notification, setNotification] = useState(initialState);
  const [ComanGroupInfoContainer, setComanGroupInfoContainer] =
    useState(initialState);
  const [Weather_Info_State, setWeather_Info_State] = useState(initialState);
  const [Customer_Info, setCustomer_Info] = useState(initialState);
  const NotificationArray = [];
  const { push } = useRouter();
  const AuthToken = [];
  const [ListOFUsers_Container_State, setListOFUsers_Container_State] =
    useState(initialState);
  const [Client_search_result, setClient_search_result] =
    useState(initialState);
  const [Show_Btn, setShow_Btn] = useState(true);
  const [Is_Sending, setIs_Sending] = useState(false);
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
      setGlobalLoadingState({
        Sign_In_Loding: true,
      });
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
        push("/pages/auth/Otp");
        setGlobalLoadingState({
          Sign_In_Loding: false,
        });
      } else {
        console.log(response.data.message);
        setGlobalLoadingState({
          Sign_In_Loding: false,
        });
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
        }, 1500);
        setGlobalLoadingState({
          LogInLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // verify OTP
  const VerifyOTP = async (Token, VerificationInput) => {
    try {
      console.log(VerificationInput);
      setGlobalLoadingState({
        OTP_Verification_Loding: true,
      });
      const response = await axios({
        method: "post",
        url: `${HOST}/app/api/auth/emailvarification`,
        data: VerificationInput,
        headers: {
          authtoken: Token,
        },
      });
      console.log(response);
      if (response.data.success) {
        push("/");
        setGlobalLoadingState({
          OTP_Verification_Loding: false,
        });
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
        setGlobalLoadingState({
          Profile_Loding: true,
        });
        if (!sessionStorage.getItem("User_InforMation")) {
          const response = await axios.get(`${HOST}/app/api/auth/getuserinfo`, {
            headers: {
              authtoken: Token,
            },
          });

          const Data = response.data;
          setUserInfo(Data);
          setGlobalLoadingState({
            Profile_Loding: false,
          });

          sessionStorage.setItem("User_InforMation", JSON.stringify(Data));
        } else {
          const Data = JSON.parse(sessionStorage.getItem("User_InforMation"));

          setGlobalLoadingState({
            Profile_Loding: false,
          });
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

        setUsersProjects(Data);
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
  const FetchSpecificProject = async (Token, id) => {
    try {
      setGlobalLoadingState({
        Single_Project_Loding: true,
      });
      if (Token.length == 0) {
      } else {
        const response = await axios.get(
          `${HOST}/app/api/project/fetchSpecificProject/${id}`,
          {
            headers: {
              authtoken: Token,
            },
          }
        );
        const Data = response.data;
        console.log(Data);
        setGlobalLoadingState({
          Single_Project_Loding: false,
        });
        setSpecificProjectDetails(Data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Update_User_Information = async (Token, Updated_Info) => {
    try {
      if (Token.length == 0) {
      } else {
        const response = await axios({
          method: "put",
          url: `${HOST}/app/api/auth/updateUserinfo`,
          data: Updated_Info,
          headers: {
            authtoken: Token,
            "Content-Type": `multipart/form-data`,
          },
        });
        const Data = response.data;

        setUserInfo(Data);
        sessionStorage.clear("User_InforMation");
        FetchUserDetail(Token);
        console.log(Data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Fetch_All_Chats = async (Token, search_query) => {
    try {
      if (Token.length == 0) {
      } else {
        const response = await axios({
          method: "get",
          url: `${HOST}/app/api/chat/fetchChat`,
          headers: {
            authtoken: Token,
          },
        });
        const Data = response.data;
        setChatData(Data);
      }
    } catch (error) {}
  };
  const Fetch_All_Users_For_Chat = async (Token, searchVal) => {
    try {
      if (Token.length == 0) {
      } else {
        const response = await axios.get(
          `${HOST}/app/api/chat/fetchAllUsersForChat?search=${
            searchVal ? searchVal : ""
          }`,
          {
            headers: {
              authtoken: Token,
            },
          }
        );

        const Data = response.data;
        setAllChatUsersInfo(Data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Create_Group_Chat_API_Caller = async (Token, formdata) => {
    try {
      if (Token.length == 0) {
      } else {
        const response = await axios({
          method: "post",
          url: `${HOST}/app/api/chat/creatGroupGhat`,
          data: formdata,
          headers: {
            authtoken: Token,
            "Content-Type": `multipart/form-data`,
          },
        });
        if (response.data.success) {
          socket.on(
            "NewGroupCreatedBackEndSocket",
            response.data.FullGroupChat
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Create_One_TO_One_Chat_API_Caller = async (Token, formdata) => {
    try {
      if (Token.length == 0) {
      } else {
        const response = await axios({
          method: "post",
          url: `${HOST}/app/api/chat/createChat`,
          data: formdata,
          headers: {
            authtoken: Token,
            "Content-Type": `multipart/form-data`,
          },
        });
        socket.emit("NewChatCreatedBackendSocket", response.data.FullChat);
        if (response.data.success) {
          Fetch_All_Chats(Token);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // todo ==>> complete this from frontend to backend
  const Fetch_ALL_Similar_Group = async (Token, ID) => {
    try {
      const response = axios.get(
        `${HOST}/app/api/chat/fetchAllRelatedChat/:${ID}`,
        {
          headers: {
            authtoken: Token,
            "Content-Type": `multipart/form-data`,
          },
        }
      );
    } catch (error) {}
  };
  const Message_Fetching_API_Controller_Function = async (Token, _ID) => {
    try {
      if (Token.length == 0 && _ID.length == 0) return;
      else {
        const response = await axios.get(
          `${HOST}/app/api/message/fetchMessage/${_ID}`,
          {
            headers: {
              authtoken: Token,
              "Content-Type": `multipart/form-data`,
            },
          }
        );
        socket.emit("JoinChatRoom", _ID);
        if (response.data.success) {
          const Message = response.data.FetchMessage;

          setMessageContent_Container_State(Message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Send_Messages_API_Controller_Function = async (
    Token,
    formdata,
    _ID
  ) => {
    try {
      if (Token.length == 0) return;
      else {
        const response = await axios({
          method: "post",
          url: `${HOST}/app/api/message/sendMessage`,
          data: formdata,
          headers: {
            authtoken: Token,
            "Content-Type": `multipart/form-data`,
          },
        });

        if (response.data.success) {
          const NewMessages = response.data.Message;

          socket.emit("NewMessageSocket", NewMessages);
          Fetch_All_Chats(Token);
          setMessageContent_Container_State([
            ...MessageContent_Container_State,
            NewMessages,
          ]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Send_Messages_With_Images_API_Controller_Function = async (
    Token,
    formdata
  ) => {
    try {
      const response = await axios({
        method: "post",
        url: `${HOST}/app/api/message/SendImages`,
        data: formdata,
        headers: {
          authtoken: Token,
          "Content-Type": `multipart/form-data`,
        },
      });
      if (response.data.success) {
        const NewMessages = response.data.Message;
        socket.emit("NewMessageSocket", NewMessages);

        setMessageContent_Container_State([
          ...MessageContent_Container_State,
          NewMessages,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const NotificationController = (NewMessageReceived) => {
    if (!Notification.includes(NewMessageReceived)) {
      setNotification((previous) => [...previous, NewMessageReceived]);
      console.log("notification2", NewMessageReceived);
    }
  };
  const Edit_Message_API_Caller_Function = async (Token, formdata, Id) => {
    try {
      if (Token.length == 0) return;
      const response = await axios({
        method: "put",
        url: `${HOST}/app/api/message/EditMessage/${Id}`,
        data: formdata,
        headers: {
          authtoken: Token,
          "Content-Type": `multipart/form-data`,
        },
      });
      const Data = response.data;
      socket.emit("EditMessageSocket", Data.Message);
    } catch (error) {
      console.log(error);
    }
  };
  const Delete_Message_Api_Caller = async (Token, Id) => {
    try {
      if (Token.length == 0) return;
      const response = await axios({
        method: "delete",
        url: `${HOST}/app/api/message/DeleteMessage/${Id}`,
        headers: {
          authtoken: Token,
          "Content-Type": `multipart/form-data`,
        },
      });
      const Data = response.data;
      socket.emit("DeleteMessageSocket", Data.Message);
    } catch (error) {
      console.log(error);
    }
  };
  const Add_Member_IN_Group_API_Caller_Function = async (
    Token,
    GroupID,
    formdata
  ) => {
    try {
      if (Token.length == 0) return;
      const response = await axios({
        method: "put",
        url: `${HOST}/app/api/chat/addMemberToChat/${GroupID}`,
        data: formdata,
        headers: {
          authtoken: Token,
          "Content-Type": `multipart/form-data`,
        },
      });
      socket.emit(
        "NewMemberADDInGroupBackEndSocket",
        response.data.UpdatedChat
      );
    } catch (error) {}
  };
  const Remove_User_From_Group_API_Caller = async (
    Token,
    GroupID,
    formdata
  ) => {
    try {
      if (Token.length == 0) return;
      const response = await axios({
        method: "put",
        url: `${HOST}/app/api/chat/removeMember/${GroupID}`,
        data: formdata,
        headers: {
          authtoken: Token,
          "Content-Type": `multipart/form-data`,
        },
      });
      const Data = response.data;
      socket.emit("MemberRemovedFromGroupBackEndSocket", Data.UpdatedChat);
    } catch (error) {}
  };
  const Find_ALL_Coman_Group = async (Token, ID) => {
    console.log(ID);
    try {
      if (Token.length == 0) return;
      const response = await axios.get(
        `${HOST}/app/api/chat/fetchAllRelatedChat/${ID}`,
        {
          headers: {
            authtoken: Token,
            "Content-Type": `multipart/form-data`,
          },
        }
      );
      const Data = response.data;
      if (Data.success) {
        setComanGroupInfoContainer(Data.FetchAllRelatedChat);
      }
    } catch (error) {}
  };
  const Clear_All_Chat_API_Caller = async (Token, ChatId) => {
    try {
      if (Token.length == 0) return;
      const response = await axios.delete(
        `${HOST}/app/api/message/clearAllChats/${ChatId}`,
        {
          headers: {
            authtoken: Token,
            "Content-Type": `multipart/form-data`,
          },
        }
      );
      if (response.data.success) {
        Message_Fetching_API_Controller_Function(Token, ChatId);
      }
    } catch (error) {}
  };
  const Rename_Chat_API_Caller_Function = async (Token, Id, formdata) => {
    try {
      if (Token.length == 0) return;
      const response = await axios({
        method: "put",
        url: `${HOST}/app/api/chat/renameChat/${Id}`,
        data: formdata,
        headers: {
          authtoken: Token,
          "Content-Type": `multipart/form-data`,
        },
      });
      const Data = response.data;

      socket.emit("ChatInfoUpdatedBackEndSocket", Data.updatedChat);
    } catch (error) {}
  };
  const Delete_Chat_API_Caller_Function = async (Token, ChatID) => {
    try {
      if (Token.length == 0) return;
      const response = await axios({
        method: "delete",
        url: `${HOST}/app/api/chat/DeleteALLChat/${ChatID}`,
        headers: {
          authtoken: Token,
          "Content-Type": `multipart/form-data`,
        },
      });
      const Data = response.data;
      socket.emit("ChatDeletedBackEndSocket", Data.updatedChat);
      Clear_All_Chat_API_Caller(Token, ChatID);
    } catch (error) {}
  };
  const Weather_API_Caller_Function = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WeatherAPI_Key}`
      );

      const weatherData = response.data;

      setWeather_Info_State(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  const Customer_Fetching_Api = async (Token, Page_NO) => {
    try {
      const response = await axios.get(
        `${HOST}/app/api/customerContactInfo/GetAllCustomer?page=${
          Page_NO || 1
        }`,
        {
          headers: {
            authtoken: Token,
            "Content-Type": `multipart/form-data`,
          },
        }
      );
      const Data = response.data;
      if (Data.success) {
        setCustomer_Info(Data.Filtered_Data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Search_Customer_Fetching_API = async (Token, searchVal) => {
    try {
      const response = await axios.get(
        `${HOST}/app/api/customerContactInfo/searchCustomer?search=${searchVal}`,
        {
          headers: {
            authtoken: Token,
            "Content-Type": `multipart/form-data`,
          },
        }
      );
      const Data = response.data;
      if (Data.success) {
        console.log(Data.clientArr);
        setClient_search_result(Data.clientArr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const List_OF_User_Fetching_API_Caller_Function = async (Token, PageNo) => {
    console.log("pageno", PageNo);
    try {
      if (Token.length == 0) {
      } else {
        const response = await axios({
          method: "get",
          url: `${HOST}/app/api/auth/fetchAllUsers?PageNo=${PageNo || 1}`,
          headers: {
            authtoken: Token,
            "Content-Type": `multipart/form-data`,
          },
        });
        if (response.data && response.data.length > 0) {
          setShow_Btn(true);
          console.log(response.data);
          setListOFUsers_Container_State(response.data);
          if (response.data.length >= 10) {
          } else {
            setShow_Btn(false);
          }
        } else {
          setShow_Btn(false);
        }
      }
    } catch (error) {}
  };
  const Mail_Sending_To_Client_API_Caller_Function = async (
    Token,
    formdata
  ) => {
    try {
      setIs_Sending(true);
      const response = await axios({
        method: "post",
        url: `${HOST}/app/api/mail/sendMailToClient`,
        headers: {
          authtoken: Token,
          "Content-Type": `multipart/form-data`,
        },
        data: formdata,
      });
      console.log(response);
      setIs_Sending(false);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    HOST,
    content,
    IsLogIn,
    AuthToken,
    UserInfo,
    UsersProjects,
    PublicProjects,
    ErrorState,
    GlobalLoadingState,
    SpecificProjectDetails,
    ChatData,
    AllChatUsersInfo,
    MessageContent_Container_State,
    Selected_Chat_Users_Data_To_Chat,
    Active_State,
    ShowGroupInfoModal,
    Notification,
    ComanGroupInfoContainer,
    setNotification,
    Customer_Info,
    setCustomer_Info,
    Weather_Info_State,
    Show_Btn,
    Is_Sending,
    setShow_Btn,
    Client_search_result,
    setClient_search_result,
    ListOFUsers_Container_State,
    setListOFUsers_Container_State,
    setWeather_Info_State,
    setShowGroupInfoModal,
    setMessageContent_Container_State,
    setActive_State,
    setSelected_Chat_Users_Data_To_Chat,
    VerifyOTP,
    setIsLogIn,
    FetchAllYourProjects,
    ControlAddProjects,
    FetchUserDetail,
    RegisterUser,
    LogInToYourAccount,
    FetchAllPublicProjects,
    FetchSpecificProject,
    Update_User_Information,
    Fetch_All_Chats,
    Fetch_All_Users_For_Chat,
    Create_Group_Chat_API_Caller,
    Create_One_TO_One_Chat_API_Caller,
    Fetch_ALL_Similar_Group,
    Message_Fetching_API_Controller_Function,
    Send_Messages_API_Controller_Function,
    Send_Messages_With_Images_API_Controller_Function,
    NotificationController,
    Edit_Message_API_Caller_Function,
    Delete_Message_Api_Caller,
    Add_Member_IN_Group_API_Caller_Function,
    Remove_User_From_Group_API_Caller,
    Find_ALL_Coman_Group,
    Clear_All_Chat_API_Caller,
    Rename_Chat_API_Caller_Function,
    Delete_Chat_API_Caller_Function,
    Weather_API_Caller_Function,
    Customer_Fetching_Api,
    Search_Customer_Fetching_API,
    List_OF_User_Fetching_API_Caller_Function,
    Mail_Sending_To_Client_API_Caller_Function,
  };
  return (
    <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>
  );
};
export default ContextApi;
