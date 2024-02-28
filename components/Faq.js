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
                  <p>how to add project :</p>
                  <ul style={{ padding: "15px 25px" }}>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        To add a project, first, navigate to the project page.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        To add a project, first click on the "add project"
                        button. This will open a modal where you should enter
                        the necessary details. You will then be prompted to
                        choose between a public or private project. A public
                        project is visible to everyone, while a private project
                        is only visible to you. After selecting the appropriate
                        option, click on "done". It may take a short amount of
                        time for the project to go live.
                      </p>
                    </li>
                  </ul>
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
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Can anyone visiting the site create an account?
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <ul>
                <li>
                  <p>
                    In the past, anyone who visited our website could create an
                    account without any restrictions. However, we have recently
                    made significant changes to our website's security measures
                    to maintain a secure environment for our users.
                  </p>
                </li>
                <li>
                  <p>
                    The latest version of our website now requires a company
                    passkey to create an account. This passkey is different from
                    the admin passkey and is provided by Divine Group, our
                    organization. The company passkey is a unique code that
                    ensures only authorized individuals can create an account on
                    our website, enhancing our website's security.
                  </p>
                </li>
                <li>
                  <p>
                    By implementing this new feature, we aim to prevent any
                    unauthorized access to our website and protect our users'
                    data from any malicious activities. Therefore, we have made
                    it mandatory for everyone who wants to create an account on
                    our website to use the company passkey.
                  </p>
                </li>
                <li>
                  <p>
                    We are confident that this change will provide a more secure
                    environment for our users and ensure that their personal
                    information is kept safe. If you have any questions or
                    concerns regarding this change, please feel free to contact
                    us, and we will be happy to assist you.
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
              data-bs-target="#flush-collapseFour"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Why are we using an inbuilt chat system instead of a third-party
              chat system?
            </button>
          </h2>
          <div
            id="flush-collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <ul>
                <li>
                  <p>
                    There are several reasons why using an inbuilt chat system
                    can be advantageous over a third-party chat system.
                  </p>
                </li>
                <li style={{ listStyleType: "none" }}>
                  <ul style={{ padding: "15px 25px" }}>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        Firstly, an inbuilt chat system can be easily integrated
                        into our existing platform or website without the need
                        for additional plugins or third-party dependencies. This
                        can save time and resources and can provide a seamless
                        experience for our users.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        Secondly, with an inbuilt chat system, we have greater
                        control over customization and branding. This can ensure
                        that the chat system aligns perfectly with our brand
                        identity and user experience. We can tailor the chat
                        system to our specific needs and preferences and can
                        make it look and feel the way we want it to.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        Thirdly, hosting the chat system in-house allows us to
                        have more control over data privacy and security
                        measures. We can ensure that sensitive information
                        shared in conversations is protected according to our
                        standards and regulatory requirements. This can be
                        particularly important for businesses that handle
                        sensitive information such as financial or health data.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        Fourthly, depending on the scale of our operations,
                        using an inbuilt chat system may be more cost-effective
                        in the long run compared to paying subscription fees or
                        licensing costs for a third-party solution. This can be
                        especially true for larger businesses that require a lot
                        of chat sessions and users.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        Lastly, inbuilt chat systems can be optimized for
                        performance and tailored to meet the specific needs of
                        our platform or website. This can potentially offer
                        faster response times and better reliability for our
                        users. We can ensure that the chat system operates
                        smoothly and doesn't affect the overall performance of
                        our platform or website.
                      </p>
                    </li>
                  </ul>
                </li>

                <li>
                  <p>
                    Overall, the decision to use an inbuilt chat system versus a
                    third-party chat system depends on several factors. These
                    include integration requirements, customization needs, data
                    privacy concerns, cost considerations, and performance
                    expectations. By considering these factors, we can make an
                    informed decision that best meets the needs of our business
                    and our users.
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
              data-bs-target="#flush-collapseFive"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              how to change the password?
            </button>
          </h2>
          <div
            id="flush-collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <ul>
                <li>
                  <p>
                    If you want to change your password, you can follow these
                    detailed steps:
                  </p>
                </li>
                <li style={{ listStyleType: "none" }}>
                  <ul style={{ padding: "15px 25px" }}>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        <span>Login to Your Account:</span>
                        Firstly, make sure to log in to your account using the
                        appropriate login credentials. Sometimes, the login page
                        can be found on the website's homepage or on a separate
                        login page.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        <span>Navigate to Settings: </span> Once you have logged
                        in, navigate to the settings option.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        <span>Locate Password Settings:</span> Once you are in
                        the settings menu, look for the option to change your
                        password. This option might be labeled "Security" or
                        "Privacy," or it may have its own tab or section.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        <span>Verify Your Identity:</span> After you click on
                        the change password option, you will be asked to verify
                        your identity. This is usually done by entering your
                        current password.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        <span>Enter a New Password:</span> Once your identity is
                        confirmed, you can create a new password. Choose a
                        password that is strong and secure, with a mix of upper
                        and lowercase letters, numbers, and special characters.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        <span>Confirm the New Password: </span> To ensure that
                        you have entered your new password correctly, you will
                        be asked to re-enter it. Make sure that the passwords
                        match before you submit the change.
                      </p>
                    </li>
                  </ul>
                </li>

                <li>
                  <p>
                    By following these steps, you should be able to successfully
                    change your password on most online platforms. If you
                    encounter any difficulties, each platform usually provides
                    help or support options to guide you through the process.
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
              data-bs-target="#flush-collapseSix"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              What is a dashboard app and why do we need it?
            </button>
          </h2>
          <div
            id="flush-collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <ul>
                <li>
                  <p>
                    A dashboard app is a software program that provides a
                    comprehensive and visual representation of important data,
                    metrics, and performance indicators in a centralized and
                    easily accessible format. It is designed to collect
                    information from a variety of sources such as databases,
                    spreadsheets, or other software systems, and present it in a
                    meaningful and easy-to-understand way using charts, graphs,
                    tables, and other visualizations.
                  </p>
                </li>
                <li style={{ listStyleType: "none" }}>
                  <ul style={{ padding: "15px 25px" }}>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        The use of dashboard apps is becoming increasingly
                        popular in modern businesses for several reasons.
                        Firstly, dashboard apps provide data visualization,
                        allowing us to easily represent complex data sets and
                        understand trends, patterns, and insights at a glance.
                        This makes it easier to identify areas that require
                        attention, which can help organizations make informed
                        decisions and take necessary actions to optimize
                        performance.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        Secondly, dashboard apps offer real-time or
                        near-real-time updates on key performance indicators
                        (KPIs), enabling businesses to track progress towards
                        their goals and objectives effectively. This is
                        particularly useful in highly competitive environments
                        where even small improvements can make a significant
                        difference.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        Thirdly, dashboard apps can help decision-makers make
                        informed decisions more quickly and effectively by
                        presenting relevant data in a clear format. By having
                        all the relevant data readily available, decision-makers
                        can analyze the information and make accurate
                        predictions, reducing the risk of errors and improving
                        overall efficiency.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        Fourthly, dashboard apps streamline data analysis
                        processes by aggregating information from multiple
                        sources into a single interface. This saves time and
                        reduces the need for manual data manipulation, which can
                        be a time-consuming and error-prone process.
                      </p>
                    </li>
                    <li style={{ listStyleType: "number" }}>
                      <p>
                        Finally, dashboard apps offer a user-friendly interface
                        that can be accessed from various devices, making it
                        easy for stakeholders to monitor data and make decisions
                        from anywhere with an internet connection. This means
                        that businesses can keep track of their performance and
                        make informed decisions on the go, which is essential in
                        today's fast-paced business environment.
                      </p>
                    </li>
                  </ul>
                </li>

                <li>
                  <p>
                    Overall, dashboard apps play a crucial role in empowering
                    organizations to make data-driven decisions, optimize
                    performance, and achieve their business objectives more
                    effectively. With the increasing amount of data available,
                    dashboard apps are becoming an essential tool for businesses
                    of all sizes to stay competitive.
                  </p>
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
