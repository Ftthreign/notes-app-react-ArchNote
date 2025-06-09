import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../helpers/network-data";
import NoteDetail from "../components/NoteDetail";
import { useNavigate } from "react-router-dom";
import styles from "../styles/NoteDetail.module.css";

export default function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    async function fetchNote() {
      const { data } = await getNote(id);
      setNote(data);
    }
    fetchNote();
  }, [id]);

  async function onDelete() {
    await deleteNote(id);
    navigate("/");
  }

  async function onArchiveToggle() {
    if (note.archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }
    navigate("/");
  }

  return (
    <section className={styles.detail_page}>
      {note && (
        <NoteDetail
          note={note}
          onDelete={onDelete}
          onArchiveToggle={onArchiveToggle}
        />
      )}
    </section>
  );
}
