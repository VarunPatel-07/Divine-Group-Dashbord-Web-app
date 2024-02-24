/* eslint-disable react/no-unescaped-entities */
import Script from "next/script";
import React from "react";

function Faq() {
  return (
    <>
      <div className="accordion accordion-flush " id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              how to log in as an admin ?
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <ul>
                <li>
                  <p>
                    When logging into the system as an administrator, it is
                    important to note that an admin password is required. This
                    is because administrators have an extraordinary amount of
                    authority and privilege within the system, enabling them to
                    perform specific tasks that regular users cannot. These
                    tasks may include modifying system settings, managing user
                    accounts, or accessing sensitive information that is
                    restricted from other users.
                  </p>
                </li>
                <li>
                  {" "}
                  <p>
                    Due to the significance of the administrator role, the admin
                    password is only given to a select group of individuals who
                    are authorized to access the account. Typically, this would
                    include senior-level executives, IT personnel, or other
                    individuals who hold a position of importance within the
                    organization.
                  </p>
                </li>
                <li>
                  {" "}
                  <p>
                    In order to maintain optimal security practices, it is
                    important that the admin password is not shared with anyone
                    who does not require access to the administrator account.
                    This helps to ensure that only authorized individuals are
                    able to make changes to the system, reducing the risk of
                    potential security breaches or other unauthorized access
                    attempts.
                  </p>
                </li>
                <li>
                  <p>
                    By following these best practices and limiting access to the
                    admin password, organizations can ensure that their systems
                    remain secure and that sensitive information is protected
                    from unauthorized access.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Would it be possible for everyone to add a project through this
              dashboard app?
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <ul>
                <li>
                  <p>
                    The dashboard app is designed to facilitate project
                    management for individuals and teams alike. With its
                    user-friendly interface, users can easily create and manage
                    projects. The app provides an efficient and intuitive
                    solution for creating project details such as project name,
                    description, start and end dates. The dashboard app
                    streamlines the project management process, ensuring
                    effective communication and coordination among team members.
                  </p>
                </li>
                <li>
                  <p>
                    When adding a project, it's important to keep in mind that
                    you should not promote any propaganda or vulgarity. As a
                    user, you are allowed to add a project, but please ensure
                    that it complies with the rules and regulations of the
                    group. If any such activity is found, the admin and BoD of
                    the group have the authority to take appropriate action. So,
                    be mindful and responsible when adding a project.
                  </p>
                </li>
                <li>
                  <p>how to add project</p>
                  <ul style={{ padding: "8px 15px" }}>
                    <li>
                      <p>to add project firstly go to the project section</p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
        integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
        crossorigin="anonymous"
      ></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
        integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
        crossorigin="anonymous"
      ></Script>
    </>
  );
}

export default Faq;
