"use client";
import React, { useState, useContext, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./styles/style.module.css";
import { BsImages } from "react-icons/bs";
import noteContext from "@/context/noteContext";
import Form from "react-bootstrap/Form";
function AddProjectModal(props) {
  const context = useContext(noteContext);
  const {
    content,
    ControlAddProjects,
    ControlUpdateProjects,
    AuthToken,
    Info_Container_To_Update_The_Project_Info,
    setInfo_Container_To_Update_The_Project_Info,
  } = context;
  const { AddModalState, CloseModalBtn } = props;
  const [Private, setPrivate] = useState(false);
  const [ProjectInfo, setProjectInfo] = useState({
    ProjectName: "",
    MetaData: "",
    Description: "",
    Address: "",
    Pincode: "",
    District: "",
  });
  const [TitleImage, setTitleImage] = useState();
  const [GalleryImage, setGalleryImage] = useState();
  const ProjectSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("ProjectName", ProjectInfo.ProjectName);
    formdata.append("MetaData", ProjectInfo.MetaData);
    formdata.append("Description", ProjectInfo.Description);
    formdata.append("Address", ProjectInfo.Address);
    formdata.append("Pincode", ProjectInfo.Pincode);
    formdata.append("District", ProjectInfo.District);
    formdata.append("TitleImage", TitleImage);
    formdata.append("private", Private);
    for (const Image of GalleryImage) {
      formdata.append("GalleryImage", Image);
    }
    ControlAddProjects(formdata, AuthToken);
    CloseModalBtn();
    setProjectInfo([])
  };
  const OnChangeTxt = (e) => {
    setProjectInfo({ ...ProjectInfo, [e.target.name]: e.target.value });
  };
  const OnChangeImg = (e) => {
    setTitleImage(e.target.files[0]);
  };
  const OnChangeImgMultiple = (e) => {
    setGalleryImage(e.target.files);
  };
  const Toggle = () => {
    if (Private) {
      setPrivate(false);
    } else {
      setPrivate(true);
    }
  };
  const Sumbit_Updated_Project = (e) => {
    try {
      console.log(ProjectInfo);
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("ProjectName", ProjectInfo.ProjectName);
      formdata.append("MetaData", ProjectInfo.MetaData);
      formdata.append("Description", ProjectInfo.Description);
      formdata.append("Address", ProjectInfo.Address);
      formdata.append("Pincode", ProjectInfo.Pincode);
      formdata.append("District", ProjectInfo.District);
      console.log("ok 2");
      formdata.append("private", Private);
      if (TitleImage != undefined) {
        formdata.append("TitleImage", TitleImage);
      }
      if (GalleryImage != undefined) {
        for (const Image of GalleryImage) {
          formdata.append("GalleryImage", Image);
        }
      }
      console.log("ok 3");
      ControlUpdateProjects(
        formdata,
        AuthToken,
        Info_Container_To_Update_The_Project_Info._id
      );
      console.log("ok 4");
      // ControlAddProjects(formdata, AuthToken);
      CloseModalBtn();
      setProjectInfo([])
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${styles.AddProjectModalOuterDivMainSection} ${
        AddModalState ? "visibalModal" : "hiddenModal"
      } `}
    >
      <div className={styles.AddProjectModalInnerSection}>
        <div className={styles.HeaderSection}>
          <ul>
            <li>
              <h2 className="Main-header-web">Add project</h2>
            </li>
            <li>
              <button onClick={CloseModalBtn}>
                <IoIosCloseCircleOutline />
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.AddInformationPart}>
          <form>
            <div className={styles.FormSectionInputFlex}>
              <div className={styles.ImageInputSec}>
                <div className={styles.RowFlexSection}>
                  <div className={styles.RowPartOne}>
                    <h4>title image</h4>
                    <label htmlFor="TitleImage">
                      <div className={styles.clickItem}>
                        <div className={styles.svgs}>
                          <BsImages />
                        </div>
                        <span>Browse Image</span>
                        <p>
                          PNG, JPEG <br /> (max 4mb size)
                        </p>
                      </div>
                    </label>
                    <input
                      type="file"
                      className="d-none"
                      name=""
                      id="TitleImage"
                      onChange={OnChangeImg}
                    />
                  </div>
                  <div className={styles.RowPartOne}>
                    <h4> gallery image</h4>
                    <label htmlFor="GalleryImage">
                      <div className={styles.clickItem}>
                        <div className={styles.svgs}>
                          <BsImages />
                        </div>
                        <span>Browse Image</span>
                        <p>
                          PNG, JPEG <br /> (max 4mb size)
                        </p>
                      </div>
                    </label>
                    <input
                      type="file"
                      className="d-none"
                      name=""
                      id="GalleryImage"
                      onChange={OnChangeImgMultiple}
                      multiple
                    />
                  </div>
                </div>
              </div>
              <div className={styles.textInputSec}>
                <div className="col-md-12">
                  <div className={styles.InputField}>
                    <label htmlFor="ProjectName"> Project Name</label>
                    <input
                      type="text"
                      id="ProjectName"
                      name="ProjectName"
                      onChange={OnChangeTxt}
                      placeholder={
                        Info_Container_To_Update_The_Project_Info != undefined
                          ? Info_Container_To_Update_The_Project_Info?.projectName
                          : "Add The Name Of The Project"
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className={styles.InputField}>
                    <label htmlFor="MetaData"> metadata</label>
                    <input
                      type="text"
                      id="MetaData"
                      name="MetaData"
                      onChange={OnChangeTxt}
                      placeholder={
                        Info_Container_To_Update_The_Project_Info != undefined
                          ? Info_Container_To_Update_The_Project_Info?.metadata
                          : "Add MetaData"
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className={styles.InputField}>
                    <label htmlFor="Description"> Description</label>
                    <textarea
                      type="text"
                      id="Description"
                      name="Description"
                      rows="10"
                      onChange={OnChangeTxt}
                      placeholder={
                        Info_Container_To_Update_The_Project_Info != undefined
                          ? Info_Container_To_Update_The_Project_Info?.description
                          : "Enter Description"
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className={styles.InputField}>
                    <label htmlFor="Address"> address</label>
                    <textarea
                      type="text"
                      id="Address"
                      rows="3"
                      name="Address"
                      onChange={OnChangeTxt}
                      placeholder={
                        Info_Container_To_Update_The_Project_Info != undefined
                          ? Info_Container_To_Update_The_Project_Info?.address
                          : "Add Address"
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="row p-0">
                  <div className="col-md-6">
                    <div className={styles.InputField}>
                      <label htmlFor="Pincode"> Pincode</label>
                      <input
                        type="text"
                        id="Pincode"
                        name="Pincode"
                        onChange={OnChangeTxt}
                        placeholder={
                          Info_Container_To_Update_The_Project_Info != undefined
                            ? Info_Container_To_Update_The_Project_Info?.pincode
                            : "Add a Pincode"
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.InputField}>
                      <label htmlFor="District"> District</label>
                      <input
                        type="text"
                        id="District"
                        name="District"
                        onChange={OnChangeTxt}
                        placeholder={
                          Info_Container_To_Update_The_Project_Info != undefined
                            ? Info_Container_To_Update_The_Project_Info?.district
                            : "Add District"
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row p-0">
                  <div
                    className="col-md-12 col-md-12 col-sm-12 col-12 "
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "0px",
                      width: "100%",
                      padding: "10px 10px ",
                    }}
                  >
                    <Form.Check
                      type="radio"
                      id="Public"
                      label="Public"
                      name="group1"
                      onClick={Toggle}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        gap: "20px",
                        width: "100%",
                      }}
                      readOnly
                      checked={!Private}
                      className="form-check p-0"
                    />
                    <p className="txt-pera-1">
                      by choosing public your projects is visible by all the
                      user
                    </p>
                  </div>
                  <div
                    className="col-md-12 col-md-12 col-sm-12 col-12 "
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "0px",
                      width: "100%",
                      padding: "10px 10px ",
                    }}
                  >
                    <Form.Check
                      type="radio"
                      id="Private"
                      label="Private"
                      name="group1"
                      onClick={Toggle}
                      checked={Private}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        gap: "20px",
                        width: "100%",
                      }}
                      readOnly
                      className="form-check p-0"
                    />
                    <p className="txt-pera-1">
                      by choosing Private your projects is only visible by you
                    </p>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className={styles.ButtonsFlexSection}>
                    <button
                      className="transperent-btn"
                      type="button"
                      onClick={CloseModalBtn}
                    >
                      Cancel
                    </button>
                    {Info_Container_To_Update_The_Project_Info != undefined ? (
                      <button
                        className="filled-btn"
                        type="button"
                        onClick={Sumbit_Updated_Project}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        className="filled-btn"
                        type="button"
                        onClick={ProjectSubmit}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProjectModal;
