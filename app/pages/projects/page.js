"use client";
import React, { useState, useRef } from "react";
import styles from "../styles/style.module.css";
import ProjectsSkull from "@/components/ProjectsSkull";
import AddProjectModal from "@/utils/AddProjectModal";

function Projects() {
  const [FetchAllProjects, setFetchAllProjects] = useState(true);
  const [ProjectContent, setProjectContent] = useState("");
  const [AddModalState, setAddModalState] = useState(false);
  const AllProjects = () => {
    setFetchAllProjects(true);
  };
  const YourProjects = () => {
    setFetchAllProjects(false);
  };
  const CloseModalBtn = () => {
    setAddModalState(false);
  };
  const OpenModalButton = () => {
    setAddModalState(true);
  };
  console.log(ProjectContent);
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
                <button className={`filled-btn ${ProjectContent==""?'d-none':''}`}>
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
              <ProjectsSkull
                ProjectContent={ProjectContent}
                FetchAllProjects={FetchAllProjects}
                OpenModalButton={OpenModalButton}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Projects;
