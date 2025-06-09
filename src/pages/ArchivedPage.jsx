import React, { useEffect, useState } from "react";
import {
  getArchivedNotes,
  deleteNote,
  unarchiveNote,
} from "../helpers/network-data";
import NoteCard from "../components/NoteCard";
import Loading from "../components/Loading";
import styles from "../styles/ArchivedPage.module.css";

function ArchivedPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const { error, data } = await getArchivedNotes();
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
    }
    await fetchNotes();
  };

  if (loading) return <Loading />;

  console.log(notes);
  return (
    <section className={styles.archived_page}>
      <h2>Catatan Terarsip</h2>
      <NoteCard
        notes={notes}
        onDelete={onDeleteHandler}
        onArchive={(id) => {
          const note = notes.find((note) => note.id === id);
          if (note) toggleArchiveHandler(id, note.archived);
        }}
      />
    </section>
  );
}

export default ArchivedPage;
