"use client";
import React, { useContext, useState } from "react";
import styles from "../styles/style.module.css";
import BgImg from "../../../images/header-bg.png";
import Image from "next/image";
import Logo from "../../../images/Logo.png";
import Eye from "../helper/Eye";
import { useRouter } from "next/navigation";
import Form from "react-bootstrap/Form";
import AddAdminPass from "@/utils/AddAdminPass";
import noteContext from "@/context/noteContext";
const Host = "http://localhost:500";
import axios from "axios";
function SignUp() {
  const context = useContext(noteContext);

  const { content } = context;
  const [Role, setRole] = useState("user");
  const [RoleIsAdmin, setRoleIsAdmin] = useState(false);
  const [ShowAdminPass, setShowAdminPass] = useState(false);
  const [isEyeClose, setisEyeClose] = useState(false);
  const [InputVal, setInputVal] = useState("");
  const [InputFields, setInputFields] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const EyeClickBtn = (e) => {
    e.preventDefault();
    if (isEyeClose) {
      setisEyeClose(false);
    } else {
      setisEyeClose(true);
    }
  };
  const { push } = useRouter();
  const CreateAccountBtn = () => {
    push("/pages/login");
  };
  const SetRoleButtonTwo = () => {
    setRoleIsAdmin(false);
    setRole("user");
  };
  const SetRoleButton = () => {
    if (!ShowAdminPass) {
      setShowAdminPass(true);
    } else {
      setShowAdminPass(false);
    }
  };
  const SumbitButton = (e) => {
    e.preventDefault();
    if (InputVal === "DivineGroup@Admin") {
      setRoleIsAdmin(true);
      setRole("Admin");
    } else {
      setRoleIsAdmin(false);
      setRole("user");
    }
    setShowAdminPass(false);
  };
  const OnChange = (e) => {
    console.log(e.target.value);
    setInputVal(e.target.value);
  };
  const FillingInputFiled = (e) => {
    setInputFields({ ...InputFields, [e.target.name]: e.target.value });
  };
  const OnCardInfoSumbit = async (e) => {
    e.preventDefault();
    console.log(InputFields);
    const formdata = new FormData();
    formdata.append("username", InputFields.username);
    formdata.append("name", InputFields.name);
    formdata.append("email", InputFields.email);
    formdata.append("password", InputFields.password);
    formdata.append("role", Role);

    console.log(formdata);

    const responce = await axios.post(
      `${Host}/app/api/auth/register`,
      InputFields
    );

    console.log(responce);
    if(responce.data.success){
      push("/");
      sessionStorage.setItem('authtoken' , responce.datatoken)
    }else{
      console.log(responce.data.message)
    }
  };

  return (
    <>
      {ShowAdminPass ? (
        <AddAdminPass
          SetRoleButton={SetRoleButton}
          SumbitButton={SumbitButton}
          OnChange={OnChange}
        />
      ) : (
        ""
      )}

      <div className="login-sign-up-page">
        <div className={styles.loginSignUpPageSection}>
          <div className={styles.backgroundImage}>
            <Image
              src={BgImg}
              width="100%"
              height="100%"
              alt="backgroun image"
            ></Image>
          </div>
          <div className={styles.LoginCardPageMainSection}>
            <form
              className={`${styles.LoginCardPage} ${styles.SignUpPage}`}
              onSubmit={OnCardInfoSumbit}
            >
              <div className={styles.LoginCardInnerSection}>
                <div className={styles.logoImg}>
                  <Image
                    src={Logo}
                    alt="logo"
                    width="100%"
                    height="100%"
                  ></Image>
                </div>
                <div className={styles.Input}>
                  <div className="row p-0 w-100">
                    <div
                      className="col-md-6 col-sm-6 col-6 pt-0 pb-0"
                      style={{ paddingLeft: "0" }}
                    >
                      <div className={styles.InputFlexSec}>
                        <label htmlFor="username">UserName</label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Plese Enter Your UserName"
                          onChange={FillingInputFiled}
                        />
                      </div>
                    </div>
                    <div
                      className="col-md-6 col-sm-6 col-6 pt-0 pb-0"
                      style={{ paddingRight: "0" }}
                    >
                      <div className={styles.InputFlexSec}>
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Plese Enter Your Name"
                          onChange={FillingInputFiled}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 w-100">
                    <div className={styles.InputFlexSec}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Plese Enter Your Email"
                        onChange={FillingInputFiled}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 w-100">
                    <div className={styles.InputFlexSec}>
                      <label htmlFor="password">password</label>
                      <div className="w-100 position-relative height-48">
                        <input
                          type={isEyeClose ? "text" : "password"}
                          id="password"
                          name="password"
                          placeholder="Plese Enter a strong and apropriate password"
                          onChange={FillingInputFiled}
                        />
                        <button onClick={EyeClickBtn} type="button">
                          <Eye isEyeClose={isEyeClose} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 w-100 ">
                    <p>select your role</p>
                    <div className="row p-0">
                      <div
                        className="col-md-6 col-md-6 col-sm-6 col-6"
                        style={{ cursor: "pointer" }}
                      >
                        <Form.Check
                          inline
                          type="radio"
                          id="user"
                          label="User"
                          name="group1"
                          onClick={SetRoleButtonTwo}
                          checked={!RoleIsAdmin}
                          style={{ cursor: "pointer" }}
                          readOnly
                        />
                      </div>
                      <div
                        className="col-md-6 col-md-6 col-sm-6 col-6 "
                        style={{ cursor: "pointer" }}
                      >
                        <Form.Check
                          inline
                          type="radio"
                          id="Admin"
                          label="Admin"
                          name="group1"
                          onClick={SetRoleButton}
                          style={{ cursor: "pointer" }}
                          readOnly
                          checked={RoleIsAdmin}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.Buttons}>
                  <div className="col-md-12">
                    <button
                      className="filled-btn"
                      disabled={
                        InputFields.username.length < 3 ||
                        InputFields.name.length < 3 ||
                        InputFields.email.length < 3 ||
                        InputFields.password.length < 8
                      }
                    >
                      Sign In
                    </button>
                    <button
                      className={styles.navigatorBtn}
                      onClick={CreateAccountBtn}
                      type="button"
                    >
                      All Ready Have an Account? <span>log in </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
