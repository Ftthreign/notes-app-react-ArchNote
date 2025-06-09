import React from "react";
import styles from "../styles/RegisterPage.module.css";
import { useTranslation } from "../hooks/useTranslation";
import PropTypes from "prop-types";

export default function RegisterForm({ form, onChange, errorMessage }) {
  const { t } = useTranslation();

  return (
    <>
      <input
        name="name"
        type="text"
        placeholder={t("name")}
        value={form.name}
        onChange={onChange}
        required
        className={styles.inputField}
      />
      <input
        name="email"
        type="email"
        placeholder={t("email")}
        value={form.email}
        onChange={onChange}
        required
        className={styles.inputField}
      />
      <input
        name="password"
        type="password"
        placeholder={t("password")}
        value={form.password}
        onChange={onChange}
        required
        className={styles.inputField}
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder={t("confirmPassword")}
        value={form.confirmPassword}
        onChange={onChange}
        required
        className={styles.inputField}
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </>
  );
}

RegisterForm.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
