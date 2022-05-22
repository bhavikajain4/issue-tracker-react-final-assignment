import React from "react";
import { useTranslation } from "react-i18next";
// import profile from "../../assests/images/profile.png";
import "./Card.css";
export interface Issue {
  assignee: assignee;
  createdBy: assignee;
  createdOn: string;
  description: string;
  id: string;
  priority: number;
  projectID: string;
  sprint: string;
  status: number;
  storyPoint: number;
  summary: string;
  tags: string[];
}

export interface assignee {
  id: number;
  name: string;
  email: string;
  teamName: string;
  desination: string;
}

interface Props {
  issue: Issue;
}

const Card = (props: any) => {
  const { t } = useTranslation();

  let priorityType = "high";
  if (props.issue.priority === 2) priorityType = "medium";
  if (props.issue.priority === 1) priorityType = "low";
  return (
    <div className="issue-container">
      <div className="issue-details">
        <h5>
          {t("ID")}: {props.issue.id}
        </h5>
        <h5>
          {props.issue.createdOn.split("T")[0].split("-").reverse().join("-")}
        </h5>
      </div>
      <div className="issue-description">
        <h5>{props.issue.description}</h5>
        <p>{props.issue.summary}</p>
      </div>
      <div className="assignee-details">
        <div className="assignee-name">
          <img src="" alt="" /> {props.issue.assignee.name}
        </div>
        <div className="issue-priority">
          <p className="priority">{t("Priority")}</p>
          <p
            className={
              priorityType === "high"
                ? "high"
                : priorityType === "medium"
                ? "medium"
                : "low"
            }
          >
            {priorityType}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Card;
