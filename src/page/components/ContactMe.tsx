import { Section } from "./Section";
import socialJson from "../../assets/json/socials.json";
import { Icon, IconOptions } from "../../Experience/components/Icon";

export function ContactMe() {
  const socials = socialJson.socials;

  return (
    <Section side="left" sectionClass="contact">
      <Section.Intro number={2}>Contact Me</Section.Intro>
      <Section.Detail>
        <p className="section-text">
          Thank you for visiting my portfolio! If you have any questions or
          would like to get in touch with me, please feel free to do so using
          any of the following methods:
        </p>

        <ul className="socials">
          {socials.map((social) => {
            return (
              <li key={social.href}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  <Icon icon={social.icon as IconOptions} />
                </a>
              </li>
            );
          })}
        </ul>

        <p className="section-text">
          Or you can download my CV by clicking the button below:
        </p>
        <ul className="buttons-cv">
          <li>
            <a
              className="dowland-cv"
              download={true}
              href="./files/OrDamariCV.pdf"
            >
              <Icon icon="pdf" />
              <span>Cv in PDF</span>
            </a>
          </li>
          <li>
            <a
              className="dowland-cv"
              download={true}
              href="./files/OrDamariCV.docx"
            >
              <Icon icon="word" />
              <span>Cv in Word</span>
            </a>
          </li>
        </ul>
      </Section.Detail>
    </Section>
  );
}
