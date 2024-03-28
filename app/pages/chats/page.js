"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import Script from "next/script";
import styles from "../styles/style.module.css";
import {
  FaPlus,
  FaLock,
  FaImages,
  FaChevronDown,
  FaPen,
  FaRegSave,
} from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IoArrowBack, IoDocumentText } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { LuMoveRight } from "react-icons/lu";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaCamera } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { MdOutlineDeleteOutline, MdOutlineGroupAdd } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

import noteContext from "@/context/noteContext";
import bg from "./bg.png";
import Image from "next/image";
import Loader from "@/utils/Loader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ChatProfile from "@/utils/ChatProfile";
import Banner from "../../../images/banner.png";
import { AiOutlineClear, AiOutlineUserAdd } from "react-icons/ai";

import io from "socket.io-client";

// todo the error is in only this page find it
function ChatPage() {
  const HOST = "http://localHOST:500";
  socket = io(HOST);
  const initialState = [];
  const { push } = useRouter();
  const MessageRef = useRef(null);
  const CurrentMessageRef = useRef(null);
  const Input_Ref = useRef(null);
  const context = useContext(noteContext);

  const {
    newArray,
    Fetch_All_Chats,
    FetchUserDetail,
    AuthToken,
    IsLogIn,
    ChatData,
    UserInfo,
    MessageContent_Container_State,
    setMessageContent_Container_State,
    AllChatUsersInfo,
    Notification,
    setNotification,
    ComanGroupInfoContainer,
    Active_State,
    ShowGroupInfoModal,
    setShowGroupInfoModal,
    Selected_Chat_Users_Data_To_Chat,
    setSelected_Chat_Users_Data_To_Chat,
    Fetch_All_Users_For_Chat,
    Create_Group_Chat_API_Caller,
    Create_One_TO_One_Chat_API_Caller,
    Message_Fetching_API_Controller_Function,
    Send_Messages_API_Controller_Function,
    Send_Messages_With_Images_API_Controller_Function,
    NotificationController,
    Edit_Message_API_Caller_Function,
    Delete_Message_Api_Caller,
    Add_Member_IN_Group_API_Caller_Function,
    Remove_User_From_Group_API_Caller,
    Clear_All_Chat_API_Caller,
    Rename_Chat_API_Caller_Function,
    Delete_Chat_API_Caller_Function,
    Show_Chat_Section_On_Click,
    setShow_Chat_Section_On_Click,
    Not_Show_Current_Chat_Page, setNot_Show_Current_Chat_Page,
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
  const [Typing, setTyping] = useState(false);
  const [IS_Typing, setIS_Typing] = useState({
    _typing: false,
    _Sender_Info: [],
  });
  const [ShowMoreActionModal, setShowMoreActionModal] = useState(false);
  const [SendImagesState, setSendImagesState] = useState(initialState);
  const [Show_Send_Messages_Modal, setShow_Send_Messages_Modal] =
    useState(false);

  const [Is_Edited_Message_Container, setIs_Edited_Message_Container] =
    useState({
      Edited: false,
      message: [],
    });

  const [ShowDeleteMessagePopup, setShowDeleteMessagePopup] = useState({
    state: false,
    message: [],
  });
  const [Add_New_Member_To_Group_Modal, setAdd_New_Member_To_Group_Modal] =
    useState({ Show: false, Users_Info: [], _Group_ID: [] });
  const [EditableChatName, setEditableChatName] = useState(false);
  
  const [
    RenameChatStateHandlerForChatName,
    setRenameChatStateHandlerForChatName,
  ] = useState(initialState);
  const [
    RenameChatStateHandlerForProfile_Image,
    setRenameChatStateHandlerForProfile_Image,
  ] = useState(initialState);
  var socket, selectedChatCompar;
  useEffect(() => {
    const _User_Info_ = JSON.parse(sessionStorage.getItem("User_InforMation"));
    socket.emit("initialize", _User_Info_);
    socket.on("connected", () => {
      setIS_Socket_Connected(true);
    });
    socket.on("startTyping", (Room) =>
      setIS_Typing({ _typing: true, _Sender_Info: Room })
    );

    socket.on("stopTyping", () =>
      setIS_Typing({ _typing: false, _Sender_Info: [] })
    );

    selectedChatCompar = Selected_Chat_Users_Data_To_Chat;
  }, []);

  useEffect(() => {
    socket?.on("MessageReceived", (NewMessageReceived) => {
      //  todo notification
      if (NewMessageReceived) {
        Message_Fetching_API_Controller_Function(
          AuthToken,
          NewMessageReceived.ChatId._id
        );
        Fetch_All_Chats(AuthToken);
      }
    });
    socket?.on("MessageEdited", (EditedMessageReceived) => {
      Message_Fetching_API_Controller_Function(
        AuthToken,
        EditedMessageReceived.ChatId._id
      );
      Fetch_All_Chats(AuthToken);
    });
    socket?.on("MessageDeleted", (DeletedMessageReceived) => {
      Message_Fetching_API_Controller_Function(
        AuthToken,
        DeletedMessageReceived.ChatId
      );
      Fetch_All_Chats(AuthToken);
    });
    socket?.on("NewChatCreated", () => {
      Fetch_All_Chats(AuthToken);
    });
    socket?.on("NewMemberADDInGroup", () => {
      Fetch_All_Chats(AuthToken);
    });
    socket?.on("NewGroupCreated", () => {
      Fetch_All_Chats(AuthToken);
    });

    socket?.on("MemberRemovedFromGroup", () => {
      Fetch_All_Chats(AuthToken);
    });
    socket?.on("ChatInfoUpdated", (UpdatedChatInfo) => {
      const NewInfoObj = {
        _ID: UpdatedChatInfo._id,
        _Profile_Photo: UpdatedChatInfo.ProfileImage,
        _Name: UpdatedChatInfo.ChatName,
        _IS_GroupChat: UpdatedChatInfo.IsGroupChat,
        _Users: UpdatedChatInfo.users,
        _Sender: UserInfo,
        _Group_Admin_Info: UpdatedChatInfo.GroupAdmin,
        _Users_ID: UpdatedChatInfo.users,
      };
      setSelected_Chat_Users_Data_To_Chat(NewInfoObj);
      Fetch_All_Chats(AuthToken);
    });
    socket?.on("ChatDeleted", () => {
      Fetch_All_Chats(AuthToken);
    });
  });

  const Message_Input_Field = (e) => {
    console.log(IS_Typing);
    setInputMessage(e.target.value);
    if (!IS_Socket_Connected) return;

    // Ensure typing state is managed correctly
    if (!Typing) {
      setTyping(true);
      // Emit "startTyping" event when user starts typing
      socket.emit("startTyping", Selected_Chat_Users_Data_To_Chat);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 4000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      // If user is typing and has been inactive for the timer length, emit "stopTyping" event
      if (timeDiff >= timerLength && Typing) {
        socket.emit("stopTyping", Selected_Chat_Users_Data_To_Chat);
        setTyping(false);
      }
    }, timerLength);
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
      // console.log(SelectedUsersArray);
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
    if (_Chat_Information.length == []) {
    } else {
      setShowGroupInfoModal(true);
      setNot_Show_Current_Chat_Page(true)
      console.log(_Chat_Information);
      setGroupUsersInformation(_Chat_Information);
      setRenameChatStateHandlerForChatName(_Chat_Information._Name);
    }
  };
  const Close_Modal_Button = () => {
    setShowGroupInfoModal(false);
    setNot_Show_Current_Chat_Page(false)
  };

  const Call_MessageSending_API_On_Sumbit = (e) => {
    e.preventDefault();
    if (!Is_Edited_Message_Container.Edited) {
      if (InputMessage.length == 0) {
      } else {
        socket.emit("stopTyping", Selected_Chat_Users_Data_To_Chat._ID);

        const formdata = new FormData();
        formdata.append("chatId", Selected_Chat_Users_Data_To_Chat._ID);
        formdata.append("content", InputMessage);
        Send_Messages_API_Controller_Function(
          AuthToken,
          formdata,
          Selected_Chat_Users_Data_To_Chat._ID
        );
        setInputMessage("");
      }
    } else {
      if (InputMessage.length == 0) {
      } else {
        socket.emit("stopTyping", Selected_Chat_Users_Data_To_Chat._ID);
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("content", InputMessage);
        Edit_Message_API_Caller_Function(
          AuthToken,
          formdata,
          Is_Edited_Message_Container.message._id
        );
        setIs_Edited_Message_Container({
          Edited: false,
          message: [],
        });
        setInputMessage("");
      }
    }
  };
  const ShowMoreActionModal_Button_Controller = () => {
    if (ShowMoreActionModal) {
      setShowMoreActionModal(false);
    } else {
      setShowMoreActionModal(true);
    }
  };
  const SendPhotos_And_Video_Button_Controller = () => {
    if (Show_Send_Messages_Modal) {
      setShow_Send_Messages_Modal(false);
    } else {
      setShow_Send_Messages_Modal(true);
    }
    setShowMoreActionModal(false);
  };
  const Chat_Images_Selector = (e) => {
    setSendImagesState(e.target.files);
  };
  const SendPhotos_And_Video_API_Controller_Function = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("chatId", Selected_Chat_Users_Data_To_Chat._ID);
    formdata.append("content", InputMessage);
    for (const Image of SendImagesState) {
      formdata.append("ChatImages", Image);
    }

    setShow_Send_Messages_Modal(false);
    Send_Messages_With_Images_API_Controller_Function(AuthToken, formdata);
    setInputMessage("");
  };
  const Copy_Message_Controller = () => {};
  const Replay_Button_Controller = () => {};
  const Edit_Message_Button = (e, message) => {
    setInputMessage(message.Content);
    setIs_Edited_Message_Container({
      Edited: true,
      message: message,
    });
  };
  const Delete_Message_Button = (e, message) => {
    e.preventDefault();
    setShowDeleteMessagePopup({ state: true, message: message });
  };
  const Delete_message_Final_Button_Controller = (message) => {
    console.log(message);
    Delete_Message_Api_Caller(AuthToken, message._id);

    setShowDeleteMessagePopup({ state: false, message: [] });
  };
  const ShowAdd_New_Member_In_Group_Controller = (Users_Array, GroupID) => {
    setAdd_New_Member_To_Group_Modal({
      Show: true,
      Users_Info: Users_Array,
      _Group_ID: GroupID,
    });
    Fetch_All_Users_For_Chat(AuthToken);
  };
  const Add_Selected_User_To_The_Group = (NewUsersArray, GroupId) => {
    const Users_Id_Array = [];
    NewUsersArray.map((info) => Users_Id_Array.push(info._id));
    console.log("Json", JSON.stringify(Users_Id_Array));
    const formdata = new FormData();
    formdata.append("usersId", JSON.stringify(Users_Id_Array));
    Add_Member_IN_Group_API_Caller_Function(AuthToken, GroupId, formdata);
    setAdd_New_Member_To_Group_Modal({
      Show: false,
      Users_Info: [],
      _Group_ID: "",
    });
  };
  const Remove_User_From_Group = (GroupID, UserId) => {
    const formdata = new FormData();
    formdata.append("usersId", UserId);
    Remove_User_From_Group_API_Caller(AuthToken, GroupID, formdata);
  };
  const ClearAllChatButton = () => {
    console.log(Selected_Chat_Users_Data_To_Chat._ID);
    Clear_All_Chat_API_Caller(AuthToken, Selected_Chat_Users_Data_To_Chat._ID);
  };
  const SaveChatNameButton = (Id) => {
    console.log(
      RenameChatStateHandlerForProfile_Image,
      RenameChatStateHandlerForChatName
    );
    setEditableChatName(false);
    const formdata = new FormData();
    formdata.append("chatName", RenameChatStateHandlerForChatName);
    formdata.append("ProfileImage", RenameChatStateHandlerForProfile_Image);
    Rename_Chat_API_Caller_Function(AuthToken, Id, formdata);
    setShowGroupInfoModal(false);
  };
  const EditChatNameButton = () => {
    setEditableChatName(true);

    Input_Ref.current.focus();
  };
  const ContentEditableProfileImage = (e) => {
    console.log(e.target.files[0]);
    setRenameChatStateHandlerForProfile_Image(e.target.files[0]);
  };
  const ContentEditableInput = (e) => {
    // console.log(e.target.value);
    setRenameChatStateHandlerForChatName(e.target.value);
  };
  const Delete_Chat_Button = (ChatId) => {
    console.log(ChatId);
    Delete_Chat_API_Caller_Function(AuthToken, ChatId);
  };
  const Create_Group_With_Clicked_User = (info) => {
    info.forEach((element) => {
      if (element._id == UserInfo._id) {
      } else {
        // console.log("heloooooo", element);
        Fetch_All_Users_For_Chat(AuthToken);
        setShowCreateGroupModal(true);
        // SelectedUsersArray
        const isIdIncluded = SelectedUsersArray.some(
          (item) => item._id === element._id
        );
        if (!isIdIncluded) {
          const InfoObj = {
            _id: element._id,
            _Name: element.name,
            _Pic: element.ProfileImage,
          };

          setSelectedUsersArray((prevState) => [...prevState, InfoObj]);
          console.log(SelectedUsersArray);
        } else {
          console.log("included");
        }
        // email: "eva.miller@example.com";
        // name: "Eva Miller";
        // password: "$2b$10$kKnhmRijshk8iIg8aqw2rOpaj8hjidZg/e5kKG6.PbA5Xf9oJ.6Pq";
        // role: "user";
        // twoStepVerification: false;
        // username: "user8";
        // verified: false;
        // __v: 0;
        // _id: "65b8c9112f9ce02aeebe2306";
      }
    });
  };
  const GoBackToTheChatsListPage = () => {
    setSelected_Chat_Users_Data_To_Chat([]);
    setShow_Chat_Section_On_Click(false);
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
      <div className="container-main-sec min_height_100_dvh">
        <div className={styles.ChatPageSectionMain}>
          <div className={styles.ChatPageSectionInnerDiv}>
            <div className={styles.ChatPageFlexSection}>
              {/* this is the  section where all the chat is gonna listed */}
              <div
                className={`${styles.ChatUsersListPart} ${
                  Show_Chat_Section_On_Click ? "not_show_chat_list" : ""
                }`}
              >
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
              <div
                className={`${styles.CurrentChatPartPage} ${
                  Show_Chat_Section_On_Click ? "show_chat_class" : ""
                }`}
              >
                <div
                  className={`${styles.Current_ChatPart_Page_Inner_Section} ${
                    Not_Show_Current_Chat_Page
                      ? "do_not_show_current_chat_page"
                      : ""
                  }`}
                >
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
                        <div className={styles.Respo_Back_Button}>
                          <button
                            className="transperent-btn p-0 border-0 text-white "
                            style={{ fontSize: "16px" }}
                            onClick={GoBackToTheChatsListPage}
                          >
                            <IoArrowBack />
                          </button>
                        </div>
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

                          {IS_Typing._Sender_Info._Sender?._id ==
                          UserInfo._id ? (
                            <p>click hear for users Information info</p>
                          ) : (
                            <p>
                              {IS_Typing._typing ? (
                                <>
                                  {IS_Typing._Sender_Info._IS_GroupChat
                                    ? `${IS_Typing._Sender_Info._Sender.name} is typing...`
                                    : "typing..."}
                                </>
                              ) : (
                                <>
                                  {IS_Typing._Sender_Info._IS_GroupChat
                                    ? "click hear for users group info"
                                    : "click hear for users Information info"}
                                </>
                              )}
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

                                  {message.ContentImage.length == 0 ? (
                                    <div
                                      className={`${styles.Message_content} Message_Arrow`}
                                    >
                                      <div className={styles.InnerSec}>
                                        <p>{message.Content}</p>
                                      </div>
                                      <div className={styles.Edited_Message}>
                                        <span>
                                          {message.Edited ? "Edited" : ""}
                                        </span>
                                      </div>
                                      <div
                                        className={`${styles.DropDownArrowButton} downArrow`}
                                      >
                                        <div className="btn-group dropdown">
                                          <button
                                            type="button"
                                            className="btn "
                                            style={{
                                              border: "0",
                                              outline: "0",
                                              padding: "0",
                                              fontSize: "14px",
                                              color: "var(--main-white-color)",
                                            }}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <BsThreeDotsVertical />
                                          </button>

                                          <ul className="dropdown-menu dropdown-menu-dark">
                                            <li>
                                              <button
                                                className="dropdown-item"
                                                href="#"
                                                onClick={
                                                  Copy_Message_Controller
                                                }
                                              >
                                                copy Message
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                className="dropdown-item"
                                                href="#"
                                                onClick={
                                                  Replay_Button_Controller
                                                }
                                              >
                                                Replay
                                              </button>
                                            </li>

                                            {message.sender._id ==
                                            UserInfo._id ? (
                                              <>
                                                <li>
                                                  <button
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={(e) =>
                                                      Edit_Message_Button(
                                                        e,
                                                        message
                                                      )
                                                    }
                                                  >
                                                    Edit Message
                                                  </button>
                                                </li>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                            <li>
                                              <button
                                                className="dropdown-item"
                                                href="#"
                                                onClick={(e) =>
                                                  Delete_Message_Button(
                                                    e,
                                                    message
                                                  )
                                                }
                                              >
                                                Delete Message
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className={`${styles.ChatImages_Array_Flex_Section} Message_11  Message_Arrow `}
                                    >
                                      <div className={styles.InnerSec}>
                                        <div className={styles.Images}>
                                          {message.ContentImage.map(
                                            (Img, index) => {
                                              return (
                                                <picture key={index}>
                                                  <source src={Img} type="" />
                                                  <img src={Img} alt="" />
                                                </picture>
                                              );
                                            }
                                          )}
                                        </div>
                                        <div className={styles.Content}>
                                          <p>{message.Content}</p>
                                        </div>
                                      </div>
                                      <div className={styles.Edited_Message}>
                                        <span>
                                          {message.Edited ? "Edited" : ""}
                                        </span>
                                      </div>
                                      <div
                                        className={`${styles.DropDownArrowButton} downArrow`}
                                      >
                                        <div className="btn-group dropdown">
                                          <button
                                            type="button"
                                            className="btn "
                                            style={{
                                              border: "0",
                                              outline: "0",
                                              padding: "0",
                                              fontSize: "14px",
                                              color: "var(--main-white-color)",
                                            }}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <BsThreeDotsVertical />
                                          </button>

                                          <ul className="dropdown-menu dropdown-menu-dark">
                                            <li>
                                              <button
                                                className="dropdown-item"
                                                href="#"
                                                onClick={
                                                  Copy_Message_Controller
                                                }
                                              >
                                                copy Message
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                className="dropdown-item"
                                                href="#"
                                                onClick={
                                                  Replay_Button_Controller
                                                }
                                              >
                                                Replay
                                              </button>
                                            </li>
                                            {message.sender._id ==
                                            UserInfo._id ? (
                                              <>
                                                <li>
                                                  <button
                                                    className="dropdown-item"
                                                    onClick={(e) =>
                                                      Edit_Message_Button(
                                                        e,
                                                        message
                                                      )
                                                    }
                                                  >
                                                    Edit Message
                                                  </button>
                                                </li>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                            <li>
                                              <button
                                                className="dropdown-item"
                                                href="#"
                                                onClick={(e) =>
                                                  Delete_Message_Button(
                                                    e,
                                                    message
                                                  )
                                                }
                                              >
                                                Delete Message
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  )}
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
                          <button
                            type="button"
                            onClick={ShowMoreActionModal_Button_Controller}
                            className={
                              ShowMoreActionModal ? "Rotate_button" : ""
                            }
                          >
                            <FaPlus />
                          </button>
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
                      <div
                        className={`${styles.MoreActionModalMainDiv} ${
                          ShowMoreActionModal ? "" : "HideMoreActionModal"
                        } `}
                      >
                        <div className={styles.MoreActionModalInnerDiv}>
                          <ul>
                            <li>
                              <button type="button">
                                <span style={{ color: "#daa073" }}>
                                  <IoDocumentText />
                                </span>
                                <p>document</p>
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                onClick={SendPhotos_And_Video_Button_Controller}
                              >
                                <span
                                  style={{ color: "rgba(244, 24, 132, 1)" }}
                                >
                                  <FaImages />
                                </span>
                                <p>Photos & video </p>
                              </button>
                            </li>
                            <li>
                              <button type="button">
                                <span
                                  className={styles.users}
                                  style={{ color: "#009DE2" }}
                                >
                                  <FaUser />
                                </span>
                                <p>contact </p>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.SendImages_ALL_Action_Modal_Outer_DIV} ${
                    Show_Send_Messages_Modal ? "Hide_Send_Message_Modal" : ""
                  }`}
                >
                  <div
                    className={styles.SendImages_ALL_Action_Modal_Inner_Section}
                  >
                    <div className={styles.Display_Flex__Section}>
                      <form>
                        <div className={styles.Close_Button}>
                          <button
                            onClick={SendPhotos_And_Video_Button_Controller}
                          >
                            <IoIosClose />
                          </button>
                        </div>
                        <div className={styles.ADD_Images_Input}>
                          <label htmlFor="images">
                            <FaImages />
                          </label>
                          <input
                            type="file"
                            name=""
                            id="images"
                            className="d-none"
                            onChange={Chat_Images_Selector}
                            multiple
                          />
                        </div>
                        <div className={styles.ADD_Message_Input}>
                          <input
                            type="text"
                            placeholder="type a message"
                            value={InputMessage}
                            onChange={Message_Input_Field}
                          />
                        </div>
                        <div className={styles.Sumbit_Button}>
                          <button
                            onClick={
                              SendPhotos_And_Video_API_Controller_Function
                            }
                          >
                            <span className={styles.Span_BG}></span>
                            <span>send</span>
                            <MdKeyboardDoubleArrowRight />
                          </button>
                        </div>
                      </form>
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
                          <div>
                            <p>
                              {GroupUsersInformation._IS_GroupChat
                                ? "group info"
                                : "contact info"}
                            </p>
                          </div>
                        </div>
                        {GroupUsersInformation._IS_GroupChat ? (
                          <div className={styles.Edit_Group_Name_Button}>
                            {EditableChatName ? (
                              <button
                                onClick={() =>
                                  SaveChatNameButton(GroupUsersInformation._ID)
                                }
                              >
                                <FaRegSave />
                              </button>
                            ) : (
                              <button onClick={EditChatNameButton}>
                                <FaPen />
                              </button>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
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
                          {EditableChatName ? (
                            <div className={styles.AddGroupImageInput}>
                              <label htmlFor="inputFile">
                                <FaCamera />
                              </label>
                              <input
                                type="file"
                                name=""
                                className="d-none"
                                id="inputFile"
                                onChange={ContentEditableProfileImage}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className={styles.Group_And_Contact_Name}>
                          <textarea
                            disabled={!EditableChatName}
                            ref={Input_Ref}
                            onChange={ContentEditableInput}
                            value={RenameChatStateHandlerForChatName}
                            cols="1"
                          ></textarea>

                          {GroupUsersInformation._Group_Admin_Info ? (
                            <p className="Group_Admin_Name_Pera">
                              Group created by
                              <span style={{ paddingLeft: "4px" }}>
                                {GroupUsersInformation._Group_Admin_Info?.name}
                              </span>
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {GroupUsersInformation._IS_GroupChat ? (
                        <div className={styles.AllMemberList_Section}>
                          <div className={styles.Title}>
                            <h6>members</h6>
                          </div>
                          <div className={styles.List_OF_All_Members}>
                            {GroupUsersInformation._Group_Admin_Info?._id ==
                            UserInfo._id ? (
                              <div
                                className={styles.MembersGroupProfile}
                                onClick={() =>
                                  ShowAdd_New_Member_In_Group_Controller(
                                    GroupUsersInformation._Users,
                                    GroupUsersInformation._ID
                                  )
                                }
                              >
                                <div
                                  className={
                                    styles.MembersGroupProfile_Inner_Section
                                  }
                                >
                                  <div className={styles.Profile_Photo}>
                                    <div className={styles.DefaultProfile}>
                                      <div className={styles.pera}>
                                        <p style={{ fontSize: "25px" }}>
                                          <AiOutlineUserAdd />
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={styles.User_Info}>
                                    <div className={styles.Info}>
                                      <h5>Add New User</h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
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
                                    <div className={styles.Info}>
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
                                    {info._id ==
                                    GroupUsersInformation._Group_Admin_Info
                                      ._id ? (
                                      <div className={styles.GroupAdmin}>
                                        <span>group admin</span>
                                      </div>
                                    ) : (
                                      <div className={styles.Action_Btn}>
                                        <div className="btn-group dropdown">
                                          <button
                                            type="button"
                                            className="btn "
                                            style={{
                                              border: "0",
                                              outline: "0",
                                              padding: "0",
                                              fontSize: "18px",
                                              color: "var(--main-white-color)",
                                            }}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <BsThreeDotsVertical />
                                          </button>

                                          <ul className="dropdown-menu dropdown-menu-dark">
                                            <li>
                                              <button
                                                className="dropdown-item"
                                                href="#"
                                                onClick={() =>
                                                  Remove_User_From_Group(
                                                    GroupUsersInformation._ID,
                                                    info._id
                                                  )
                                                }
                                              >
                                                Remove User
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className={styles.AllMemberList_Section}>
                          <div className={styles.Title}>
                            <h6>
                              {`${ComanGroupInfoContainer.length} groups in
                              comman`}
                            </h6>
                          </div>
                          <div className={styles.List_OF_All_Members}>
                            <div
                              className={styles.MembersGroupProfile}
                              onClick={() =>
                                Create_Group_With_Clicked_User(
                                  GroupUsersInformation._Users
                                )
                              }
                            >
                              <div
                                className={
                                  styles.MembersGroupProfile_Inner_Section
                                }
                              >
                                <div className={styles.Profile_Photo}>
                                  <div className={styles.DefaultProfile}>
                                    <div className={styles.pera}>
                                      <p style={{ fontSize: "22px" }}>
                                        <MdOutlineGroupAdd />
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className={styles.User_Info}>
                                  <div className={styles.Info}>
                                    <div className={styles.Coman_title}>
                                      <p>
                                        create Group with
                                        <span>
                                          {RenameChatStateHandlerForChatName}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {ComanGroupInfoContainer.length > 0 ? (
                              <div className="w-100">
                                {ComanGroupInfoContainer?.map((info) => (
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
                                        <div className={styles.Info}>
                                          <div className={styles.Name}>
                                            <p>{info.ChatName}</p>
                                          </div>
                                          <div className={styles.userName}>
                                            <p>{info.username}</p>
                                          </div>
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
                        </div>
                      )}
                      <div className={styles.CRUD_Operation_Section}>
                        <ul>
                          <li>
                            <button
                              onClick={() =>
                                Delete_Chat_Button(GroupUsersInformation._ID)
                              }
                            >
                              <span>
                                <MdOutlineDeleteOutline />
                              </span>
                              <p>delete chat</p>
                            </button>
                          </li>
                          <li>
                            <button onClick={ClearAllChatButton}>
                              <span>
                                <AiOutlineClear />
                              </span>
                              <p>Clear chat</p>
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
        <div
          className={`${styles.deleteMessagePopup} ${
            ShowDeleteMessagePopup.state ? "" : "d-none"
          }`}
        >
          <div className={styles.deleteMessagePopupInner}>
            <div
              className="card"
              style={{
                backgroundColor: "#342b4a",
                padding: "24px 24px",
                borderRadius: "20px",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                className="card-body"
                style={{
                  backgroundColor: "#342b4a",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0",
                }}
              >
                <div className="w-100">
                  <h5 className="card-title">delete message</h5>
                  <p className="card-text" style={{ marginTop: "20px" }}>
                    do you want to delete the selected massage
                  </p>
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "22px",
                  }}
                >
                  <button
                    className="btn "
                    onClick={() => setShowDeleteMessagePopup({ state: false })}
                  >
                    cancel
                  </button>
                  <button
                    className="btn "
                    onClick={() =>
                      Delete_message_Final_Button_Controller(
                        ShowDeleteMessagePopup.message
                      )
                    }
                    style={{
                      border: "0",
                      backgroundColor: "rgba(244, 24, 132, 1)",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.AddNewUserToGroupForThatShowAllTheUser} ${
            Add_New_Member_To_Group_Modal.Show ? "" : "d-none"
          }`}
        >
          <div className={styles.InnerSec}>
            <div className={styles.Group_Chat_SearchBar}>
              <div className={styles.Header}>
                <div className={styles.Flex_Sec}>
                  <button
                    onClick={() =>
                      setAdd_New_Member_To_Group_Modal({
                        Show: false,
                        Users_Info: [],
                        _Group_ID: [],
                      })
                    }
                  >
                    <IoIosClose />
                  </button>
                  <h5>Add member</h5>
                </div>
              </div>
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
                  <div className={styles.SelectedUsersProfile} key={Info._id}>
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
                            <p>{Info._Name?.split(" ")[0].split("")[0]}</p>
                            <p>{Info._Name?.split(" ")[1].split("")[0]}</p>
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
                    SelectedUsersArray.some((item) => item._id === UserInfo._id)
                      ? "_Selected_"
                      : ""
                  } ${
                    Add_New_Member_To_Group_Modal.Users_Info?.some(
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
                            <p>{UserInfo.name?.split(" ")[0].split("")[0]}</p>
                            <p>{UserInfo.name?.split(" ")[1].split("")[0]}</p>
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
            {SelectedUsersArray.length >= 2 ? (
              <div className={styles.Footer_Button}>
                <button
                  onClick={() =>
                    Add_Selected_User_To_The_Group(
                      SelectedUsersArray,
                      Add_New_Member_To_Group_Modal._Group_ID
                    )
                  }
                >
                  <LuMoveRight />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
    </SkeletonTheme>
  );
}

export default ChatPage;
