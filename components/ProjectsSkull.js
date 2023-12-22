import React from "react";
import styles from "./styles/style.module.css";
import { BsFillBuildingsFill } from "react-icons/bs";
import Image from "next/image";
import DefaultImage from "../images/ec0bd0c9cb0ff5dcb7310bc33381a95c.jpg";
function ProjectsSkull(props) {
  console.log(props);
  const { FetchAllProjects, ProjectContent, OpenModalButton } = props;
  console.log(ProjectContent == "");
  if (ProjectContent == "") {
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
  } else {
    return (
      <>
        <div className="row">
          <div className="col-md-6">
            <div className={styles.ProjectsSkullCardOuterMainSection}>
              <div className={styles.ProjectContentSkullInnerSectio}>
                <div className={styles.ProjectsSkullImageSection}>
                  <Image
                    src={DefaultImage}
                    alt="projects title image"
                    height="100%"
                    width="100%"
                  ></Image>
                </div>
                <div className={styles.ProjectContentTextSection}>
                  <div className={styles.FlexSection}>
                    <h2>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Ratione, unde.
                    </h2>
                    <h6>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h6>
                    <p>Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.ProjectsSkullCardOuterMainSection}>
              <div className={styles.ProjectContentSkullInnerSectio}>
                <div className={styles.ProjectsSkullImageSection}>
                  <Image
                    src={DefaultImage}
                    alt="projects title image"
                    height="100%"
                    width="100%"
                  ></Image>
                </div>
                <div className={styles.ProjectContentTextSection}>
                  <div className={styles.FlexSection}>
                    <h2>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Ratione, unde.
                    </h2>
                    <h6>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h6>
                    <p>Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.ProjectsSkullCardOuterMainSection}>
              <div className={styles.ProjectContentSkullInnerSectio}>
                <div className={styles.ProjectsSkullImageSection}>
                  <Image
                    src={DefaultImage}
                    alt="projects title image"
                    height="100%"
                    width="100%"
                  ></Image>
                </div>
                <div className={styles.ProjectContentTextSection}>
                  <div className={styles.FlexSection}>
                    <h2>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Ratione, unde.
                    </h2>
                    <h6>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h6>
                    <p>Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProjectsSkull;
