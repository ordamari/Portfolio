import { Section } from "./Section";

export function MyWorks() {
  return (
    <Section side="right" sectionClass="works">
      <Section.Intro number={2}>My Works</Section.Intro>
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
