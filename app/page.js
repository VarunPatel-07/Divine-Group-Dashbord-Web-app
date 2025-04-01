"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import noteContext from "@/context/noteContext";
import styles from "./pages/styles/style.module.css";
import { FiWind } from "react-icons/fi";
import { TiWeatherCloudy } from "react-icons/ti";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ClientProfile from "@/components/ClientProfile";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const initialState = [];
  const { push } = useRouter();
  const [Loading, setLoading] = useState(true);
  const context = useContext(noteContext);
  const [Time_State, setTime_State] = useState({
    Hours: [],
    Minute: [],
  });
  const [PageState, setPageState] = useState({
    Page_NO: 1,
  });
  const {
    IsLogIn,
    AuthToken,
    FetchUserDetail,
    Customer_Info,
    setCustomer_Info,
    Weather_API_Caller_Function,
    Weather_Info_State,
    setWeather_Info_State,
    Customer_Fetching_Api,
    FetchAllPublicProjects,
    PublicProjects,
    Fetch_More_Customer_API_Caller_Fun,
  } = context;
  const GET_Local_Time = () => {
    setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minute = date.getMinutes();
      setTime_State({
        Hours: hours,
        Minute: minute,
      });
    }, 1000);
  };
  const FetchMoreCustomer = () => {
    const nextPage = PageState.Page_NO + 1;
    setPageState({ Page_NO: nextPage });
    console.log("hellll");
    Fetch_More_Customer_API_Caller_Fun(AuthToken, PageState.Page_NO);
  };
  useEffect(() => {
    if (!IsLogIn) {
      setLoading(true);
      push("/pages/auth/login");
    } else {
      setLoading(false);
      FetchUserDetail(AuthToken);
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log("Latitude: " + position.coords.latitude);
          console.log("Longitude: " + position.coords.longitude);
          Weather_API_Caller_Function(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        null,
        null
      );
      GET_Local_Time();
      Customer_Fetching_Api(AuthToken, PageState.Page_NO);
      FetchAllPublicProjects(AuthToken);
    }
  }, []);
  if (Loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          fontSize: "100px",
          color: "white",
        }}
      >
        Loading.....
      </div>
    );
  } else {
    return (
      <SkeletonTheme baseColor="#261e3c" highlightColor="#64548c" width="100%">
        <div className="container-main-sec">
          <div className={styles.DashboardPage_Main_Section}>
            <div className={styles.Inner_Flex_Section}>
              <div className={styles.SeventyFive_Percent_Part}>
                <div className={styles.Horizontal_Flex_Section}>
                  <div className={styles.Part_One}>
                    <div className={styles.Flex_Part}>
                      <div className={styles.Card_One}>
                        <div className={styles.Card}>
                          <div className={styles.Card_Inner_Section}>
                            <div className={styles.Number}>
                              <h3>{PublicProjects.length}+</h3>
                            </div>
                            <div className={styles.Title}>
                              <h4>Project delivered</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.Card_One}>
                        <div className={styles.Card}>
                          <div className={styles.Card_Inner_Section}>
                            <div className={styles.Number}>
                              <h3>{PublicProjects?.length*21}+</h3>
                            </div>
                            <div className={styles.Title}>
                              <h4>happy family</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.Card_One}>
                        <div className={styles.Card}>
                          <div className={styles.Card_Inner_Section}>
                            <div className={styles.Number}>
                              <h3 style={{ fontSize: "35px" }}>200+ sq ft</h3>
                            </div>
                            <div className={styles.Title}>
                              <h4>area constructed</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.Part_Two}>
                    <div className={styles.Sticky_Header_Title}>
                      <h5>recent projects</h5>
                    </div>
                    <div className="col-md-12 mx-auto">
                      <div className="row p-0 m-0">
                        {PublicProjects?.map((InforMation) => (
                          <div className="col-md-6" key={InforMation._id}>
                            <Link
                              href={`pages/projects/${InforMation.projectName}?id=${InforMation._id}`}
                            >
                              <div
                                className={
                                  styles.ProjectsSkullCardOuterMainSection
                                }
                              >
                                <div
                                  className={
                                    styles.ProjectContentSkullInnerSection
                                  }
                                >
                                  <div
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
                                  </div>
                                  <div
                                    className={styles.ProjectContentTextSection}
                                  >
                                    <div className={styles.FlexSection}>
                                      <h2>{InforMation.projectName}</h2>

                                      <p>{InforMation.metadata} </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.TwentyFive_Percent_Part}>
                <div className={styles.Flex_section_Main}>
                  <div className="container-fluid p-0 Card-transparent">
                    <div className="w-100 p-0">
                      {Weather_Info_State.name ? (
                        <div className="w-100">
                          <div
                            className="card p-4"
                            style={{ borderRadius: "15px" }}
                          >
                            <div className="d-flex">
                              <h6 className="flex-grow-1">
                                {Weather_Info_State?.name} /
                                <span
                                  style={{
                                    visibility: "hidden",
                                    padding: "2px",
                                  }}
                                ></span>
                                {Weather_Info_State?.sys?.country}
                              </h6>

                              <h6>
                                {Time_State.Hours}:
                                {Time_State.Minute < 10 ? "0" : ""}
                                {Time_State.Minute}
                              </h6>
                            </div>

                            <div className="d-flex align-items-center justify-content-between  mt-4 mb-3">
                              <div className="temp-details d-flex align-items-start flex-column justify-content-start gap-2 ">
                                <p className="d-flex align-items-center gap-2">
                                  <span>
                                    <FiWind />
                                  </span>

                                  <span>
                                    {" "}
                                    {Math.round(
                                      (Weather_Info_State?.wind?.speed *
                                        0.001) /
                                        0.000277778
                                    )}
                                    km/h{" "}
                                  </span>
                                </p>

                                <p className="d-flex align-items-center gap-2">
                                  <span>
                                    <TiWeatherCloudy />
                                  </span>
                                  <span>
                                    {" "}
                                    {Weather_Info_State?.weather?.map(
                                      (info) => {
                                        return info.main;
                                      }
                                    )}{" "}
                                  </span>
                                </p>
                              </div>

                              <h1
                                className="mb-0 font-weight-bold "
                                id="heading"
                              >
                                {" "}
                                {Weather_Info_State?.main?.temp}&deg; C{" "}
                              </h1>
                            </div>

                            <div className="d-flex"></div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="w-100 overflow-hidden"
                          style={{ minHeight: "163px", borderRadius: "15px" }}
                        >
                          <Skeleton
                            height="100%"
                            width="100%"
                            className="Span_Class"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.New_Clients_Main_Section}>
                    <div
                      className={styles.Sticky_Header_Section}
                      onClick={FetchMoreCustomer}
                    >
                      <h5>recent customer inquire {Customer_Info.total}</h5>
                    </div>
                    <div className={styles.Recent_Client_Inquire_Map_Section}>
                      {Customer_Info?.data.length != 0 ? (
                        <div className="w-100">
                          {Customer_Info?.data?.map((CustomerInfo) => (
                            <div className="w-100" key={CustomerInfo._id}>
                              <ClientProfile
                                CustomerInfo={CustomerInfo}
                                Loading={false}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="w-100">
                          <ClientProfile Loading={true} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }
}

export default Home;
