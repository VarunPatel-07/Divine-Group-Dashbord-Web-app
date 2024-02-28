"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/style.module.css";
import noteContext from "@/context/noteContext";
import Script from "next/script";
import { BsThreeDotsVertical } from "react-icons/bs";
import Loader from "@/utils/Loader";
import ClientProfile from "@/components/ClientProfile";
import { MdMoveToInbox } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";

function Customer() {
  const initialState = [];
  const context = useContext(noteContext);
  const [Loding, setLoding] = useState(true);
  const [PageNo, setPageNo] = useState(1);
  const [Selected_Client_Container_State, setSelected_Client_Container_State] =
    useState(initialState);
  const {
    AuthToken,
    UserInfo,
    Customer_Info,
    setCustomer_Info,
    Customer_Fetching_Api,
  } = context;
  const Client_Info_Adding = (Info) => {
    console.log(Info);
    setSelected_Client_Container_State(Info);
  };
  useEffect(() => {
    setLoding(true);
    Customer_Fetching_Api(AuthToken);
    setLoding(false);
  }, []);
  return (
    <>
      <div className="container-main-sec">
        <div className={styles.Customer_Main_Outer_Div_Section}>
          <div className={styles.Customer_Inner_Section}>
            <div className={styles.Flex_Section_Main}>
              <div className={styles.List_OF_Users_Section}>
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
                            <a className="dropdown-item py-3" href="#">
                              <span style={{ paddingRight: "5px" }}>
                                <MdMoveToInbox />
                              </span>
                              Send New Mail
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item py-3" href="#">
                              <span
                                style={{ paddingRight: "5px", rotate: "30deg" }}
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
                        {Customer_Info?.map((Info) => (
                          <div
                            className={`${
                              Info._id == Selected_Client_Container_State._id
                                ? "_Selected_One w-100 h-100"
                                : "w-100 h-100"
                            }`}
                            key={Info._Id}
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
              <div className={styles.Action_ON_User_Section}>
                {Selected_Client_Container_State.length == 0 ? (
                  ""
                ) : (
                  <div className={styles.Customer_Info_Section}>
                    <div className={styles.Inner_Section}>
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
