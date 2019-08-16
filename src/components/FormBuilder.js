import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import UserCard from "./UserCard.js";

function FormBuilder({ errors, touched, values, status }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <>
      <header>User Onboarding</header>
      <Form>
        <p>
          <span>*</span> Name:
        </p>
        <Field component="input" type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <p>
          <span>*</span> Email:
        </p>
        <Field component="input" type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <p>
          <span>*</span> Password:
        </p>
        <Field
          component="input"
          type="password"
          name="password"
          placeholder="Password"
        />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label>
          <span>*</span> I have read the Terms of Service
          <Field className="check" type="checkbox" name="tos" checked={values.tos} />
          {errors.tos && <p className="error">{errors.tos}</p>}
        </label>

        <button>Submit</button>
      </Form>
      <div className="users">
        {users.map(cv => {
          return <UserCard user={cv} key={cv.id} />;
        })}
      </div>
    </>
  );
}

const formikHOC = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .length(8, "Name MUST be 8 characters long")
      .required(),
    email: Yup.string()
      .email()
      .required("Email is invalid"),
    password: Yup.string()
      .min(6, "Password is too short")
      .max(12, "Password is too long")
      .required(),
    tos: Yup.bool().oneOf([true], "You MUST accept Terms and Conditions")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    Axios.post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
        resetForm();
      })
      .catch(err => {
        console.log("error", err);
      });
  }
});

const FormWithFormik = formikHOC(FormBuilder);

export default FormWithFormik;
