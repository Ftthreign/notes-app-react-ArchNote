import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../helpers/network-data";
import RegisterForm from "../components/RegisterForm";
import styles from "../styles/RegisterPage.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (form.password !== form.confirmPassword) {
      setErrorMessage(t("passwordMismatch"));
      return;
    }

    const { error } = await register({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    if (!error) {
      alert(t("registerSuccess"));
      navigate("/login");
    } else {
      alert(t("registerFailed"));
    }
  };

  return (
    <div className={styles.registerPage}>
      <form onSubmit={onSubmit} className={styles.registerForm}>
        <h2>{t("register")}</h2>
        <RegisterForm
          form={form}
          onChange={onChange}
          errorMessage={errorMessage}
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button type="submit">{t("registerButton")}</button>
        <p>
          {t("haveAccount")} <Link to="/login">{t("loginHere")}</Link>
        </p>
      </form>
    </div>
  );
}
