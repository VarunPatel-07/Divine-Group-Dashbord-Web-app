"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import styles from "../styles/style.module.css";
import ProjectsSkull from "@/components/ProjectsSkull";
import AddProjectModal from "@/utils/AddProjectModal";
import noteContext from "@/context/noteContext";
import Loader from "@/utils/Loader";

function Projects() {
  const context = useContext(noteContext);
  const {
    Projects,
    PublicProjects,
    FetchAllPublicProjects,
    FetchAllYourProjects,
    AuthToken,
  } = context;
  const [IsLoading, setIsLoading] = useState(true);
  const [FetchAllProjects, setFetchAllProjects] = useState(true);
  const [ProjectContent, setProjectContent] = useState();
  const [AddModalState, setAddModalState] = useState(false);
  const AllProjects = () => {
    setFetchAllProjects(true);
    setIsLoading(false);
  };
  const YourProjects = () => {
    setFetchAllProjects(false);
    setProjectContent(Projects);
    setIsLoading(false);
  };
  const CloseModalBtn = () => {
    setAddModalState(false);
  };
  const OpenModalButton = () => {
    setAddModalState(true);
  };
  useEffect(() => {
    FetchAllPublicProjects(AuthToken);
    FetchAllYourProjects(AuthToken);
    setIsLoading(false);
  }, []);

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
                <Loader />
              ) : (
                <ProjectsSkull
                  OpenModalButton={OpenModalButton}
                  Projects={FetchAllProjects?PublicProjects:ProjectContent}
                  IsLoading={IsLoading}
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
