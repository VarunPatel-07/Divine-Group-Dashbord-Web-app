"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import styles from "../styles/style.module.css";
import { FaPlus, FaLock } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { LuMoveRight } from "react-icons/lu";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaCamera } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import noteContext from "@/context/noteContext";
import bg from "./bg.png";
import Image from "next/image";
import Loader from "@/utils/Loader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ChatProfile from "@/utils/ChatProfile";
import Banner from "../../../images/banner.png";
import useSound from "use-sound";
import io from "socket.io-client";
// todo the error is in only this page find it
function ChatPage() {
  const [play] = useSound("./sounds/sentMessageSound.mp3");
  const initialState = [];
  const { push } = useRouter();
  const MessageRef = useRef(null);
  const CurrentMessageRef = useRef(null);
  const context = useContext(noteContext);
  const {
    HOST,
    Fetch_All_Chats,
    FetchUserDetail,
    AuthToken,
    IsLogIn,
    ChatData,
    UserInfo,
    MessageContent_Container_State,
    setMessageContent_Container_State,
    AllChatUsersInfo,
    Active_State,
    ShowGroupInfoModal,
    setShowGroupInfoModal,
    Selected_Chat_Users_Data_To_Chat,
    Fetch_All_Users_For_Chat,
    Create_Group_Chat_API_Caller,
    Create_One_TO_One_Chat_API_Caller,
    Message_Fetching_API_Controller_Function,
    Send_Messages_API_Controller_Function,
  } = context;
  const [ShowModal, setShowModal] = useState(false);
  const [ShowCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [GroupChat_Profile, setGroupChat_Profile] = useState(initialState);
  const [SelectedUsersArray, setSelectedUsersArray] = useState([]);
  const [Add_GroupName_Modal, setAdd_GroupName_Modal] = useState(false);
  const [GroupChat_ChatName, setGroupChat_ChatName] = useState(initialState);
  const [Users_Id_Array_State_Handler, setUsers_Id_Array_State_Handler] =
    useState(initialState);
  const [ChatUsersLoding, setChatUsersLoding] = useState(false);
  const [SearchParaMeters, setSearchParaMeters] = useState(false);
  const [GroupUsersInformation, setGroupUsersInformation] =
    useState(initialState);
  const [InputMessage, setInputMessage] = useState(initialState);
  const [Search_Query, setSearch_Query] = useState(initialState);
  const [IS_Socket_Connected, setIS_Socket_Connected] = useState(false);
  var socket, selectedChatCompar;
  useEffect(() => {
    const _User_Info_ = JSON.parse(sessionStorage.getItem("User_InforMation"));
    socket = io(HOST);
    socket.emit("initialize", _User_Info_);
    socket.on("connection", () => {
      setIS_Socket_Connected(true);
    });
    selectedChatCompar = Selected_Chat_Users_Data_To_Chat;
  }, []);
  useEffect(() => {
    socket?.on("Message Received", (newMessageReceived) => {
      if (
        !Selected_Chat_Users_Data_To_Chat ||
        Selected_Chat_Users_Data_To_Chat._id !== newMessageReceived.chat._id
      ) {
        // notification
      } else {
        setMessageContent_Container_State([
          ...MessageContent_Container_State,
          newMessageReceived,
        ]);
      }
    });
  });

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
  const Go_Back_To_Chat_ModalPage_Button = () => {
    setAdd_GroupName_Modal(false);
  };
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

  const Show_Add_ChatName_Modal = () => {
    SelectedUsersArray.map((Info) =>
      setUsers_Id_Array_State_Handler((Previous) => [...Previous, Info._id])
    );
    setAdd_GroupName_Modal(true);
  };
  const GroupChatName = (e) => {
    setGroupChat_ChatName(e.target.value);
  };
  const GroupChatProfile_Photo_Selector = (e) => {
    setGroupChat_Profile(e.target.files[0]);
  };
  const Create_Group_Chat_Button = () => {
    const usersIdArray = JSON.stringify(Users_Id_Array_State_Handler);
    const formdata = new FormData();
    formdata.append("usersId", usersIdArray);
    formdata.append("chatName", GroupChat_ChatName);
    formdata.append("ProfileImage", GroupChat_Profile);
    Create_Group_Chat_API_Caller(AuthToken, formdata);
    setShowCreateGroupModal(false);
    setAdd_GroupName_Modal(false);
  };

  const Start_New_Conversation_Button = (Id) => {
    const formdata = new FormData();
    formdata.append("userId", Id);

    Create_One_TO_One_Chat_API_Caller(AuthToken, formdata);
  };
  const Search_Members_OR_Chat_On_Search = (e) => {
    if (e.target.value) {
      setSearch_Query(e.target.value);
      setSearchParaMeters(true);
      // Fetch_All_Chats(AuthToken, e.target.value);
      Fetch_All_Users_For_Chat(AuthToken, e.target.value);
    } else {
      setSearch_Query([]);
      setSearchParaMeters(false);
      Fetch_All_Chats(AuthToken);
    }
  };
  const ShowGroupInfoButton = (_Chat_Information) => {
    console.log(_Chat_Information);
    if (_Chat_Information.length == []) {
    } else {
      setShowGroupInfoModal(true);
      console.log(_Chat_Information);
      setGroupUsersInformation(_Chat_Information);
    }
  };
  const Close_Modal_Button = () => {
    setShowGroupInfoModal(false);
  };
  const DeleteChatButton = () => {};
  const Message_Input_Field = (e) => {
    setInputMessage(e.target.value);
  };
  const Call_MessageSending_API_On_Sumbit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("chatId", Selected_Chat_Users_Data_To_Chat._ID);
    formdata.append("content", InputMessage);
    Send_Messages_API_Controller_Function(AuthToken, formdata);
    setInputMessage("");
  };
  useEffect(() => {
    if (CurrentMessageRef.current) {
      CurrentMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [Selected_Chat_Users_Data_To_Chat, MessageContent_Container_State]);

  useEffect(() => {
    if (!IsLogIn) {
      push("/pages/auth/login");
    } else {
      Fetch_All_Chats(AuthToken);
    }
  }, []);
  return (
    <SkeletonTheme baseColor="#1a142a" highlightColor="#1f1830" width="100%">
      <div className="container-main-sec">
        <div className={styles.ChatPageSectionMain}>
          <div className={styles.ChatPageSectionInnerDiv}>
            <div className={styles.ChatPageFlexSection}>
              {/* this is the  section where all the chat is gonna listed */}
              <div className={styles.ChatUsersListPart}>
                <div className={styles.ChatUsersListPartInnerSection}>
                  <div className={styles.SearchBar}>
                    <div className={styles.Search}>
                      <input
                        type="search"
                        name="searchBar"
                        id=""
                        placeholder="search or start new chat"
                        onChange={Search_Members_OR_Chat_On_Search}
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
                  {/* checking the chats is exist or not and not exist then showin message */}

                  {ChatData.length == 0 ? (
                    <div style={{ width: "100%", height: "100px" }}>
                      <Loader />
                    </div>
                  ) : (
                    <div className="w-100">
                      {SearchParaMeters ? (
                        <div className={styles.All_ChatIcons_Flex_Section}>
                          <h1>chats</h1>
                        </div>
                      ) : (
                        ""
                      )}
                      {ChatData.map((chatinfo) => (
                        <div key={chatinfo._id}>
                          <ChatProfile
                            Chat_Info={chatinfo}
                            Search_Query={Search_Query}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* only visible in ui when the user is searching */}
                  {SearchParaMeters ? (
                    <div className={styles.All_ChatIcons_Flex_Section}>
                      {AllChatUsersInfo.length == 0 ? <></> : <h1>users</h1>}

                      {AllChatUsersInfo?.map((ChatInformation) => (
                        <div
                          className={`${styles.Chat_Icons_Div} ${
                            Selected_Chat_Users_Data_To_Chat._userID ===
                            ChatInformation._id
                              ? "d-none w-0 visibility-hidden"
                              : ""
                          } ${
                            ChatData.some((user) =>
                              user.users.some(
                                (info) => info._id == ChatInformation._id
                              )
                            )
                              ? "d-none"
                              : ""
                          } `}
                          key={ChatInformation._id}
                          onClick={() =>
                            Start_New_Conversation_Button(
                              ChatInformation._id,
                              ChatInformation.ProfileImage,
                              ChatInformation.name
                            )
                          }
                        >
                          <div className={styles.ChatProfile}>
                            <div className={styles.ChatProfileInner}>
                              <div className={styles.ProfilePhoto}>
                                <div className={styles.DefaultProfile}>
                                  {ChatInformation.ProfileImage ? (
                                    <picture>
                                      <source
                                        src={ChatInformation.ProfileImage}
                                        type=""
                                      />
                                      <img
                                        src={ChatInformation.ProfileImage}
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
                                        {
                                          ChatInformation.name
                                            ?.split(" ")[0]
                                            .split("")[0]
                                        }
                                      </p>
                                      <p>
                                        {
                                          ChatInformation.name
                                            ?.split(" ")[1]
                                            .split("")[0]
                                        }
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className={styles.ProfileText}>
                                <h4>{ChatInformation.name}</h4>
                                <p>{ChatInformation.LatestMessage}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {/* Create_Group_Chat_Modal */}
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
                            <div
                              className={styles.SelectedUsersProfileInnerSec}
                            >
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
                    {ChatUsersLoding ? (
                      <Loader />
                    ) : (
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
                                      <source
                                        src={UserInfo.ProfileImage}
                                        type=""
                                      />
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
                                        {
                                          UserInfo.name
                                            ?.split(" ")[0]
                                            .split("")[0]
                                        }
                                      </p>
                                      <p>
                                        {
                                          UserInfo.name
                                            ?.split(" ")[1]
                                            .split("")[0]
                                        }
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
                    )}
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
                        <button onClick={Show_Add_ChatName_Modal}>
                          <LuMoveRight />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add_Group_Chat_ChatName_Modal */}
                <div
                  className={`${styles.Add_Group_Chat_ChatName_Modal} ${
                    Add_GroupName_Modal
                      ? "Show_Group_Chat_Modal"
                      : "Hide_Group_Chat_Modal"
                  }`}
                >
                  <div
                    className={
                      styles.Add_Group_Chat_ChatName_Modal_InnerSection
                    }
                  >
                    <div className={styles.Group_Chat_Header_Section}>
                      <div className={styles.Header}>
                        <div className={styles.Back_Button}>
                          <button onClick={Go_Back_To_Chat_ModalPage_Button}>
                            <IoArrowBack />
                          </button>
                        </div>
                        <div className={styles.Header_Text}>
                          <h3> add name And profile Photo</h3>
                        </div>
                      </div>
                    </div>
                    <div className={styles.Group_Chat_Profile_Photo}>
                      <div className={styles.ProfileImage}>
                        <label htmlFor="GroupChatProfile">
                          <HiMiniUserGroup />
                          <div className={styles.Camera_Icon}>
                            <FaCamera />
                            <p>add group icon</p>
                          </div>
                        </label>
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
                        <input
                          type="text"
                          name="ChatName"
                          placeholder="Enter Group Name"
                          onChange={GroupChatName}
                        />
                      </div>
                    </div>
                    <div
                      className={styles.Final_Create_Group_Chat_Button_Section}
                    >
                      <div
                        className={`${styles.Final_Button} ${
                          GroupChat_ChatName.length > 0
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
              </div>
              {/* this is a page where the chat of the users is gonna see */}
              <div className={styles.CurrentChatPartPage}>
                <div className={styles.Current_ChatPart_Page_Inner_Section}>
                  <div className={styles.Chat_BackGround_Image}>
                    <Image src={bg} alt="" width="100%" height="100%" />
                  </div>

                  <div className={styles.Send_Messages_UI_Main_Div}>
                    <div className={styles.Send_Messages_Headers}>
                      <div
                        className={styles.Send_Messages_Headers_Inner_Section}
                        onClick={() =>
                          ShowGroupInfoButton(Selected_Chat_Users_Data_To_Chat)
                        }
                      >
                        {Selected_Chat_Users_Data_To_Chat._Name ? (
                          <div className={styles.DefaultProfile}>
                            {Selected_Chat_Users_Data_To_Chat._Profile_Photo !==
                            undefined ? (
                              <picture>
                                <source
                                  src={
                                    Selected_Chat_Users_Data_To_Chat._Profile_Photo
                                  }
                                  type=""
                                />
                                <img
                                  src={
                                    Selected_Chat_Users_Data_To_Chat._Profile_Photo
                                  }
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
                                  {
                                    Selected_Chat_Users_Data_To_Chat._Name?.split(
                                      ""
                                    )[0]
                                  }
                                </p>
                                <p>
                                  {
                                    Selected_Chat_Users_Data_To_Chat._Name
                                      ?.split(" ")[1]
                                      ?.split("")[0]
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <Skeleton
                              width="45px"
                              height="45px"
                              circle={true}
                            />
                          </div>
                        )}

                        <div className={styles.Text_Sec}>
                          {Selected_Chat_Users_Data_To_Chat._Name ? (
                            <h4>{Selected_Chat_Users_Data_To_Chat._Name}</h4>
                          ) : (
                            <h4>
                              <Skeleton width="200px" height="100%" />
                            </h4>
                          )}
                          {Selected_Chat_Users_Data_To_Chat._Name ? (
                            <p>click hear for group info</p>
                          ) : (
                            <p>
                              <Skeleton width="200px" height="100%" />
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className={styles.Send_Messages_Text_Input_Field_For_Text}
                    >
                      <div className={styles.ScrollableSection}>
                        {MessageContent_Container_State.length == 0 ? (
                          <div style={{ width: "100%", height: "100px" }}>
                            <Loader />
                          </div>
                        ) : (
                          <div className={styles.Flex__Section}>
                            {MessageContent_Container_State?.map((message) => (
                              <div
                                key={message._id}
                                className={`${styles.Messages_Outre_Div} ${
                                  message.sender._id == UserInfo._id
                                    ? "Message_Sent"
                                    : "Message_Received"
                                }`}
                              >
                                <div
                                  className={`${styles.Message_Inner} Display_Flex`}
                                >
                                  {message.sender._id == UserInfo._id ? (
                                    ""
                                  ) : (
                                    <div
                                      className={styles.Message_Sender_Profile}
                                    >
                                      <div className={styles.DefaultProfile}>
                                        {message.sender.ProfileImage ? (
                                          <picture>
                                            <source
                                              src={message.sender.ProfileImage}
                                              type=""
                                            />
                                            <img
                                              src={message.sender.ProfileImage}
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
                                              {
                                                message.sender.name?.split(
                                                  ""
                                                )[0]
                                              }
                                            </p>
                                            <p>
                                              {
                                                message.sender.name
                                                  ?.split(" ")[1]
                                                  ?.split("")[0]
                                              }
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  <div
                                    className={`${styles.Message_content} Message_Arrow`}
                                  >
                                    <p>{message.Content}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div
                              ref={CurrentMessageRef}
                              style={{ width: "0", overflow: "hidden" }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.Send_Messages_Footer_Input_Field}>
                      <div className={styles.Input_Filed_To_Enter_Message}>
                        <form onSubmit={Call_MessageSending_API_On_Sumbit}>
                          <input
                            type="text"
                            ref={MessageRef}
                            name=""
                            placeholder="type a message"
                            id=""
                            value={InputMessage}
                            onChange={Message_Input_Field}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.GroupChatInformation} ${
                    ShowGroupInfoModal ? "Show_Group_Info" : "Hide_Group_Info"
                  }`}
                >
                  <div className={styles.GroupChatInformation_Inner_Sec}>
                    <div className={styles.GroupInfoTitle}>
                      <div className={styles.TitleInnerSec}>
                        <div className={styles.CloseButton}>
                          <button onClick={Close_Modal_Button}>
                            <IoClose />
                          </button>
                        </div>
                        <div className={styles.ChatName_Title}>
                          <p>
                            {GroupUsersInformation._IS_GroupChat
                              ? "group info"
                              : "contact info"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.GroupInformation_Info_Section}>
                      <div className={styles.Profile_Photo_And_Name_section}>
                        <div className={styles.DefaultProfile}>
                          {GroupUsersInformation._Profile_Photo ? (
                            <picture>
                              <source
                                src={GroupUsersInformation._Profile_Photo}
                                type=""
                              />
                              <img
                                src={GroupUsersInformation._Profile_Photo}
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
                              <p>{GroupUsersInformation._Name?.split("")[0]}</p>
                              <p>
                                {
                                  GroupUsersInformation._Name
                                    ?.split(" ")[1]
                                    ?.split("")[0]
                                }
                              </p>
                            </div>
                          )}
                        </div>
                        <div className={styles.Group_And_Contact_Name}>
                          <p>{GroupUsersInformation._Name}</p>
                        </div>
                      </div>
                      {GroupUsersInformation._IS_GroupChat ? (
                        <div className={styles.AllMemberList_Section}>
                          <div className={styles.Title}>
                            <h6>members</h6>
                          </div>
                          <div className={styles.List_OF_All_Members}>
                            {GroupUsersInformation._Users?.map((info) => (
                              <div
                                className={styles.MembersGroupProfile}
                                key={info._id}
                              >
                                <div
                                  className={
                                    styles.MembersGroupProfile_Inner_Section
                                  }
                                >
                                  <div className={styles.Profile_Photo}>
                                    <div className={styles.DefaultProfile}>
                                      {info.ProfileImage ? (
                                        <picture>
                                          <source
                                            src={info.ProfileImage}
                                            type=""
                                          />
                                          <img
                                            src={info.ProfileImage}
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
                                          <p>{info.name?.split("")[0]}</p>
                                          <p>
                                            {
                                              info.name
                                                ?.split(" ")[1]
                                                ?.split("")[0]
                                            }
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className={styles.User_Info}>
                                    <div className={styles.Name}>
                                      <p>
                                        {info.name === UserInfo.name
                                          ? `you`
                                          : `${info.name}`}
                                      </p>
                                    </div>
                                    <div className={styles.userName}>
                                      <p>{info.username}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className={styles.CRUD_Operation_Section}>
                        <ul>
                          <li>
                            <button onClick={DeleteChatButton}>
                              <span>
                                <MdOutlineDeleteOutline />
                              </span>
                              <p>delete chat</p>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {Active_State ? (
                  ""
                ) : (
                  <div className={styles.NotActive_DefaultPage_main}>
                    <div className={styles.NotActive_DefaultPage_Inner}>
                      <div className={styles.Banner_Image}>
                        <Image width="100%" height="100%" src={Banner} alt="" />
                      </div>
                      <div className={styles.Text_Section}>
                        <div className={styles.Main_Text}>
                          <h3>
                            Click on chats or search users to start a
                            conversation easily and quickly.
                          </h3>
                        </div>
                        <div className={styles.Secondary_Text}>
                          <span>
                            <FaLock />
                          </span>
                          <p>your personal chat are end to end encrypted</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default ChatPage;
