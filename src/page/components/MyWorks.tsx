import { Section } from "./Section";
import projectsJson from "../../assets/json/projects.json";
import { Images } from "./Images";

export function MyWorks() {
  const { projects } = projectsJson;
  return (
    <Section side="right" sectionClass="works">
      <Section.Intro number={2}>My Works</Section.Intro>
      <Section.Detail>
        {projects.map((project) => {
          return (
            <div className="project">
              <div className="texts-container">
                <h3 className="section-heading">{project.title}</h3>
                <p className="section-text">{project.description}</p>
                <div className="links">
                  {project.links.map((link) => {
                    return (
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.title}
                      </a>
                    );
                  })}
                </div>
              </div>
              <Images images={project.images} />
            </div>
          );
        })}
      </Section.Detail>
    </Section>
  );
}
