import React from "react";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../helpers/formatDate";
import PropTypes from "prop-types";
import styles from "../styles/NoteCard.module.css";
import { useTranslation } from "../hooks/useTranslation";

export default function NoteItem({
  id,
  title,
  body,
  archived,
  createdAt,
  onDelete,
  onArchive,
}) {
  const { t } = useTranslation();

  return (
    <div className={styles.noteItem}>
      <h3>
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <small>{showFormattedDate(createdAt)}</small>
      <p>{body.substring(0, 100)}...</p>
      <div className={styles.noteItem__action}>
        {onDelete && (
          <button
            className={styles.noteItem__delete_button}
            onClick={() => onDelete(id)}
          >
            {t("deleteBtn")}
          </button>
        )}
        <button
          className={styles.noteItem__archive_button}
          onClick={() => onArchive(id)}
        >
          {archived ? t("activate") : t("archive")}
        </button>
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
};
