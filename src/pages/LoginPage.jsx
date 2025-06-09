import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../helpers/network-data";
import styles from "../styles/LoginPage.module.css";
import { useTranslation } from "../hooks/useTranslation";

export default function LoginPage() {
  const { loginSuccess } = useContext(AuthContext);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { t } = useTranslation();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { error, data } = await login(form);

    if (!error) {
      await loginSuccess(data.accessToken);
      navigate("/");
      console.log("ini jika berhasil login");
    } else {
      alert("Login Gagal");
    }
  };

  return (
    <div className={styles.loginPage}>
      <form onSubmit={onSubmit} className={styles.loginForm}>
        <h2>{t("login")}</h2>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
          placeholder={t("email")}
          className={styles.inputField}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          required
          placeholder={t("password")}
          className={styles.inputField}
        />
        <button type="submit">{t("login")}</button>
        <p>
          {t("noAccount")} <Link to="/register">{t("registerHere")}</Link>
        </p>
      </form>
    </div>
  );
}
