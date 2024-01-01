"use client";
import React, { useState, useContext } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./styles/style.module.css";
import { BsImages } from "react-icons/bs";
import noteContext from "@/context/noteContext";
import Form from "react-bootstrap/Form";
function AddProjectModal(props) {
  const context = useContext(noteContext);
  const { content, ControlAddProjects, AuthToken } = context;
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
    formdata.append("private" , Private )
    for (const Image of GalleryImage) {
      formdata.append("GalleryImage", Image);
    }
    ControlAddProjects(formdata, AuthToken);
    CloseModalBtn()
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
          <form onSubmit={ProjectSubmit}>
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
                      placeholder="Add The Name Of The Project"
                      onChange={OnChangeTxt}
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
                      placeholder="Add MetaData"
                      onChange={OnChangeTxt}
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
                      rows="3"
                      placeholder="Enter Description"
                      onChange={OnChangeTxt}
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
                      placeholder="Add Address"
                      onChange={OnChangeTxt}
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
                        placeholder="Add a Pincode"
                        name="Pincode"
                        onChange={OnChangeTxt}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.InputField}>
                      <label htmlFor="District"> District</label>
                      <input
                        type="text"
                        id="District"
                        placeholder="Add District"
                        name="District"
                        onChange={OnChangeTxt}
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
                      by choosing Private  your projects is only visible by you
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
                    <button className="filled-btn" type="submit">
                      Add
                    </button>
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
