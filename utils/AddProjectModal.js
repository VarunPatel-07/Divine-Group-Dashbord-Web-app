import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./styles/style.module.css";
import { BsImages } from "react-icons/bs";

function AddProjectModal(props) {
  const { AddModalState, CloseModalBtn } = props;
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
                    />
                  </div>
                  <div className={styles.RowPartOne}>
                    <h4> galery image</h4>
                    <label htmlFor="GaleryImage">
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
                      id="GaleryImage"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.textInputSec}>
                <div className="col-md-12">
                  <div className={styles.InputField}>
                    <label htmlFor="ProjectName"> Project Name</label>
                    <input type="text" id="ProjectName" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className={styles.InputField}>
                    <label htmlFor="MetaData"> metadata</label>
                    <input type="text" id="MetaData" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className={styles.InputField}>
                    <label htmlFor="Discription"> Discription</label>
                    <textarea type="text" id="Discription" rows="3"></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className={styles.InputField}>
                    <label htmlFor="Address"> address</label>
                    <textarea type="text" id="Address" rows="3"></textarea>
                  </div>
                </div>
                <div className="row p-0">
                  <div className="col-md-6">
                    <div className={styles.InputField}>
                      <label htmlFor="Pincode"> Pincode</label>
                      <input type="text" id="Pincode" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.InputField}>
                      <label htmlFor="District"> District</label>
                      <input type="text" id="District" />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className={styles.ButtonsFlexSection}>
                    <button className="transperent-btn" onClick={CloseModalBtn}>
                      Cancel
                    </button>
                    <button className="filled-btn">Add</button>
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
