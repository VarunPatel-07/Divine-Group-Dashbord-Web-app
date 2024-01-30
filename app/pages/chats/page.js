"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/style.module.css";
import { FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { LuMoveRight } from "react-icons/lu";

import noteContext from "@/context/noteContext";
import bg from "./bg.png";
import Image from "next/image";
function ChatPage() {
  const initialState = [];
  const { push } = useRouter();

  const context = useContext(noteContext);
  const {
    Fetch_All_Chats,
    AuthToken,
    IsLogIn,
    ChatData,
    AllChatUsersInfo,
    Fetch_All_Users_For_Chat,
  } = context;
  const [ShowModal, setShowModal] = useState(false);
  const [ShowCreateGroupModal, setShowCreateGroupModal] = useState(false);

  const [SelectedUsersArray, setSelectedUsersArray] = useState([]);
  const [Add_GroupName_Modal, setAdd_GroupName_Modal] = useState(false);
  const [GroupChatName_State_Handler, setGroupChatName_State_Handler] = useState(initialState);
  const [Users_Id_Array_State_Handler, setUsers_Id_Array_State_Handler] = useState(initialState);
  const [ChatUsersLoding, setChatUsersLoding] = useState(false);
  const BackgroundColor = [
    "#006400",
    "#00008B",
    "#800080",
    "#5D4037",
    "#404040",
    "#008B8B",
    "#006400",
    "#00008B",
    "#800080",
    "#5D4037",
    "#404040",
    "#008B8B",
    "#006400",
    "#00008B",
    "#800080",
    "#5D4037",
    "#404040",
    "#008B8B",
    "#006400",
    "#00008B",
    "#800080",
    "#5D4037",
    "#404040",
    "#008B8B",
  ];
  const BgColorGenerator = () => {
    const color = BackgroundColor[Math.floor(Math.random() * 5)];

    return color;
  };
  const Show_Modal_Button = () => {
    if (ShowModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };
  const Go_Back_Page_Button = () => {
    setShowCreateGroupModal(false);
  };
  const ChangeSearchBar = (e) => {};
  const CreateNewGroupButton = () => {
    setChatUsersLoding(true);
    Fetch_All_Users_For_Chat(AuthToken);
    setChatUsersLoding(false);
    setShowModal(false);
    setShowCreateGroupModal(true);
  };
  const CreateGroupChatSearchBar = (e) => {
    Fetch_All_Users_For_Chat(AuthToken, e.target.value);
  };
  const RemoveMember = (Id) => {
    const isIdIncluded = SelectedUsersArray.some((item) => item._id === Id);
    if (isIdIncluded) {
      const newObj = SelectedUsersArray.filter((obj) => obj._id !== Id);

      setSelectedUsersArray(newObj);
    }
  };

  const AddInTheGroupChatArray = (id, name, pic) => {
    const isIdIncluded = SelectedUsersArray.some((item) => item._id === id);
    if (!isIdIncluded) {
      const InfoObj = {
        _id: id,
        _Name: name,
        _Pic: pic,
      };

      setSelectedUsersArray((prevState) => [...prevState, InfoObj]);
      console.log(SelectedUsersArray);
    } else {
      console.log("included");
    }
  };
  
  const Create_Group_Chat_Button = () => {
    SelectedUsersArray.map((Info) => setUsers_Id_Array_State_Handler((Previous)=>[...Previous , Info._id]));
    setAdd_GroupName_Modal(true)
  };
  const GroupChatName = (e)=>{
    GroupChatName_State_Handler(e.target.value);
  }
  const GroupChatProfile_Photo_Selector = ()=>{

  }
  useEffect(() => {
    if (!IsLogIn) {
      push("/pages/auth/login");
    } else {
      Fetch_All_Chats(AuthToken);
    }
  }, []);
  return (
    <div className="container-main-sec">
      <div className={styles.ChatPageSectionMain}>
        <div className={styles.ChatPageSectionInnerDiv}>
          <div className={styles.ChatPageFlexSection}>
            <div className={styles.ChatUsersListPart}>
              <div className={styles.ChatUsersListPartInnerSection}>
                <div className={styles.SearchBar}>
                  <div className={styles.Search}>
                    <input
                      type="search"
                      name="searchBar"
                      id=""
                      placeholder="search or start new chat"
                      onChange={ChangeSearchBar}
                    />
                  </div>
                  <div className={styles.CreateGroupChatButton}>
                    <div className={styles._button}>
                      <button onClick={Show_Modal_Button}>
                        <FaPlus />
                      </button>
                    </div>
                    <div
                      className={`${styles.Multiple_Option_Modal} ${
                        ShowModal ? "Show_Modal" : "Hide_Modal"
                      }`}
                    >
                      <ul>
                        <li>
                          <button onClick={CreateNewGroupButton}>
                            New Group Chat
                          </button>
                        </li>
                        <li>
                          <button>setting</button>
                        </li>
                        <li>
                          <button>log out</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {ChatData.length > 0 ? (
                  <div className={styles.All_ChatIcons_Flex_Section}>
                    {ChatData?.map((ChatInformation) => {
                      <div className={styles.Chat_Icons_Div}>
                        <div className={styles.ChatsInner}>
                          <div className={styles.ProfilePhoto}>
                            <div className={styles._image}></div>
                          </div>
                          <div className={styles.TextSection}>
                            <div className={styles._Text}>
                              <h2>Name</h2>
                              <p>Latest Message</p>
                            </div>
                          </div>
                        </div>
                      </div>;
                    })}
                  </div>
                ) : (
                  <div className={styles.No_Chat_Data_Exist_Info}>
                    <p>no Chat Exist</p>
                  </div>
                )}
              </div>
              <div
                className={`${styles.Create_Group_Chat_Modal} ${
                  ShowCreateGroupModal
                    ? "Show_Group_Chat_Modal"
                    : "Hide_Group_Chat_Modal"
                }`}
              >
                <div className={styles.Create_Group_Chat_Modal_Inner_Section}>
                  <div className={styles.Group_Chat_Header_Section}>
                    <div className={styles.Header}>
                      <div className={styles.Back_Button}>
                        <button onClick={Go_Back_Page_Button}>
                          <IoArrowBack />
                        </button>
                      </div>
                      <div className={styles.Header_Text}>
                        <h3> add group members</h3>
                      </div>
                    </div>
                  </div>
                  <div className={styles.Group_Chat_SearchBar}>
                    <div className={styles.Search}>
                      <input
                        type="search"
                        name=""
                        onChange={CreateGroupChatSearchBar}
                        placeholder="search with name"
                        id=""
                      />
                    </div>
                    <div
                      className={`${styles.SelectedUsers} ${
                        !SelectedUsersArray.length > 0 ? "" : "_Border_Bottom"
                      }`}
                    >
                      {SelectedUsersArray.map((Info) => (
                        <div
                          className={styles.SelectedUsersProfile}
                          key={Info._id}
                        >
                          <div className={styles.SelectedUsersProfileInnerSec}>
                            <div className={styles.DefaultProfile}>
                              {Info._Pic ? (
                                <picture>
                                  <source src={Info._Pic} type="" />
                                  <img
                                    src={Info._Pic}
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
                                  <p>
                                    {Info._Name?.split(" ")[0].split("")[0]}
                                  </p>
                                  <p>
                                    {Info._Name?.split(" ")[1].split("")[0]}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className={styles.SelectedUsersProfileName}>
                              <p>{Info._Name}</p>
                              <button onClick={() => RemoveMember(Info._id)}>
                                <IoIosClose />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.Group_Chat_All_Members}>
                    {AllChatUsersInfo.map((UserInfo) => (
                      <div
                        className={`${styles.Members_Profile} ${
                          SelectedUsersArray.some(
                            (item) => item._id === UserInfo._id
                          )
                            ? "_Selected_"
                            : ""
                        }`}
                        key={UserInfo._id}
                        onClick={() =>
                          AddInTheGroupChatArray(
                            UserInfo._id,
                            UserInfo.name,
                            UserInfo.ProfileImage
                          )
                        }
                      >
                        <div className={styles.Profile_Inner_sec}>
                          <div className={styles._Profile_Photo}>
                            <div className={styles.DefaultProfile}>
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
                                  <p>
                                    {UserInfo.name?.split(" ")[0].split("")[0]}
                                  </p>
                                  <p>
                                    {UserInfo.name?.split(" ")[1].split("")[0]}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={styles.MembersName}>
                            <div className={styles._InnerFlex}>
                              <h4>{UserInfo.name}</h4>

                              <p>{UserInfo.username}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className={styles.Final_Create_Group_Chat_Button_Section}
                  >
                    {/* {SelectedUsersArray} */}
                    <div
                      className={`${styles.Final_Button} ${
                        SelectedUsersArray.length >= 2
                          ? "_Show_Continue_Btn"
                          : ""
                      }`}
                    >
                      <button onClick={Create_Group_Chat_Button}>
                        <LuMoveRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.Add_Group_Chat_ChatName_Modal} ${
                  Add_GroupName_Modal
                    ? "Show_Group_Chat_Modal"
                    : "Hide_Group_Chat_Modal"
                }`}
              >
                <div
                  className={styles.Add_Group_Chat_ChatName_Modal_InnerSection}
                >
                  <div className={styles.Group_Chat_Header_Section}>
                    <div className={styles.Header}>
                      <div className={styles.Back_Button}>
                        <button onClick={Go_Back_Page_Button}>
                          <IoArrowBack />
                        </button>
                      </div>
                      <div className={styles.Header_Text}>
                        <h3> add group members</h3>
                      </div>
                    </div>
                  </div>
                  <div className={styles.Group_Chat_Profile_Photo}>
                    <div className={styles.ProfileImage}>
                      <label htmlFor="GroupChatProfile"></label>
                      <input
                        type="file"
                        name="GroupChatProfile"
                        id="GroupChatProfile"
                        className="d-none"
                        onChange={GroupChatProfile_Photo_Selector}
                      />
                    </div>
                  </div>
                  <div className={styles.Group_Chat_Add_ChatName_Input_Field}>
                    <div className={styles._Input_Field}>
                      <input type="text" name="ChatName" onChange={GroupChatName} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.CurrentChatPartPage}>
              <div className={styles.Current_ChatPart_Page_Inner_Section}>
                <div className={styles.Chat_BackGround_Image}>
                  <Image src={bg} alt="" width="100%" height="100%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
