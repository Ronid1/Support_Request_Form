import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { issueTypes, tags, schema, FormFields } from "../app/types/schema";
import { addRequest } from "../app/state_managment/requestsSlice";
import { useDispatch } from "react-redux";
import style from "../app/styles/form.module.css";

function Form() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { fields, insert, append, remove } = useFieldArray({
    control,
    name: "stepsToReproduce",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onSubmit(data: FormFields) {
    dispatch(addRequest({ ...data }));
    navigate("/thank-you");
  }

  return (
    <div className="overlay">
      <h1>Support Request Form</h1>
      <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            className="form-control form-control-sm"
            {...register("fullName")}
            type="text"
            placeholder="Full Name"
          />
          {errors.fullName && (
            <div className={style.error_msg}>{errors.fullName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control form-control-sm"
            {...register("email")}
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <div className={style.error_msg}>{errors.email.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Issue Type</label>
          <select
            className="form-select form-select-sm"
            {...register("issueType")}
          >
            {issueTypes.map((issue) => (
              <option data-value={issue} key={issue}>
                {issue}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          <div>
            {tags.map((tag, index) => (
              <div key={index}>
                <input
                  className={style.checkbox}
                  type="checkbox"
                  id={tag}
                  value={tag}
                  {...register("tags")}
                />
                <label className={style.checkbox_label} htmlFor={tag}>
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Steps to Reproduce</label>
          <ul className={style.steps_list}>
            {fields.map((field, index) => {
              return (
                <li key={index}>
                  <span>Step {index + 1}</span>
                  <section key={field.id} className="row">
                    <input
                      className="form-control form-control-sm col"
                      {...register(`stepsToReproduce.${index}.text`)}
                      type="text"
                    />
                    <div className="col">
                      <button
                        type="button"
                        className={`btn btn-sm ${style.btn_decrease} ${style.btn_steps}`}
                        onClick={() => remove(index)}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        className={`btn btn-sm ${style.btn_increase} ${style.btn_steps}`}
                        onClick={() => insert(index + 1, { text: "" })}
                      >
                        +
                      </button>
                    </div>
                  </section>
                </li>
              );
            })}
          </ul>
          {fields.length === 0 && (
            <button
              type="button"
              className={`btn btn-outline-secondary ${style.btn_cropped}`}
              onClick={() => append({ text: "" })}
            >
              Add Step
            </button>
          )}
          {errors.stepsToReproduce && (
            <div className={style.error_msg}>
              {errors.stepsToReproduce.message}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Form
        </button>
      </form>
    </div>
  );
}

export default Form;
