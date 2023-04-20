import {
  faGithub,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faFile,
  faFilePdf,
  faFileWord,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export type IconOptions =
  | "linkedin"
  | "email"
  | "whatsapp"
  | "phone"
  | "word"
  | "pdf"
  | "github";

type PrivateProps = {
  icon: IconOptions;
};

export function Icon({ icon }: PrivateProps) {
  switch (icon) {
    case "linkedin":
      return <FontAwesomeIcon icon={faLinkedin} />;
    case "email":
      return <FontAwesomeIcon icon={faEnvelope} />;
    case "whatsapp":
      return <FontAwesomeIcon icon={faWhatsapp} />;
    case "phone":
      return <FontAwesomeIcon icon={faPhone} />;
    case "word":
      return <FontAwesomeIcon icon={faFileWord} />;
    case "pdf":
      return <FontAwesomeIcon icon={faFilePdf} />;
    case "github":
      return <FontAwesomeIcon icon={faGithub} />;
    default:
      return null;
  }
}
