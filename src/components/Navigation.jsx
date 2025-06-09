import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { LocaleContext } from "../contexts/LocaleContext";
import { AuthContext } from "../contexts/AuthContext";
import styles from "../styles/Navigation.module.css";
import translations from "../helpers/i18n";

function Navigation() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { toggleLocale, locale } = useContext(LocaleContext);
  const { authUser, logout } = useContext(AuthContext);
  const location = useLocation();
  const t = translations[locale];

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className={styles.navigation}>
      {authUser && !isAuthPage && (
        <ul>
          <li>
            <Link to="/" className={styles.appName}>
              {t.appName}
            </Link>
          </li>
          <li>
            <Link to="/notes/archived">{t.archiveHref}</Link>
          </li>
          <li>
            <Link to="/notes/new">{t.addNote}</Link>
          </li>
        </ul>
      )}

      <div className={styles.navActions}>
        <button onClick={toggleTheme}>{theme === "light" ? "🌙" : "☀️"}</button>
        <button onClick={toggleLocale}>{locale === "id" ? "EN" : "ID"}</button>
        {authUser && !isAuthPage && (
          <button onClick={logout}>{t.logout}</button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
