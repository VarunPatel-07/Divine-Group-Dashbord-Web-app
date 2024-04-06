"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "../styles/style.module.css";
import noteContext from "@/context/noteContext";
import Script from "next/script";
import { BsThreeDotsVertical } from "react-icons/bs";
import Loader from "@/utils/Loader";
import ClientProfile from "@/components/ClientProfile";
import { MdAttachFile, MdMoveToInbox } from "react-icons/md";
import { CgExpand } from "react-icons/cg";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

import {
  IoClose,
  IoImagesOutline,
  IoSendSharp,
  IoTrashBin,
} from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowRoundBack,
  IoIosClose,
  IoIosExpand,
  IoMdArrowBack,
} from "react-icons/io";
import Head from "next/head";

function Customer() {
  const initialState = [];
  const clientInput = useRef(null);
  const context = useContext(noteContext);
  const [Loding, setLoding] = useState(true);
  const [PageNo, setPageNo] = useState(1);
  const [Selected_Client_Container_State, setSelected_Client_Container_State] =
    useState(initialState);
  const [Selected_client_to_send_mail, setSelected_client_to_send_mail] =
    useState(initialState);
  const [Search_Val, setSearch_Val] = useState("");
  const [ShowSendMailModal, setShowSendMailModal] = useState(false);
  const [Expand_Mail_Modal, setExpand_Mail_Modal] = useState(false);
  const [Email_Img_Storing_State, setEmail_Img_Storing_State] = useState([]);
  const [Email_Files_Storing_State, setEmail_Files_Storing_State] = useState(
    []
  );
  const [Selected_Mail_Storing_State, setSelected_Mail_Storing_State] =
    useState(initialState);
  const [
    Is_Sent_Mail_Clicked_OR_Fetching_Started,
    setIs_Sent_Mail_Clicked_OR_Fetching_Started,
  ] = useState(false);

  const [Mail_Info_Storing_State, setMail_Info_Storing_State] = useState({
    subject: "",
    body: "",
    Img: [],
    Email: [],
  });
  const [Show_Full_View_In_Respo, setShow_Full_View_In_Respo] = useState(false);

  const {
    AuthToken,
    UserInfo,
    Customer_Info,
    setCustomer_Info,
    Customer_Fetching_Api,
    Search_Customer_Fetching_API,
    Client_search_result,
    setClient_search_result,
    Mail_Sending_To_Client_API_Caller_Function,
    Is_Sending,
    FetchAll_Mail_OF_Log_IN_User,
    All_Sent_Mail_Storing_State,
    setAll_Sent_Mail_Storing_State,
    Show_Customer_Pagination_Btn,
    Delete_Mail_API_Calling_Function,
  } = context;
  const Client_Info_Adding = (Info) => {
    setIs_Sent_Mail_Clicked_OR_Fetching_Started(false);
    setSelected_Client_Container_State(Info);
    setShow_Full_View_In_Respo(true);
  };
  const Respo_Back_Button = () => {
    setShow_Full_View_In_Respo(false);
    setSelected_Client_Container_State([]);
  };
  const SearchClientsInput = (e) => {
    setSearch_Val(e.target.value);
    if (e.target.value?.length == 0) {
      setClient_search_result([]);
    } else {
      Search_Customer_Fetching_API(AuthToken, e.target.value);
    }
  };
  const client_array_setter_for_client = (clientInfo) => {
    const isIdIncluded = Selected_client_to_send_mail.some(
      (info) => info._id === clientInfo._id
    );
    if (!isIdIncluded) {
      setSelected_client_to_send_mail((previous) => [...previous, clientInfo]);
      setClient_search_result([]);
      setSearch_Val("");
      clientInput.current.focus();
    }
  };
  const RemoveMember = (Id) => {
    setClient_search_result([]);
    const isIdIncluded = Selected_client_to_send_mail.some(
      (info) => info._id === Id
    );
    if (isIdIncluded) {
      const newObj = Selected_client_to_send_mail.filter(
        (obj) => obj._id !== Id
      );

      setSelected_client_to_send_mail(newObj);
    }
  };
  const send_Mail_Button_Controller = (e) => {
    e.preventDefault();
    setShowSendMailModal(false);
    const formdata = new FormData();

    formdata.append("senderId", UserInfo._id);
    formdata.append("senderEmail", UserInfo.email);
    Selected_client_to_send_mail?.map((element) => {
      formdata.append("receiverId", element._id);
      formdata.append("receiverEmail", element.email);
    });
    formdata.append("subject", Mail_Info_Storing_State.subject);
    formdata.append("body", Mail_Info_Storing_State.body);

    for (const Image of Email_Img_Storing_State) {
      formdata.append("EmailImg", Image);
    }

    for (const files of Email_Files_Storing_State) {
      formdata.append("EmailFiles", files);
    }
    // setIs_Sending(true)
    Mail_Sending_To_Client_API_Caller_Function(AuthToken, formdata);
    // setIs_Sending(false);
  };
  const Mail_Info_Setter = (e) => {
    setMail_Info_Storing_State({
      ...Mail_Info_Storing_State,
      [e.target.name]: e.target.value,
    });
  };
  const Show_Modal_Control_Btn = () => {
    setShowSendMailModal(true);
  };
  const Close_Modal_Control_Btn = () => {
    setShowSendMailModal(false);
    setExpand_Mail_Modal(false);
  };
  const Expand_Button = () => {
    if (Expand_Mail_Modal) {
      setExpand_Mail_Modal(false);
    } else {
      setExpand_Mail_Modal(true);
    }
  };
  const FilesUploader = (e) => {
    console.log(e.target.files);
    setEmail_Files_Storing_State(e.target.files);
  };
  const ImageUploader = (e) => {
    setEmail_Img_Storing_State(e.target.files);
  };
  const Show_Sent_Mail_Inbox = (e) => {
    setIs_Sent_Mail_Clicked_OR_Fetching_Started(true);
    setSelected_Client_Container_State([]);
  };
  const Month_Name = (num) => {
    const months = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    if (num < 10) {
      return months[num.split("")[1]];
    } else {
      return months[num];
    }
  };
  const onClickInfoStoring_Button = (Info) => {
    const isIdIncluded = Selected_Mail_Storing_State?.some(
      (item) => item._id === Info._id
    );
    if (isIdIncluded) {
      const newArray = Selected_Mail_Storing_State.filter(
        (obj) => obj._id !== Info._id
      );
      setSelected_Mail_Storing_State(newArray);
    } else {
      setSelected_Mail_Storing_State((previous) => [...previous, Info]);
    }
  };
  const ShowPreviousCustomer_Btn = () => {
    if (PageNo <= 1) {
    } else {
      setPageNo((prevPageNo) => prevPageNo - 1);
    }
  };
  const ShowMoreCustomer_Btn = () => {
    setPageNo((prevPageNo) => prevPageNo + 1);
  };
  const Delete_Selected_Mail_Button = () => {
    // console.log("delete button",Selected_Mail_Storing_State);
    Delete_Mail_API_Calling_Function(AuthToken, Selected_Mail_Storing_State);
  };
  useEffect(() => {
    setLoding(true);
    Customer_Fetching_Api(AuthToken);
    setLoding(false);
    FetchAll_Mail_OF_Log_IN_User(AuthToken, PageNo);
  }, []);
  return (
    <>
      <div className="container-main-sec">
        <div className={styles.Customer_Main_Outer_Div_Section}>
          <div className={styles.Customer_Inner_Section}>
            <div className={styles.Flex_Section_Main}>
              <div
                className={`${styles.List_OF_Users_Section} ${
                  Show_Full_View_In_Respo ? "respo-w-0" : "respo-w-100"
                } `}
              >
                <div className={styles.List_Section}>
                  <div className={styles.Header_Section}>
                    <div className={styles.Head_Txt}>
                      <p>recent client inquiry</p>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle drop-btn"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <BsThreeDotsVertical />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                          <li>
                            <a
                              className="dropdown-item py-3"
                              onClick={Show_Modal_Control_Btn}
                            >
                              <span style={{ paddingRight: "5px" }}>
                                <FaRegEdit />
                              </span>
                              Send New Mail
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item py-3"
                              onClick={Show_Sent_Mail_Inbox}
                            >
                              <span
                                style={{
                                  paddingRight: "5px",
                                  rotate: "30deg",
                                }}
                              >
                                <IoSendSharp />
                              </span>
                              Sent Mail
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className={styles.Head_SearchBar}>
                      <input
                        type="search"
                        name=""
                        placeholder="Search for a client"
                        id=""
                      />
                    </div>
                  </div>
                  <div className={styles.Customer_List_Sec}>
                    {!Loding || !Customer_Info ? (
                      <div className="w-100">
                        {Customer_Info?.data?.map((Info) => (
                          <div
                            className={`${
                              Info._id == Selected_Client_Container_State._id
                                ? "_Selected_One w-100 h-100"
                                : "w-100 h-100"
                            }`}
                            key={Info._id}
                            onClick={() => Client_Info_Adding(Info)}
                          >
                            <ClientProfile
                              CustomerInfo={Info}
                              Loading={false}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-100">
                        <ClientProfile Loading={true} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`${styles.Action_ON_User_Section} ${
                  Show_Full_View_In_Respo ? "respo-w-100" : "respo-w-0"
                }`}
              >
                {Selected_Client_Container_State.length == 0 ? (
                  ""
                ) : (
                  <div className={styles.Customer_Info_Section}>
                    <div className={styles.Inner_Section}>
                      <div className="respo_back_button">
                        <button onClick={Respo_Back_Button}>
                          <IoIosArrowRoundBack />
                        </button>
                      </div>
                      <div className={styles.Header_Section}>
                        <div className={styles.Profile}>
                          <div className={styles.Client_Profile_Main_Section}>
                            <div className={styles.Inner_Section}>
                              <div className={styles.DefaultProfile}>
                                <div className={styles.pera}>
                                  <p>
                                    {
                                      Selected_Client_Container_State?.firstname?.split(
                                        ""
                                      )[0]
                                    }
                                  </p>
                                  <p>
                                    {
                                      Selected_Client_Container_State?.lastname?.split(
                                        ""
                                      )[0]
                                    }
                                  </p>
                                </div>
                              </div>
                              <div className={styles.Customer_Info_txt}>
                                <div className={styles.FullName}>
                                  <h5>
                                    {Selected_Client_Container_State?.firstname}
                                  </h5>
                                  <h5>
                                    {Selected_Client_Container_State?.lastname}
                                  </h5>
                                </div>
                                <div className={styles.Email}>
                                  <h6>
                                    {Selected_Client_Container_State?.email}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.Time}>
                          <div className={styles.Time_Container}>
                            <p>
                              {
                                Selected_Client_Container_State.createdAt
                                  ?.split("T16:")[0]
                                  ?.split("-")[2]
                              }
                            </p>
                            <p>-</p>
                            <p>
                              {
                                Selected_Client_Container_State.createdAt
                                  ?.split("T16:")[0]
                                  ?.split("-")[1]
                              }
                            </p>
                            <p>-</p>
                            <p>
                              {
                                Selected_Client_Container_State.createdAt
                                  ?.split("T16:")[0]
                                  ?.split("-")[0]
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className={styles.Message_OF_Client_Section}>
                        <div className={styles.InterestedIN}>
                          <h4>interested In</h4>
                          <ul>
                            {Selected_Client_Container_State?.interestedin?.map(
                              (info, index) => (
                                <li key={index}>
                                  <p>{info}</p>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div className={styles.Message}>
                          <h4>Message:</h4>
                          <p>{Selected_Client_Container_State?.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {Is_Sent_Mail_Clicked_OR_Fetching_Started ? (
                  <div className={styles.sent_mail_inbox}>
                    <div className={styles.list_of_mail}>
                      {All_Sent_Mail_Storing_State.length == 0 ? (
                        <div>
                          <p className="mail-label">no such mail was sent</p>
                        </div>
                      ) : (
                        <div className={styles.inner_section}>
                          <div className="d-flex align-items-center justify-content-between rounded-top-2  px-3 py-3 bg-sidebar">
                            <ul className="list-unstyled d-flex align-items-center justify-content-end">
                              <li>
                                {!Selected_Mail_Storing_State.length > 0 ? (
                                  ""
                                ) : (
                                  <button
                                    className="btn-one"
                                    onClick={Delete_Selected_Mail_Button}
                                  >
                                    <IoTrashBin />
                                  </button>
                                )}
                              </li>
                            </ul>
                            <ul className="list-unstyled d-flex align-items-center justify-content-end">
                              <li>
                                <button
                                  className="btn-one"
                                  onClick={ShowPreviousCustomer_Btn}
                                  disabled={PageNo == 1}
                                >
                                  <IoIosArrowBack />
                                </button>
                              </li>
                              <li>
                                <button
                                  className="btn-one"
                                  onClick={ShowMoreCustomer_Btn}
                                  disabled={!Show_Customer_Pagination_Btn}
                                >
                                  <IoIosArrowForward />
                                </button>
                              </li>
                            </ul>
                          </div>
                          <table className="table">
                            <thead>
                              {/* <tr>
                              <th scope="col">
                                <p>No.</p>
                              </th>
                              <th scope="col">
                                <p>No.</p>
                              </th>

                              <th scope="col">
                                <p>status</p>
                              </th>
                              <th scope="col">
                                <p>status</p>
                              </th>
                              <th scope="col">
                                <div className={styles.Button_Flex_Section}>
                                  <button
                                    className="filled-btn"
                                    // onClick={ShowPreviousUserInfoButton}
                                    // disabled={PageNo == 1}
                                  >
                                    <span>Previous</span>
                                  </button>
                                  <button
                                    className="filled-btn"
                                    // onClick={ShowMorUserButton}
                                    // disabled={!Show_Btn}
                                  >
                                    <span>next</span>
                                  </button>
                                </div>
                              </th>
                            </tr> */}
                            </thead>
                            <tbody>
                              {All_Sent_Mail_Storing_State?.map(
                                (Info, index) => (
                                  <tr
                                    key={Info._id}
                                    className="curser_Pointer "
                                  >
                                    <th scope="row">
                                      <div className="d-flex h-100 align-items-center justify-content-center">
                                        <button
                                          className="text-white"
                                          onClick={() =>
                                            onClickInfoStoring_Button(Info)
                                          }
                                        >
                                          {Selected_Mail_Storing_State?.some(
                                            (item) => item._id === Info._id
                                          ) ? (
                                            <ImCheckboxChecked />
                                          ) : (
                                            <ImCheckboxUnchecked />
                                          )}
                                        </button>
                                      </div>
                                    </th>
                                    <td scope="col">
                                      <p className="text-lowercase fs-14">
                                        {" "}
                                        {Info?.senderId?.email}
                                      </p>
                                    </td>
                                    <td scope="col">
                                      <p className="fs-14">{Info.subject}</p>
                                    </td>
                                    <td scope="col">
                                      <p className="fs-14 text-lowercase text-overflow ">
                                        {Info.body}
                                      </p>
                                    </td>
                                    <td scope="col">
                                      <div className="d-flex align-items-center justify-content-center h-100">
                                        <p className="fs-14">
                                          {Month_Name(
                                            Info?.createdAt
                                              .split("T")[0]
                                              ?.split("-")[1]
                                          )}
                                        </p>
                                        <p className="p-0 fs-14">
                                          {Info?.createdAt
                                            .split("T")[0]
                                            ?.split("-")[2] < 10
                                            ? Info?.createdAt
                                                .split("T")[0]
                                                ?.split("-")[2]
                                                ?.split("")[1]
                                            : Info?.createdAt
                                                .split("T")[0]
                                                ?.split("-")[2]}
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                className={`${styles.send_mail_main_section_div} ${
                  ShowSendMailModal ? "show_mail_modal" : ""
                }  ${Expand_Mail_Modal ? "Expand_Modal" : ""} `}
              >
                <div
                  className={`${
                    Expand_Mail_Modal ? "rounded-3 expand-modal-inner" : "w-100"
                  }`}
                >
                  <div className={styles.send_mail_inner_section_div}>
                    <form action="" onSubmit={send_Mail_Button_Controller}>
                      <div className="w-100 position-relative">
                        <div className="w-100 position-sticky top-0 z-1">
                          <div className="d-flex w-100 bg-flex-sec">
                            <p>new mali</p>
                            <div>
                              <button type="button" onClick={Expand_Button}>
                                <CgExpand />
                              </button>
                              <button
                                type="button"
                                onClick={Close_Modal_Control_Btn}
                              >
                                <IoClose />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className={styles.inner_container}>
                          <div className="w-100">
                            <div className="w-100 position-relative">
                              <div className="d-flex gap-2 border-bottom-one align-items-center ">
                                <label
                                  htmlFor="input-to"
                                  className="mail-label"
                                >
                                  to:
                                </label>
                                <input
                                  type="text"
                                  className="mail-input"
                                  id="input-to"
                                  value={Search_Val}
                                  onChange={SearchClientsInput}
                                  ref={clientInput}
                                  name="sender"
                                />
                              </div>
                              <div className="w-100">
                                <div className="row-one p-0">
                                  {Selected_client_to_send_mail?.map((Info) => (
                                    <div
                                      className="object-fit-contain p-0"
                                      key={Info._id}
                                    >
                                      <div
                                        className={styles.SelectedUsersProfile}
                                      >
                                        <div
                                          className={
                                            styles.SelectedUsersProfileInnerSec
                                          }
                                        >
                                          <div
                                            className={styles.DefaultProfile}
                                          >
                                            <div className={styles.pera}>
                                              <p>
                                                {Info.firstname?.split("")[0]}
                                              </p>
                                            </div>
                                          </div>
                                          <div
                                            className={
                                              styles.SelectedUsersProfileName
                                            }
                                          >
                                            <p>{Info.email}</p>
                                            <button
                                              onClick={() =>
                                                RemoveMember(Info._id)
                                              }
                                            >
                                              <IoIosClose />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className={styles.search_suggestion_result}>
                                <div
                                  className={
                                    styles.search_suggestion_result_inner_section
                                  }
                                >
                                  <div className="w-100">
                                    {Client_search_result.length > 0 ? (
                                      <div className="w-100">
                                        {Client_search_result?.map((info) => {
                                          return (
                                            <div
                                              className={`${
                                                Selected_client_to_send_mail?.some(
                                                  (clientInfo) =>
                                                    clientInfo._id == info._id
                                                )
                                                  ? "d-none"
                                                  : "w-100"
                                              }`}
                                              key={info._id}
                                              onClick={() =>
                                                client_array_setter_for_client(
                                                  info
                                                )
                                              }
                                            >
                                              <ClientProfile
                                                CustomerInfo={info}
                                                Loading={false}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-100 ">
                              <div className="d-flex gap-2 border-bottom-one align-items-center">
                                <label
                                  htmlFor="input-to"
                                  className="mail-label"
                                >
                                  subject:
                                </label>
                                <input
                                  type="text"
                                  className="mail-input"
                                  id="input-to"
                                  name="subject"
                                  onChange={Mail_Info_Setter}
                                />
                              </div>
                            </div>
                            <div className="w-100">
                              <div className="d-flex">
                                <textarea
                                  name="body"
                                  cols="50"
                                  rows="15"
                                  className="mail-text-area h-100"
                                  onChange={Mail_Info_Setter}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-100 position-sticky bottom-0 bg-color pt-2 pb-2">
                          <div className={styles.send_mail_footer_bar_section}>
                            <div className={styles.insert_file_and_all_section}>
                              <ul>
                                <li>
                                  <input
                                    type="file"
                                    className="d-none"
                                    id="emailImageUploader"
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={ImageUploader}
                                    multiple
                                  />
                                  <label htmlFor="emailImageUploader">
                                    <IoImagesOutline />
                                  </label>
                                </li>
                                <li>
                                  <input
                                    type="file"
                                    className="d-none"
                                    id="emailPdfUploader"
                                    accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={FilesUploader}
                                    multiple
                                  />
                                  <label htmlFor="emailPdfUploader">
                                    <MdAttachFile />
                                  </label>
                                </li>
                                <li>
                                  <button>
                                    <IoTrashBin />
                                  </button>
                                </li>
                              </ul>
                              <ul>
                                <li>
                                  <button
                                    type="submit"
                                    className="filled-btn pt-2 pb-2"
                                  >
                                    Send
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.sending_mail_notification} ${
              Is_Sending ? "sending" : ""
            }`}
          >
            <div className={styles.sending_mail_notification_inner_sec}>
              <div className={styles.flex_sec}>
                <div className={styles.loader_Sec}>
                  <Loader />
                </div>
                <p>sending....</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
        integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
        crossorigin="anonymous"
      ></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
        integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
        crossorigin="anonymous"
      ></Script>
    </>
  );
}

export default Customer;
