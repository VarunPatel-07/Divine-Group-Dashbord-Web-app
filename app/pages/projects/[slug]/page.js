"use client";
import React, { useEffect, useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../../styles/style.module.css";
import noteContext from "@/context/noteContext";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
function DetailedProject({ params }) {
  const context = useContext(noteContext);

  const {
    FetchSpecificProject,
    AuthToken,
    SpecificProjectDetails,
    GlobalLoadingState,
  } = context;
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const { TitleImage, GalleryImage, projectName, description } =
    SpecificProjectDetails;

  useEffect(() => {
    FetchSpecificProject(AuthToken, search);
  }, []);
  if (GlobalLoadingState.Single_Project_Loding) {
    return (
      <>
        <div style={{ fontSize: "90px" , color:'wheat' }}>loding .........</div>
      </>
    );
  } else {
    return (
      <>
        <div className="container-main-sec">
          <div className={styles.FullPageProject}>
            <div className={styles.FullPageProjectsInnerSection}>
              <div className={styles.MainNavbarSection}></div>
              <div className={styles.InforMationSection}>
                <div className={styles.Project_Heading}>
                  <h1>{projectName}</h1>
                </div>
                <div className={styles.ThumbnailImage}>
                  <picture>
                    <source src={TitleImage} />
                    <img
                      src={TitleImage}
                      alt="image/thumbnail"
                      width="100%"
                      height="100%"
                    />
                  </picture>
                </div>
                <div className={styles.ProjectInformation}>
                  <div className={styles.Description}>
                    <h2>Description</h2>
                    <p>{description}</p>
                  </div>
                  <div className={styles.Project_Facilities}>
                    <h2>Amenities</h2>
                    <div className={styles.Amenities_flex_section}>
                      <div className="row" style={{ padding: "0" }}>
                        <div
                          className="col-md-3"
                          style={{ padding: "12px 12px" }}
                        >
                          <div className={styles.Amenities_card}>Amenities</div>
                        </div>
                        <div
                          className="col-md-3"
                          style={{ padding: "12px 12px" }}
                        >
                          <div className={styles.Amenities_card}>Amenities</div>
                        </div>
                        <div
                          className="col-md-3"
                          style={{ padding: "12px 12px" }}
                        >
                          <div className={styles.Amenities_card}>Amenities</div>
                        </div>
                        <div
                          className="col-md-3"
                          style={{ padding: "12px 12px" }}
                        >
                          <div className={styles.Amenities_card}>Amenities</div>
                        </div>
                        <div
                          className="col-md-3"
                          style={{ padding: "12px 12px" }}
                        >
                          <div className={styles.Amenities_card}>Amenities</div>
                        </div>
                        <div
                          className="col-md-3"
                          style={{ padding: "12px 12px" }}
                        >
                          <div className={styles.Amenities_card}>Amenities</div>
                        </div>
                        <div
                          className="col-md-3"
                          style={{ padding: "12px 12px" }}
                        >
                          <div className={styles.Amenities_card}>Amenities</div>
                        </div>
                        <div
                          className="col-md-3"
                          style={{ padding: "12px 12px" }}
                        >
                          <div className={styles.Amenities_card}>Amenities</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.PropertyImages}>
                  <div className={styles.Title}>
                    <h2>Project Gallery</h2>
                  </div>
                  <AliceCarousel disableDotsControls="true">
                    {GalleryImage?.map((img) => (
                      <div className={styles.PropertyImagesMapDiv} key={img}>
                        <picture>
                          <source src={img} />
                          <img
                            src={img}
                            alt="image/thumbnail"
                            width="100%"
                            height="100%"
                            loading="lazy"
                          />
                        </picture>
                      </div>
                    ))}
                  </AliceCarousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DetailedProject;
