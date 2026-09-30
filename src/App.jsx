import { useEffect, useState } from "react";

// Filled in when the site is built (vite.config.js): GitHub Actions sets both,
// a codespace sets the repository. Empty when not known.
const repo = __REPO__;
const commit = __COMMIT__;

/** Whose site this is: the GitHub account that owns the repository. */
const owner = repo.split("/")[0] || "";

const ROLES = ["Cloud engineer", "Web developer", "Problem solver", "Lifelong learner"];

const SKILLS = ["JavaScript", "React", "Git & GitHub", "AWS", "Linux", "CI/CD", "HTML & CSS", "Node.js"];

const PROJECTS = [
  {
    title: "This website",
    text: "Designed, built and put online by me — every change I push goes live on its own.",
    tag: "Live",
  },
  {
    title: "Something new",
    text: "My next project is on the way. Check back soon.",
    tag: "Soon",
  },
  {
    title: "Open source",
    text: "What I'm building and learning, in the open.",
    tag: "GitHub",
    link: owner ? `https://github.com/${owner}` : null,
  },
];

/** The role line, typed out and erased one after another. */
function useTyped(words) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return undefined;
    }
    const word = words[index % words.length];
    const done = !erasing && text === word;
    const empty = erasing && text === "";
    const delay = done ? 1600 : empty ? 300 : erasing ? 45 : 85;

    const timer = setTimeout(() => {
      if (done) setErasing(true);
      else if (empty) {
        setErasing(false);
        setIndex((i) => i + 1);
      } else setText(erasing ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [text, erasing, index, words]);

  return text;
}

function Avatar() {
  const [failed, setFailed] = useState(false);
  const initial = (owner || "Y").slice(0, 1).toUpperCase();

  return (
    <div className="avatar">
      <span className="avatar-ring" aria-hidden />
      {owner && !failed ? (
        <img src={`https://github.com/${owner}.png?size=240`} alt="" onError={() => setFailed(true)} />
      ) : (
        <span className="avatar-initial" aria-hidden>
          {initial}
        </span>
      )}
    </div>
  );
}

export default function App() {
  const role = useTyped(ROLES);

  useEffect(() => {
    if (owner) document.title = `${owner} — portfolio`;
  }, []);

  const name = owner || "a cloud builder";
  const year = new Date().getFullYear();

  return (
    <div className="site">
      <div className="blobs" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <nav className="nav">
        <a className="logo" href="#top">
          {owner ? owner : "portfolio"}
          <span>.</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <p className="hello">
              <span className="wave" aria-hidden>
                👋
              </span>{" "}
              Hello, world
            </p>
            <h1>
              I'm <span className="name">{name}</span>
            </h1>
            <p className="role" aria-label={ROLES.join(", ")}>
              <span aria-hidden>{role}</span>
              <span className="caret" aria-hidden />
            </p>
            <p className="intro">
              I build things for the web and the cloud — and I ship them. This is my corner of the internet.
            </p>
            <div className="actions">
              <a className="button primary" href="#work">
                See my work
              </a>
              <a className="button" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
          <Avatar />
        </section>

        <section id="about" className="section reveal">
          <h2>About me</h2>
          <p className="lead">
            I learn by building. Every project here started as something I didn't know how to do yet — and ended up
            live on the internet, with my name on it.
          </p>
          <ul className="skills" aria-label="Skills">
            {SKILLS.map((skill, i) => (
              <li key={skill} style={{ "--i": i }}>
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section id="work" className="section reveal">
          <h2>Things I've made</h2>
          <div className="projects">
            {PROJECTS.map((project, i) => {
              const body = (
                <>
                  <span className="project-tag">{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                </>
              );
              return project.link ? (
                <a key={project.title} className="project" href={project.link} style={{ "--i": i }}>
                  {body}
                  <span className="project-arrow" aria-hidden>
                    →
                  </span>
                </a>
              ) : (
                <article key={project.title} className="project" style={{ "--i": i }}>
                  {body}
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="section contact reveal">
          <h2>Let's build something</h2>
          <p className="lead">Have an idea, a question, or an opportunity? I'd love to hear from you.</p>
          {owner ? (
            <a className="button primary" href={`https://github.com/${owner}`}>
              Find me on GitHub
            </a>
          ) : null}
        </section>
      </main>

      <footer className="footer">
        <span>
          © {year} {owner || "Me"}
        </span>
        <span>
          Built with React{commit ? (
            <>
              {" "}
              · commit <code>{commit}</code>
            </>
          ) : null}
        </span>
      </footer>
    </div>
  );
}
