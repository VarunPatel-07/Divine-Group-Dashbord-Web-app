"use client";
import React, { useState } from "react";
import styles from "../styles/style.module.css";
import Faq from "@/components/Faq";
import Head from "next/head";

function HelpCenter() {
  const [ShowFaq, setShowFaq] = useState(true);
  return (
    <>
      <Head>
        <title>land</title>
      </Head>
      <div className="container-main-sec">
        <div className={styles.HelpCenter_Main_Section}>
          <div className={styles.HelpCenter_Inner_section}>
            <div className={styles.HelpCenter_Button_Section}>
              <div className={styles.Title}>
                <h4> Help Center </h4>
              </div>
              <ul>
                <li>
                  <button className={`${ShowFaq ? "Button_Active" : ""}`}>
                    Faq
                  </button>
                </li>
                <li>
                  <button className={`${ShowFaq ? "" : "Button_Active"}`}>
                    Contact Information
                  </button>
                </li>
              </ul>
            </div>
            <div className={styles.Faq_Section_Main}>
              <div className={styles.Fixed_Header_Title}>
                <h4>Frequently Asked Questions (FAQ’s)</h4>
              </div>
              <div className={styles.Faq_Part}>
                <Faq />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HelpCenter;
