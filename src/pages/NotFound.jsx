import React from "react";
import styles from "../styles/NotFound.module.css";
import { useTranslation } from "../hooks/useTranslation";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <section className={styles.NotFoundPage}>
      <h2>404 - {t("notFound.message")}</h2>
      <p>{t("notFound.details")}</p>
      <button onClick={() => navigate(-1)}>{t("backToHomeBtn")}</button>
    </section>
  );
}

export default NotFoundPage;
