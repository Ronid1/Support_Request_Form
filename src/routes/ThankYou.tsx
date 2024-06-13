import { useSelector } from "react-redux";
import { RootState } from "../app/state_managment/store";
import { useNavigate } from "react-router-dom";
import { FormFields, issueTypes } from "../app/types/schema";
import style from "../app/styles/summary.module.css";

function ThankYou() {
  const defaultValues: FormFields = {
    fullName: "",
    email: "",
    issueType: issueTypes[0],
    stepsToReproduce: [{ text: "" }],
    tags: [],
  };

  const { fullName, email, issueType, stepsToReproduce, tags } =
    useSelector(
      (state: RootState) =>
        state.requests.value[state.requests.value.length - 1]
    ) || defaultValues;

  const navigate = useNavigate();

  return (
    <>
      <h3>Your Request Has Been Submitted!</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Thank you for submitting a request</h5>
          <p className="card-text">
            We got all of the information and will get back to you as soon as
            possible
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className={style.list_header}>Name: </span>
              {fullName}
            </li>
            <li className="list-group-item">
              {" "}
              <span className={style.list_header}>Email:</span> {email}
            </li>
            <li className="list-group-item">
              {" "}
              <span className={style.list_header}>Issue Type:</span> {issueType}
            </li>
            <li className="list-group-item">
              <span className={style.list_header}>Tags: </span>
              {tags?.map((tag) => (
                <span key={tag} className="badge text-bg-secondary">
                  {tag}{" "}
                </span>
              ))}
            </li>
            <li className="list-group-item">
              <span className={style.list_header}>Steps To Reproduce: </span>
              {stepsToReproduce.map((step, index) => {
                return (
                  <p className={style.steps_list} key={index}>
                    {index + 1}) {step.text}
                  </p>
                );
              })}
            </li>
          </ul>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate("/")}
      >
        Send Another Request
      </button>
    </>
  );
}

export default ThankYou;
