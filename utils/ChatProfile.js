import React, { useContext, useRef } from "react";
import styles from "./styles/style.module.css";
import noteContext from "@/context/noteContext";
function ChatProfile(props) {
  const context = useContext(noteContext);
  const {
    AuthToken,
    UserInfo,
    Selected_Chat_Users_Data_To_Chat,
    setSelected_Chat_Users_Data_To_Chat,
    Message_Fetching_API_Controller_Function,
    Active_State,
    ShowGroupInfoModal,
    setShowGroupInfoModal,
    setActive_State,
  } = context;
  const { Chat_Info, LatestMessage, Search_Query } = props;

  const Start_Existing_Conversation_Button = (
    Id,
    ProfilePhoto,
    Name,
    ISGroupChat,
    users,
    _user_ID
  ) => {
    const NewInfoObj = {
      _ID: Id,
      _Profile_Photo: ProfilePhoto,
      _Name: Name,
      _IS_GroupChat: ISGroupChat,
      _Users: users,
      _userID: _user_ID,
    };
    setShowGroupInfoModal(false)
    Message_Fetching_API_Controller_Function(AuthToken, NewInfoObj._ID);
    setSelected_Chat_Users_Data_To_Chat(NewInfoObj);
    setActive_State(true);
  };
  return (
    <div className="w-100">
      {Chat_Info.IsGroupChat ? (
        <div
          className={`${styles.ChatProfile} ${
            Selected_Chat_Users_Data_To_Chat?._ID == Chat_Info._id
              ? "Current_Chat_Indicator"
              : ""
          } ${
            Chat_Info.ChatName.toLowerCase().includes(Search_Query)
              ? ""
              : "d-none"
          } `}
          onClick={() =>
            Start_Existing_Conversation_Button(
              Chat_Info._id,
              Chat_Info.ProfileImage,
              Chat_Info.ChatName,
              Chat_Info.IsGroupChat,
              Chat_Info.users
            )
          }
        >
          <div className={styles.ChatProfileInner}>
            <div className={styles.ProfilePhoto}>
              <picture>
                <source src={Chat_Info.ProfileImage} type="" />
                <img src={Chat_Info.ProfileImage} alt="" />
              </picture>
            </div>
            <div className={styles.ProfileText}>
              <h4>{Chat_Info.ChatName}</h4>
              <p>{Chat_Info.LatestMessage?.Content}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-100">
          {Chat_Info.users.map((_users_info) => (
            <div
              key={_users_info._id}
              className={`${styles.ChatProfile} ${
                _users_info._id == UserInfo._id ? "d-none" : ""
              }  ${
                Selected_Chat_Users_Data_To_Chat?._ID == Chat_Info._id
                  ? "Current_Chat_Indicator"
                  : ""
              } ${
                _users_info.name.toLowerCase().includes(Search_Query)
                  ? ""
                  : "d-none"
              } `}
              onClick={() =>
                Start_Existing_Conversation_Button(
                  Chat_Info._id,
                  _users_info.ProfileImage,
                  _users_info.name,
                  Chat_Info.IsGroupChat,
                  Chat_Info.users,
                  _users_info._id
                )
              }
            >
              <div className={styles.ChatProfileInner}>
                <div className={styles.ProfilePhoto}>
                  <div className={styles.DefaultProfile}>
                    {_users_info.ProfileImage ? (
                      <picture>
                        <source src={_users_info.ProfileImage} type="" />
                        <img
                          src={_users_info.ProfileImage}
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
                        <p>{_users_info.name?.split(" ")[0].split("")[0]}</p>
                        <p>{_users_info.name?.split(" ")[1].split("")[0]}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.ProfileText}>
                  <h4>{_users_info.name}</h4>
                  <p>{Chat_Info.LatestMessage?.Content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatProfile;
