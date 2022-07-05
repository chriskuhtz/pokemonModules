import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import "./bugButton.css";

const BugButtonProvider = ({
  condition,
  children,
  fromBottom,
  fromLeft,
  fromRight,
  fromTop,
  url,
  authToken,
}: {
  condition: boolean;
  children: ReactElement;
  url: string;
  authToken: string;
  fromTop?: number;
  fromBottom?: number;
  fromRight?: number;
  fromLeft?: number;
}): JSX.Element => {
  if (authToken === "") {
    console.error("no authtoken passed in");
  }
  if (url === "") {
    console.error("no report url passed in");
  }
  const [showModal, setShowModal] = useState<boolean>(false);

  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [reporter, setReporter] = useState<string>("");
  const currentUrl = window.location.href;

  const [linkToIssue, setLinkToIssue] = useState<
    { url: string; number: number } | undefined
  >(undefined);

  const githubToken = `Bearer ${authToken}`;

  const assembleBody = () => {
    const res = [
      "Reporter: " + reporter,
      "URL: " + currentUrl,
      "Description: " + description,
    ].join("\r\n\n");
    return res;
  };
  const handleReportClick = async () => {
    axios({
      method: "post",
      url: url,
      headers: {
        Authorization: githubToken,
      },
      data: {
        title: title,
        body: assembleBody(),
      },
    })
      .then(function (response) {
        console.log(response);
        setLinkToIssue({
          url: response.data.html_url,
          number: response.data.number,
        });
        setDescription("");
        setTitle("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (condition === true && authToken !== "" && url !== "") {
    return (
      <>
        <button
          className="bugButton"
          style={{
            position: "absolute",
            top: fromTop ? `${fromTop}px` : undefined,
            right: fromRight ? `${fromRight}px` : undefined,
            bottom: fromBottom ? `${fromBottom}px` : undefined,
            left: fromLeft ? `${fromLeft}px` : undefined,
          }}
          onClick={() => setShowModal(true)}
        >
          BUG
        </button>
        <div
          className={showModal ? "bugModal stack" : "displayNone"}
          style={{
            position: "absolute",
            top: fromTop ? `${fromTop}px` : undefined,
            right: fromRight ? `${fromRight}px` : undefined,
            bottom: fromBottom ? `${fromBottom}px` : undefined,
            left: fromLeft ? `${fromLeft}px` : undefined,
          }}
        >
          <div className="closeButtonBox">
            <button className="closeButton" onClick={() => setShowModal(false)}>
              X
            </button>
          </div>

          <p>Please describe the Bug</p>
          <p>
            {linkToIssue && (
              <a target="_blank" href={linkToIssue.url}>
                {`Issue ${linkToIssue.number} created successfully`}
              </a>
            )}
          </p>
          <div>
            <input
              placeholder="title"
              value={title}
              onChange={(e) => {
                setLinkToIssue(undefined);
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              placeholder="reporter"
              value={reporter}
              onChange={(e) => {
                setLinkToIssue(undefined);
                setReporter(e.target.value);
              }}
            />
          </div>
          <div>
            <textarea
              name="description"
              rows={10}
              cols={30}
              placeholder="body"
              value={description}
              onChange={(e) => {
                setLinkToIssue(undefined);
                setDescription(e.target.value);
              }}
            />
          </div>
          <button
            disabled={description === "" || title === "" || reporter === ""}
            className="reportButton"
            onClick={handleReportClick}
          >
            Report
          </button>
        </div>
        {children}
      </>
    );
  } else return <> {children}</>;
};

export default BugButtonProvider;
