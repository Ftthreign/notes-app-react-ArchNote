import React, { useEffect, useState } from "react";
import {
  archiveNote,
  deleteNote,
  getActiveNotes,
  unarchiveNote,
} from "../helpers/network-data";
import Loading from "../components/Loading";
import Notecard from "../components/NoteCard";
import { useTranslation } from "../hooks/useTranslation";
import styles from "../styles/HomePage.module.css";

export default function HomePage() {
  const [notes, setNotes] = useState(getActiveNotes);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const { error, data } = await getActiveNotes();
    if (!error) setNotes(data);
    setLoading(false);
  };

  const onDeleteHandler = async (id) => {
    setLoading(true);
    await deleteNote(id);
    await fetchNotes();
  };

  const toggleArchiveHandler = async (id, archived) => {
    setLoading(true);
    if (archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }
    await fetchNotes();
  };

  if (loading) return <Loading />;

  return (
    <section className={styles.homePage}>
      <h2 className={styles.heading}>{t("activeNote")}</h2>
      <div className={styles.notesGrid}>
        <Notecard
          notes={notes}
          onDelete={onDeleteHandler}
          onArchive={(id) => {
            const note = notes.find((note) => note.id === id);
            if (note) toggleArchiveHandler(id, note.archived);
          }}
        />
      </div>
    </section>
  );
}
