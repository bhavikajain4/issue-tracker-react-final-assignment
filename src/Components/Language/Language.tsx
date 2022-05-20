import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./Language.css";

const languages = [
  {
    code: "hi",
    name: "हिन्दी",
    country_code: "in",
  },
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "fr",
    name: "Français",
    country_code: "fr",
  },
];

function Language(props: any) {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("app_title");
  }, [t]);

  return (
    <div className="language-component-container">
      <DropdownButton
        variant="secondary"
        id="dropdown-basic-button"
        title={t("language")}
        className="dropdown-custom"
      >
        {/* <Dropdown.ItemText>{t("language")}</Dropdown.ItemText> */}
        {languages.map(({ code, name, country_code }) => (
          <Dropdown.Item
            as="button"
            key={country_code}
            onClick={() => i18next.changeLanguage(code)}
          >
            {name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
}

export default Language;
