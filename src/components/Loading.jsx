import React from "react";
import styles from "../styles/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
}
