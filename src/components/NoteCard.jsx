import PropTypes from "prop-types";
import React from "react";
import NoteItem from "./NoteItem";
import styles from "../styles/NoteCard.module.css";
import { useTranslation } from "../hooks/useTranslation";

export default function NoteCard({ notes, onDelete, onArchive }) {
  const { t } = useTranslation();

  if (notes.length === 0)
    return <p className={styles.emptyMessage}>{t("emptyNotes")}</p>;

  return (
    <div className={styles.Cardcontainer}>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          {...note}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}

NoteCard.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
};
