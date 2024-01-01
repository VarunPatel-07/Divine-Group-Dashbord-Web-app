import React from "react";
import styles from "./styles/style.module.css";
import { BsFillBuildingsFill } from "react-icons/bs";
import Image from "next/image";
import DefaultImage from "../images/ec0bd0c9cb0ff5dcb7310bc33381a95c.jpg";
import Loader from "@/utils/Loader";
function ProjectsSkull(props) {
  const { OpenModalButton, Projects , IsLoading} = props;
  
    if (Projects !== "") {
      return (
        <>
          <div className="row">
            {Projects.map((InforMation) => {
              return (
                <div className="col-md-6" key={InforMation._id}>
                  <div className={styles.ProjectsSkullCardOuterMainSection}>
                    <div className={styles.ProjectContentSkullInnerSectio}>
                      <div className={styles.ProjectsSkullImageSection}>
                        <picture>
                          <img
                            src={InforMation.TitleImage}
                            alt="Landscape picture"
                            width={800}
                            height={500}
                          />
                        </picture>
                      </div>
                      <div className={styles.ProjectContentTextSection}>
                        <div className={styles.FlexSection}>
                          <h2>{InforMation.projectName}</h2>
                          <h6>{InforMation.metadata}</h6>
                          <p>{InforMation.address} </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
