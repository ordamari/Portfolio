import { Section } from "./Section";

export function ContactMe() {
  return (
    <Section side="left" sectionClass="contact">
      <Section.Intro number={2}>Contact Me</Section.Intro>
      <Section.Detail>
        <h3 className="section-heading">Lorem ipsum</h3>
        <p className="section-text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
          quaerat expedita porro nisi magni inventore voluptatibus tempora.
          Vitae, modi dolore. Iusto, veritatis perferendis. Pariatur fugit
          tempora non! Ducimus, quam commodi?
        </p>
        <h3 className="section-heading">Lorem ipsum</h3>
        <p className="section-text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
          quaerat expedita porro nisi magni inventore voluptatibus tempora.
          Vitae, modi dolore. Iusto, veritatis perferendis. Pariatur fugit
          tempora non! Ducimus, quam commodi?
        </p>
        <h3 className="section-heading">Lorem ipsum</h3>
        <p className="section-text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
          quaerat expedita porro nisi magni inventore voluptatibus tempora.
          Vitae, modi dolore. Iusto, veritatis perferendis. Pariatur fugit
          tempora non! Ducimus, quam commodi?
        </p>
      </Section.Detail>
    </Section>
  );
}
