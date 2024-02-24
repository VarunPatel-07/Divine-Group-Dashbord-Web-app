import React from "react";
import styles from "./styles/style.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
function ClientProfile(props) {
  const { CustomerInfo, Loading } = props;
  if (!Loading) {
    return (
      <div className={styles.Client_Profile_Main_Section}>
        <div className={styles.Inner_Section}>
          <div className={styles.DefaultProfile}>
            <div className={styles.pera}>
              <p>{CustomerInfo?.firstname?.split("")[0]}</p>
              <p>{CustomerInfo?.lastname?.split("")[0]}</p>
            </div>
          </div>
          <div className={styles.Customer_Info_txt}>
            <div className={styles.FullName}>
              <h5>{CustomerInfo?.firstname}</h5>
              <h5>{CustomerInfo?.lastname}</h5>
            </div>
            <div className={styles.Email}>
              <h6>{CustomerInfo?.email}</h6>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <SkeletonTheme baseColor="#64548c" highlightColor="#1f1830" width="100%">
        <div className={styles.Client_Profile_Main_Section}>
          <div className={styles.Inner_Section}>
            <div className={styles.DefaultProfile}>
              <Skeleton width="100%" height="100%" />
            </div>
            <div className={styles.Customer_Info_txt}>
              <div className={styles.FullName}>
                <h5 className="w-100">
                  <Skeleton width="100%" />
                </h5>
              </div>
              <div className={styles.Email}>
                <h6>
                  <Skeleton width="100%" />
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Client_Profile_Main_Section}>
          <div className={styles.Inner_Section}>
            <div className={styles.DefaultProfile}>
              <Skeleton width="100%" height="100%" />
            </div>
            <div className={styles.Customer_Info_txt}>
              <div className={styles.FullName}>
                <h5 className="w-100">
                  <Skeleton width="100%" />
                </h5>
              </div>
              <div className={styles.Email}>
                <h6>
                  <Skeleton width="100%" />
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Client_Profile_Main_Section}>
          <div className={styles.Inner_Section}>
            <div className={styles.DefaultProfile}>
              <Skeleton width="100%" height="100%" />
            </div>
            <div className={styles.Customer_Info_txt}>
              <div className={styles.FullName}>
                <h5 className="w-100">
                  <Skeleton width="100%" />
                </h5>
              </div>
              <div className={styles.Email}>
                <h6>
                  <Skeleton width="100%" />
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Client_Profile_Main_Section}>
          <div className={styles.Inner_Section}>
            <div className={styles.DefaultProfile}>
              <Skeleton width="100%" height="100%" />
            </div>
            <div className={styles.Customer_Info_txt}>
              <div className={styles.FullName}>
                <h5 className="w-100">
                  <Skeleton width="100%" />
                </h5>
              </div>
              <div className={styles.Email}>
                <h6>
                  <Skeleton width="100%" />
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Client_Profile_Main_Section}>
          <div className={styles.Inner_Section}>
            <div className={styles.DefaultProfile}>
              <Skeleton width="100%" height="100%" />
            </div>
            <div className={styles.Customer_Info_txt}>
              <div className={styles.FullName}>
                <h5 className="w-100">
                  <Skeleton width="100%" />
                </h5>
              </div>
              <div className={styles.Email}>
                <h6>
                  <Skeleton width="100%" />
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Client_Profile_Main_Section}>
          <div className={styles.Inner_Section}>
            <div className={styles.DefaultProfile}>
              <Skeleton width="100%" height="100%" />
            </div>
            <div className={styles.Customer_Info_txt}>
              <div className={styles.FullName}>
                <h5 className="w-100">
                  <Skeleton width="100%" />
                </h5>
              </div>
              <div className={styles.Email}>
                <h6>
                  <Skeleton width="100%" />
                </h6>
              </div>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }
}

export default ClientProfile;
