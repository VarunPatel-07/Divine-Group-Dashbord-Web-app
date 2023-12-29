"use client";
import React, { useState } from "react";
import styles from "./styles/style.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

function AddAdminPass(props) {
  
  const { SetRoleButton, SumbitButton ,OnChange } = props;
  
  return (
    <div className={styles.AddAdminPassModal}>
      <div className={styles.AdminPassCardInner}>
        <form className={styles.cardMainInput} onSubmit={SumbitButton}>
          <div className="col-md-12">
            <button
              onClick={SetRoleButton}
              style={{
                textAlign: "end",
                width: "100%",
                backgroundColor: "transparent",
              }}
            >
              <IoIosCloseCircleOutline
                style={{ color: "white", fontSize: "40px", textAlign: "end" }}
              />
            </button>
          </div>
          <div className="col-md-12">
            <p>
              Please enter the admin password in the input field below, provided
              by The organization.
            </p>
          </div>
          <div className="col-md-12">
            <div className={styles.InputFiledFlex}>
              <label htmlFor="">enter the password</label>
              <input
                type="password"
                
                placeholder="Enter The Password" onChange={OnChange}
              />
            </div>
          </div>
          <div className="col-md-12">
            <button
              style={{ width: "100%", height: "48px" }}
              className="filled-btn"
            >
              sumbit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAdminPass;
