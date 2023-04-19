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
        <div className="socials">
          {socials.map((social) => {
            return (
              <li key={social.href}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  <Icon icon={social.icon as IconOptions} />
                </a>
              </li>
            );
          })}
        </div>
      </Section.Detail>
    </Section>
  );
}
