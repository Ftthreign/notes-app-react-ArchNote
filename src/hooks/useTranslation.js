import { useContext } from "react";
import { LocaleContext } from "../contexts/LocaleContext";
import translations from "../helpers/i18n";

export function useTranslation() {
  const { locale } = useContext(LocaleContext);

  function t(key) {
    const keys = key.split(".");
    let result = translations[locale];

    for (const k of keys) {
      if (!result[k]) {
        return key;
      }
      result = result[k];
    }
    return result;
  }

  return { t, locale };
}
