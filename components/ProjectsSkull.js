"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import styles from "./styles/style.module.css";
import noteContext from "@/context/noteContext";
import { BsFillBuildingsFill, BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import DefaultImage from "../images/ec0bd0c9cb0ff5dcb7310bc33381a95c.jpg";
import Loader from "@/utils/Loader";
import Link from "next/link";
import Script from "next/script";
function ProjectsSkull(props) {
  const { OpenModalButton, Projects, FetchAllProjects } = props;
  const context = useContext(noteContext);
  const {
    AuthToken,
    AddModalState,
    setAddModalState,
    Info_Container_To_Update_The_Project_Info,
    setInfo_Container_To_Update_The_Project_Info,
    Delete_Projects,
  } = context;
  const Show_Update_Project_Modal = (Projects_Info) => {
    console.log(Projects_Info != undefined);
    setInfo_Container_To_Update_The_Project_Info(Projects_Info);
    setAddModalState(true);
  };
  const Delete_Project_Button = (_id) => {
    
    const confirm_delete_Project = confirm("are you sure you want to delete this project?");
    if (confirm_delete_Project) {
      Delete_Projects(AuthToken, _id);
    }
  };
  if (Projects.length != 0) {
    return (
      <>
        <div className="row">
          {Projects.map((InforMation) => {
            return (
              <div className="col-md-4 pt-3 pb-3" key={InforMation._id}>
                <div className={styles.ProjectsSkullCardOuterMainSection}>
                  <div className={styles.ProjectContentSkullInnerSection}>
                    <Link
                      href={`projects/${InforMation.projectName}?id=${InforMation._id}`}
                      className={styles.ProjectsSkullImageSection}
                    >
                      <picture>
                        <img
                          src={InforMation.TitleImage}
                          alt="Landscape picture"
                          width={800}
                          height={500}
                          loading="lazy"
                        />
                      </picture>
                    </Link>
                    <div className={styles.ProjectContentTextSection}>
                      <div className={styles.FlexSection}>
                        <h2>{InforMation.projectName}</h2>
                        {/* <h6>{InforMation.metadata}</h6> */}
                        <p>{InforMation.address} </p>
                      </div>
                      {FetchAllProjects ? (
                        ""
                      ) : (
                        <div className="dropdown min-w-10">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <BsThreeDotsVertical />
                          </button>
                          <ul className="dropdown-menu dropdown-menu-dark">
                            <li>
                              <button
                                className="dropdown-item btn-drop-down p-2  text-capitalize"
                                onClick={() =>
                                  Show_Update_Project_Modal(InforMation)
                                }
                                href="#"
                              >
                                update project
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item p-2 btn-drop-down text-capitalize"
                                href="#"
                                onClick={() =>
                                  Delete_Project_Button(InforMation._id)
                                }
                              >
                                delete project
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    {FetchAllProjects ? (
                      ""
                    ) : (
                      <span className={styles.CardStatusIcon}>
                        {InforMation.private ? "private" : "public"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
  } else {
    return (
      <>
        <div className={styles.ProjectsSkullMainDiv}>
          <div className={styles.ProjectsInnerDiv}>
            <div className={styles.HeaderImage}>
              <BsFillBuildingsFill />
            </div>
            <div className={styles.ContextText}>
              <h3>No projects added yet</h3>
              <p>add projects so that your user can see that </p>
              <button className="button-main-class" onClick={OpenModalButton}>
                Add Projects
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProjectsSkull;
