import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../slices/authSlice";
import { clearMessage } from "../slices/messageSlice";

const Register = () => {
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        name: "",
        email: "",
        phone: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .test(
                "len",
                "The username must be between 2 and 20 characters.",
                (val) => val && val.toString().length >= 2 && val.toString().length <= 20
            )
            .required("This field is required!"),
        phone: Yup.string()
            .test(
                "len",
                "The username must be between 10 and 15 characters.",
                (val) => val && val.toString().length >= 10 && val.toString().length <= 15
            )
            .required("This field is required!"),
        email: Yup.string()
            .required("This field is required!"),
        password: Yup.string()
            .test(
                "len",
                "The password must be between 6 and 40 characters.",
                (val) =>
                    val && val.toString().length >= 6 && val.toString().length <= 40
            )
            .required("This field is required!"),
    });

    const handleRegister = (formValue) => {
        const { name, phone, email, password } = formValue;

        setSuccessful(false);

        dispatch(register({ name, phone, email, password }))
            .unwrap()
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    return (
        <div className="col-md-12 signup-form">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    {({ errors, touched }) => (
                        <Form>
                            {!successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="name">Username</label>
                                        <Field
                                            name="name"
                                            type="text"
                                            className={
                                                "form-control" +
                                                (errors.username && touched.username
                                                    ? " is-invalid"
                                                    : "")
                                            }
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field
                                            name="email"
                                            type="email"
                                            className={
                                                "form-control" +
                                                (errors.email && touched.email ? " is-invalid" : "")
                                            }
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Phone</label>
                                        <Field
                                            name="phone"
                                            type="text"
                                            className={
                                                "form-control" +
                                                (errors.phone && touched.phone ? " is-invalid" : "")
                                            }
                                        />
                                        <ErrorMessage
                                            name="phone"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field
                                            name="password"
                                            type="password"
                                            className={
                                                "form-control" +
                                                (errors.password && touched.password
                                                    ? " is-invalid"
                                                    : "")
                                            }
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>

            {message && (
                <div className="form-group">
                    <div
                        className={
                            successful ? "alert alert-success" : "alert alert-danger"
                        }
                        role="alert"
                    >
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
