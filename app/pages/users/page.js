"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/style.module.css";
import noteContext from "@/context/noteContext";
import Script from "next/script";
import { BsThreeDotsVertical } from "react-icons/bs";
import Loader from "@/utils/Loader";

function Users() {
  const context = useContext(noteContext);
  const [Loding, setLoding] = useState(true);
  const [PageNo, setPageNo] = useState(1);
  const {
    AuthToken,
    UserInfo,
    List_OF_User_Fetching_API_Caller_Function,
    ListOFUsers_Container_State,
    setListOFUsers_Container_State,
    Show_Btn,
    setShow_Btn,
  } = context;
  const ShowMorUserButton = () => {
    setPageNo((prevPageNo) => prevPageNo + 1);
  };
  const ShowPreviousUserInfoButton = () => {
    if (PageNo <= 1) {
    } else {
      setPageNo((prevPageNo) => prevPageNo - 1);
    }
  };
  useEffect(() => {
    setLoding(true);
    List_OF_User_Fetching_API_Caller_Function(AuthToken, PageNo);
    setLoding(false);
  }, [PageNo]);
  return (
    <>
      <div className="container-main-sec">
        <div className={styles.Users_Page_Main_Section}>
          <div className={styles.Users_Page_Inner_Section}>
            {Loding || !ListOFUsers_Container_State ? (
              <Loader />
            ) : (
              <div className={styles.List_Of_Users}>
                <div className={styles.Header_Main_Data_Section}>
                  <table className="table">
                    <thead>
                      <tr className="text-capitalize">
                        <th scope="col">
                          <p>No.</p>
                        </th>
                        <th scope="col">
                          <p>username</p>
                        </th>
                        <th scope="col">
                          <p>full name</p>
                        </th>
                        <th scope="col">
                          <p>email</p>
                        </th>
                        <th scope="col">
                          <p>role</p>
                        </th>
                        <th scope="col">
                          <p>status</p>
                        </th>
                        <th scope="row">
                          <p>action</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ListOFUsers_Container_State?.map((Info, index) => (
                        <tr key={Info._id}>
                          <th scope="row">
                            <p>{index + 1}</p>
                          </th>
                          <td>
                            <p>{Info.username}</p>
                          </td>
                          <td>
                            <p>{Info.name}</p>
                          </td>
                          <td>
                            <p style={{ textTransform: "lowercase" }}>
                              {Info.email}
                            </p>
                          </td>
                          <td>
                            <p> {Info.role}</p>
                          </td>
                          <td>
                            <p>active</p>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <BsThreeDotsVertical />
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={styles.Button_Flex_Section}>
                  <button
                    className="filled-btn"
                    onClick={ShowPreviousUserInfoButton}
                    disabled={PageNo == 1}
                  >
                    <span>Previous</span>
                  </button>
                  <button
                    className="filled-btn"
                    onClick={ShowMorUserButton}
                    disabled={!Show_Btn}
                  >
                    <span>next</span>
                  </button>
                </div>
              </div>
            )}
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

export default Users;
