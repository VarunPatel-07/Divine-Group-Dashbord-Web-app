"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import styles from "../styles/style.module.css";
import ProjectsSkull from "@/components/ProjectsSkull";
import AddProjectModal from "@/utils/AddProjectModal";
import noteContext from "@/context/noteContext";
import Loader from "@/utils/Loader";
import { useRouter } from "next/navigation";
import SkeletonProjectLoader from "@/components/SkeletonProjectLoader";

function Projects() {
  const { push } = useRouter();
  const context = useContext(noteContext);
  const {
    UsersProjects,
    PublicProjects,
    FetchAllPublicProjects,
    FetchAllYourProjects,
    AddModalState,
    setAddModalState,
    Info_Container_To_Update_The_Project_Info,
    setInfo_Container_To_Update_The_Project_Info,
    AuthToken,
    IsLogIn,
  } = context;
  const [IsLoading, setIsLoading] = useState(true);
  const [FetchAllProjects, setFetchAllProjects] = useState(true);
  const [UsersProjectContent, setUsersProjectContent] = useState();

  const AllProjects = () => {
    setFetchAllProjects(true);
    setIsLoading(false);
  };
  const YourProjects = () => {
    setFetchAllProjects(false);
    setUsersProjectContent(UsersProjects);
    setIsLoading(false);
  };
  const CloseModalBtn = () => {
    setAddModalState(false);
  };
  const OpenModalButton = () => {
    setAddModalState(true);
  };
  useEffect(() => {
    if (!IsLogIn) {
      setIsLoading(true);
      push("/pages/auth/login");
    } else {
      FetchAllPublicProjects(AuthToken);
      FetchAllYourProjects(AuthToken);
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (!FetchAllProjects) {
      setUsersProjectContent(UsersProjects);
    }
  }, [UsersProjects]);

  return (
    <>
      <AddProjectModal
        AddModalState={AddModalState}
        CloseModalBtn={CloseModalBtn}
      />
      <div className="container-main-sec">
        <div className={styles.mainProjectsSection}>
          <div className={styles.InnerSection}>
            <div className={styles.HeaderSection}>
              <div className={styles.text}>
                <h2>projects</h2>
                <button
                  className={`filled-btn ${PublicProjects == "" ? "w-0" : ""}`}
                  onClick={OpenModalButton}
                >
                  add projects
                </button>
              </div>
              <div className={styles.NavigationSec}>
                <ul>
                  <li className={FetchAllProjects ? "active-li-btn" : ""}>
                    <button onClick={AllProjects}>All projects</button>
                  </li>
                  <li className={!FetchAllProjects ? "active-li-btn" : ""}>
                    <button onClick={YourProjects}>your projects</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.ProjectsAddingMainSec}>
              {IsLoading ? (
                <SkeletonProjectLoader />
              ) : (
                <ProjectsSkull
                  OpenModalButton={OpenModalButton}
                  Projects={
                    FetchAllProjects ? PublicProjects : UsersProjectContent
                  }
                  FetchAllProjects={FetchAllProjects}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Projects;
