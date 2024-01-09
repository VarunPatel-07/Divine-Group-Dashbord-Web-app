import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./styles/style.module.css";
function SkeletonProjectLoader() {
  return (
    <div className="w-100">
      <SkeletonTheme baseColor="#1a142a" highlightColor="#1f1830" width="100%">
        <div className="row">
          <div className="col-md-4">
            <div className={styles.ProjectsSkullCardOuterMainSection}>
              <div className={styles.ProjectContentSkullInnerSection}>
                <div className={styles.ProjectsSkullImageSection}>
                  <picture>
                    <Skeleton width="100%" height="100%" />
                  </picture>
                </div>
                <div className={styles.ProjectContentTextSection}>
                  <div className={styles.FlexSection}>
                    <h2>
                      <Skeleton width="100%" />
                    </h2>
                   
                    <p>
                      <Skeleton width="100%" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.ProjectsSkullCardOuterMainSection}>
              <div className={styles.ProjectContentSkullInnerSection}>
                <div className={styles.ProjectsSkullImageSection} style={{ minWidth: "250px", maxHeight: "250px" }}>
                  <picture>
                    <Skeleton
                      width="100%"
                      height="100%"
                      
                    />
                  </picture>
                </div>
                <div className={styles.ProjectContentTextSection}>
                  <div className={styles.FlexSection}>
                    <h2>
                      <Skeleton width="100%" />
                    </h2>
                    
                    <p>
                      <Skeleton width="100%" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.ProjectsSkullCardOuterMainSection}>
              <div className={styles.ProjectContentSkullInnerSection}>
                <div className={styles.ProjectsSkullImageSection}>
                  <picture>
                    <Skeleton width="100%" height="100%" />
                  </picture>
                </div>
                <div className={styles.ProjectContentTextSection}>
                  <div className={styles.FlexSection}>
                    <h2>
                      <Skeleton width="100%" />
                    </h2>
                    <p>
                      <Skeleton width="100%" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.ProjectsSkullCardOuterMainSection}>
              <div className={styles.ProjectContentSkullInnerSection}>
                <div className={styles.ProjectsSkullImageSection} style={{ minWidth: "250px", maxHeight: "250px" }}>
                  <picture>
                    <Skeleton
                      width="100%"
                      height="100%"
                      
                    />
                  </picture>
                </div>
                <div className={styles.ProjectContentTextSection}>
                  <div className={styles.FlexSection}>
                    <h2>
                      <Skeleton width="100%" />
                    </h2>
                  
                    <p>
                      <Skeleton width="100%" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.ProjectsSkullCardOuterMainSection}>
              <div className={styles.ProjectContentSkullInnerSection}>
                <div className={styles.ProjectsSkullImageSection}>
                  <picture>
                    <Skeleton width="100%" height="100%" />
                  </picture>
                </div>
                <div className={styles.ProjectContentTextSection}>
                  <div className={styles.FlexSection}>
                    <h2>
                      <Skeleton width="100%" />
                    </h2>
                   
                    <p>
                      <Skeleton width="100%" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.ProjectsSkullCardOuterMainSection}>
              <div className={styles.ProjectContentSkullInnerSection}>
                <div className={styles.ProjectsSkullImageSection} style={{ minWidth: "250px", maxHeight: "250px" }}>
                  <picture>
                    <Skeleton
                      width="100%"
                      height="100%"
                      
                    />
                  </picture>
                </div>
                <div className={styles.ProjectContentTextSection}>
                  <div className={styles.FlexSection}>
                    <h2>
                      <Skeleton width="100%" />
                    </h2>
                   
                    <p>
                      <Skeleton width="100%" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </SkeletonTheme>
    </div>
  );
}

export default SkeletonProjectLoader;
