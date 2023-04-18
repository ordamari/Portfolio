import { Section } from "./Section";

export function About() {
  return (
    <Section side="left" sectionClass="about">
      <Section.Intro number={1}>About</Section.Intro>
      <Section.Detail>
        <p className="section-text">
          I am a results-driven Full-Stack Web Developer with a passion for
          creating cutting-edge single-page applications that deliver
          exceptional user experiences and meet complex business requirements. I
          have a strong track record of building high-performance web
          applications using Node.js (Express,Nest), React.js, Angular, Redux,
          and RXJS. As a collaborative team player, I have worked closely with
          designers and project managers to deliver successful web projects on
          time and on budget. I am a hard worker who is focused on problem
          solving and attention to detail. I am also a self-learner who is quick
          to adapt to new environments. I am driven by the opportunity to tackle
          challenging problems and to continually learn and grow as a developer.
        </p>
      </Section.Detail>
    </Section>
  );
}
