import {
  faGithub,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFile, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export type IconOptions =
  | "linkedin"
  | "email"
  | "whatsapp"
  | "phone"
  | "resume"
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
    case "resume":
      return <FontAwesomeIcon icon={faFile} />;
    case "github":
      return <FontAwesomeIcon icon={faGithub} />;
    default:
      return null;
  }
}
