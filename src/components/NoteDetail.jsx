import React from "react";
import { showFormattedDate } from "../helpers/formatDate";
import PropTypes from "prop-types";
import styles from "../styles/NoteDetail.module.css";
import { useTranslation } from "../hooks/useTranslation";
import { useNavigate } from "react-router-dom";

export default function NoteDetail({ note }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!note) return <p>{t("noteNotFound")}</p>;

  const { title, createdAt, body, archived } = note;

  return (
    <div>
      <h2 className={styles.noteTitle_details}>{title}</h2>
      <small>{showFormattedDate(createdAt)}</small>
      <p>{body}</p>
      <div className={styles.noteDetails_action}>
        <button onClick={() => navigate(-1)}>{t("backBtn")}</button>
        <p className={styles.note_status}>{`${t("noteStatus")} ${
          archived ? t("isActive.archived") : t("isActive.active")
        }`}</p>
      </div>
    </div>
  );
}

NoteDetail.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }),
};
