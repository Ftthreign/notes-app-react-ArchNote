import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../helpers/network-data";
import styles from "../styles/CreateNewNote.module.css";

export default function CreateNotePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    body: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { error } = await addNote(form);
    if (!error) {
      alert("Catatan berhasil ditambahkan!");
      navigate("/");
    } else {
      alert("Gagal menambahkan catatan.");
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.createNoteForm}>
      <h2 className={styles.createNoteForm__title}>Buat Catatan Baru</h2>

      <label htmlFor="title" className={styles.createNoteForm__label}>
        Judul:
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="Judul catatan"
        required
        className={styles.createNoteForm__input}
      />

      <label htmlFor="body" className={styles.createNoteForm__label}>
        Isi:
      </label>
      <textarea
        id="body"
        name="body"
        value={form.body}
        onChange={onChange}
        placeholder="Isi catatan"
        rows={10}
        required
        className={styles.createNoteForm__textarea}
      />

      <button type="submit" className={styles.createNoteForm__button}>
        Simpan
      </button>
    </form>
  );
}
