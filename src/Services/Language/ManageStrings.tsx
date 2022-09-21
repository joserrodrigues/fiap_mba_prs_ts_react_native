// ES6 module syntax
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import stringsEn from "../../../assets/Locales/en-US.json";
import stringsPt from "../../../assets/Locales/pt-BR.json";

const i18n = new I18n({
  "pt-BR": stringsPt,
  pt: stringsPt,
  en: stringsEn,
  "en-US": stringsEn,
});

// Set the locale once at the beginning of your app.
let currentLanguage = Localization.locale;
if (
  currentLanguage === "pt-BR" ||
  currentLanguage === "pt" ||
  currentLanguage === "en"
) {
  i18n.locale = Localization.locale;
} else if (currentLanguage.includes("pt-")) {
  i18n.locale = "pt-BR";
} else {
  i18n.locale = "en";
}

export { i18n };
