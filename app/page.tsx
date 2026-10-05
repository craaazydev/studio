"use client";

import { FormEvent, useState } from "react";

const projects = [
  {
    title: "Foresta Mv food shoot",
    category: "Food Photography",
    description: "A food photo shoot for Foresta Mv, a Maldivian restaurant. The shoot was done in a natural light setting, with a focus on the textures and colors of the food.",
    image:
      "https://scontent.fmle2-2.fna.fbcdn.net/v/t39.30808-6/684306047_122097952430357395_4973968497781118572_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x853&ctp=s1280x853&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHQ3sodt0tN4LXR_4FwaUV8A9YgYrbTGvgD1iBittMa-AncnfB64cFWGbwqUkGyJp_VnAz587J_AekPEsT4YaDR&_nc_ohc=5x12EJGcPtYQ7kNvwFUAQPG&_nc_oc=Adr5aRMrBorUAFgP6623iK7OPRFULw29k-d_7GhFbqpT1wyfCvqUcfxG6qEWf6KNYRk&_nc_zt=23&_nc_ht=scontent.fmle2-2.fna&_nc_gid=95jl9acSfGcM4QysnFgFVQ&_nc_ss=7b2a8&oh=00_AQPVB0g8zDiPK6bHSGoUhBlNB-UUiIWR5DzMuWMlr-6MxQ&oe=6AC915A6",
    shape: "project-tall",
  },
  {
    title: "Victory Day Shoot for the victory day celebration in Maldives",
    category: "Passion Project",
    description: "A photo shoot for the victory day celebration in Maldives. The shoot was done in a natural light setting, with a focus on the textures and colors of the event.",
    image:
      "https://scontent.fmle2-2.fna.fbcdn.net/v/t39.30808-6/778869746_2142904846655247_9080108135552936847_n.jpg?stp=dst-jpg_tt6&cstp=mx1249x848&ctp=s1249x848&_nc_cat=104&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGGRGrbimDAFzhX7nIKSoqVMNLfAcmbOAEw0t8ByZs4ATXwxbtMoAknt3AaamrbKmJCE5t0RtJMXzjCb2D9GC1p&_nc_ohc=jjbPliIZ1oUQ7kNvwHwXacF&_nc_oc=AdqBSQcxeeKQ4aqvqSvz4VK4m0Cyg3e3xKSG1cDw6IgEOz9u00Y-UQ-9Sx1TBJVkHps&_nc_zt=23&_nc_ht=scontent.fmle2-2.fna&_nc_gid=BMCrUazXWMM26gGUjsc8rw&_nc_ss=7b2a8&oh=00_AQMZK0-U2B4FKh6_Zw95DooZHvlds46JMMhwXF_ir136aw&oe=6AC91717",
    shape: "project-short",
  },
  {
    title: "subcontinental kitchen  food shoot",
    category: "Client work - food photography",
    description: "A food photo shoot for subcontinental kitchen, a Maldivian restaurant. The shoot was done in a natural light setting, with a focus on the textures and colors of the food.",
    image:
      "https://scontent.fmle2-2.fna.fbcdn.net/v/t39.30808-6/832634177_122113258742357395_8369847566559283695_n.jpg?stp=dst-jpg_tt6&cstp=mx1360x2048&ctp=s1360x2048&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_ohc=scDnDYu0-tYQ7kNvwG3PbKg&_nc_oc=AdpxJJmzOky6MJi23FGnY2aTjen_C0kaIx9rzRv8KEmBTL0_amOlf2rgrs4TFcIC7Yc&_nc_zt=23&_nc_ht=scontent.fmle2-2.fna&_nc_gid=_w2ZiwC-4QNmPNefd5-46Q&_nc_ss=7b2a8&oh=00_AQPtZ1Qo2FrcCX94AkvgnhBr4VUDwkFk5dYr9ut5C31PyQ&oe=6AC8FAA3",
    shape: "project-short",
  },
  {
    title: "Foresta Mv food shoot",
    category: "Food Photography",
    description: "A food photo shoot for Foresta Mv, a Maldivian restaurant. The shoot was done in a natural light setting, with a focus on the textures and colors of the food.",
    image:
      "https://scontent.fmle2-2.fna.fbcdn.net/v/t39.30808-6/690616871_122100506708357395_8663510026558341312_n.jpg?stp=dst-jpg_tt6&cstp=mx853x1280&ctp=s853x1280&_nc_cat=111&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=4be1OXbR1EUQ7kNvwGr8qOI&_nc_oc=Adqh1TT-ZgnbAqKPRlg9NEqKW0TLwH5Pbu7vAtJFMhtm4kZz_Gt6N4m0V6hH0WqGzAc&_nc_zt=23&_nc_ht=scontent.fmle2-2.fna&_nc_gid=cn2CG0702L3RIfiMqYmv4Q&_nc_ss=7b2a8&oh=00_AQNKry0wAU4EciNSWOICGp_0WF9ylvZkl3iEhTIos8D7aA&oe=6AC90651",
    shape: "project-tall",
  },
];

const filters = ["All work", "Campaign", "Lifestyle"];
const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Rates", "#rates"],
  ["Portfolio", "#portfolio"],
  ["Print shop", "/prints"],
  ["Contact", "#contact"],
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const filteredProjects =
    activeFilter === "All work"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const project = String(formData.get("project"));
    const subject = encodeURIComponent(`Collaboration inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Maya,\n\n${project}\n\nYou can reach me at ${email}.`,
    );
    setFormMessage("Your email app is opening with your note ready to send.");
    window.location.href = `mailto:artbyrayz@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <main>
      <header className="site-header">
        <a
          className="wordmark"
          href="#home"
          aria-label="Maya Bennett, back to home"
          onClick={() => setMenuOpen(false)}
        >
          CraaazyDev<span className="wordmark-dot">.</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a
              className={href === "#home" ? "nav-home" : ""}
              href={href}
              key={label}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <p className="eyebrow light-eyebrow">
            <span className="eyebrow-line" /> CREATOR, STORYTELLER & YOUR NEW
            CREATIVE PARTNER
          </p>
          <h1>
            A little
            <br />
            more <span className="serif-italic">feeling.</span>
          </h1>
          <p className="hero-intro">
            Thoughtful content for brands with
            <br className="desktop-break" /> something real to say.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#portfolio">
              Explore my work <span aria-hidden="true">↗</span>
            </a>
            <span className="hero-location">
              <span className="location-dot" /> REPUBLIC OF MALDIVES  · AVAILABLE
              WORLDWIDE
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div
            className="hero-photo"
            role="img"
            aria-label="Maya, a content creator, in a sunlit portrait"
          />
          <div className="photo-note">
            <span>MAKING THE EVERYDAY</span>
            <span className="note-script">feel like something.</span>
          </div>
          <div className="hero-sticker" aria-hidden="true">
            <span>GOOD</span>
            <span>THINGS</span>
            <span>HAPPEN</span>
            <span className="sticker-star">✳</span>
          </div>
        </div>
        <a className="scroll-cue" href="#about">
          <span>SCROLL TO FEEL SOMETHING</span>
          <span aria-hidden="true">↓</span>
        </a>
        <div className="hero-number" aria-hidden="true">
          01 / 05
        </div>
      </section>

      <section className="intro section-shell" id="about">
        <div className="intro-label">
          <span className="section-index">01 / A LITTLE ABOUT ME</span>
          <span className="blue-spark" aria-hidden="true">✳</span>
        </div>
        <div className="intro-content">
          <h2>
            Not just content.
            <br />
            <span className="serif-italic blue-italic">A point of view.</span>
          </h2>
          <div className="intro-bottom">
            <p className="intro-copy">
              I&apos;m Ryan — a Maldivian-based creator, chronic over-thinker of
              the little things, and big believer that the best stories don&apos;t
              have to shout.
            </p>
            <p className="intro-copy intro-copy-secondary">
              I partner with good people to make thoughtful, scroll-stopping
              work that feels as good as it looks. The kind that makes you pause
              for half a second longer.
            </p>
            <a className="text-link" href="#contact">
              A little more about me <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="intro-stamp" aria-hidden="true">
          <span>HERE FOR</span>
          <span>THE GOOD</span>
          <span>STUFF</span>
          <span className="stamp-star">✳</span>
        </div>
      </section>

      <section className="services section-shell" id="rates">
        <div className="section-heading">
          <div>
            <span className="section-index">02 / GOOD WORK, GOOD ENERGY</span>
            <h2>Ways we can <span className="serif-italic">make magic.</span></h2>
          </div>
          <p className="heading-aside">
            Pick a starting point. We&apos;ll make
            <br className="desktop-break" /> it our own from there.
          </p>
        </div>
        <div className="rates-grid">
          <article className="rate-card">
            <div className="rate-top">
              <span className="rate-number">01</span>
              <span className="rate-icon" aria-hidden="true">↗</span>
            </div>
            <h3>Social, in session.</h3>
            <p className="rate-description">
              A little of everything for your next big scroll-stopper.
            </p>
            <ul>
              <li>1 short-form video (15–30 sec)</li>
              <li>3 edited story frames</li>
              <li>Concept, creation & organic usage</li>
            </ul>
            <div className="rate-bottom">
              <span>STARTING AT</span>
              <strong>$850</strong>
            </div>
          </article>
          <article className="rate-card rate-card-featured">
            <div className="rate-top">
              <span className="rate-number">02</span>
              <span className="popular-tag">A CROWD FAVORITE</span>
            </div>
            <h3>The full feeling.</h3>
            <p className="rate-description">
              A fully thought-through story, from first frame to final cut.
            </p>
            <ul>
              <li>2 short-form videos (15–45 sec)</li>
              <li>5 edited lifestyle photographs</li>
              <li>Creative concept & 3-month usage</li>
            </ul>
            <div className="rate-bottom">
              <span>STARTING AT</span>
              <strong>$1,600</strong>
            </div>
          </article>
          <article className="rate-card">
            <div className="rate-top">
              <span className="rate-number">03</span>
              <span className="rate-icon" aria-hidden="true">✳</span>
            </div>
            <h3>Your kind of thing.</h3>
            <p className="rate-description">
              Got a bigger picture in mind? I&apos;m listening.
            </p>
            <ul>
              <li>Monthly content partnerships</li>
              <li>Event & on-location coverage</li>
              <li>Custom licensing & add-ons</li>
            </ul>
            <div className="rate-bottom">
              <span>LET&apos;S TALK ABOUT IT</span>
              <a href="#contact">Get a quote <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        </div>
        <p className="rates-footnote">
          Every project is a little different. Rates are a starting point and
          don&apos;t include paid usage or whitelisting.
        </p>
      </section>

      <section className="portfolio section-shell" id="portfolio">
        <div className="section-heading portfolio-heading">
          <div>
            <span className="section-index">03 / THE GOOD STUFF</span>
            <h2>Some things I&apos;ve <span className="serif-italic">made.</span></h2>
          </div>
          <p className="heading-aside">
            A few recent favorites, made
            <br className="desktop-break" /> with very good people.
          </p>
        </div>
        <div className="portfolio-toolbar">
          <span className="work-count">
            {String(filteredProjects.length).padStart(2, "0")} PROJECTS
          </span>
          <div className="filter-list" aria-label="Filter portfolio">
            {filters.map((filter) => (
              <button
                className={`filter-button${activeFilter === filter ? " is-active" : ""}`}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <article
              className={`project-card ${project.shape}`}
              key={project.title}
            >
              <div
                className="project-image"
                style={{ backgroundImage: `url("${project.image}")` }}
                role="img"
                aria-label={`${project.title} creator campaign`}
              >
                <span className="project-category">{project.category}</span>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="project-caption">
                <div>
                  <span className="project-count">
                    0{index + 1} <span>/</span> {project.category.toUpperCase()}
                  </span>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
        <a className="all-work-link" href="#contact">
          Have a good one in mind? <span>Let&apos;s make it.</span>
          <span className="all-work-arrow" aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="testimonial">
        <div className="testimonial-inner">
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>
            Maya just <span className="serif-italic">gets it.</span> The work
            felt so true to us, and our community felt that too.
          </blockquote>
          <div className="quote-attribution">
            <span className="attribution-line" />
            <span>JAMIE PARK · BRAND DIRECTOR, KINDRED</span>
          </div>
          <span className="quote-decoration" aria-hidden="true">✳</span>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-intro">
          <span className="section-index">04 / YOUR TURN</span>
          <h2>
            Got a good
            <br />
            <span className="serif-italic">feeling?</span>
          </h2>
          <p>
            Tell me what you&apos;re dreaming up. I&apos;ll bring the coffee, the
            ideas, and probably too many reference photos.
          </p>
          <a className="contact-email" href="mailto:hello@mayabennett.co">
            hello@mayabennett.co <span aria-hidden="true">↗</span>
          </a>
          <div className="social-links">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              INSTAGRAM <span aria-hidden="true">↗</span>
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
              TIKTOK <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            YOUR NAME
            <input autoComplete="name" name="name" placeholder="What should I call you?" required />
          </label>
          <label>
            YOUR EMAIL
            <input
              autoComplete="email"
              name="email"
              placeholder="you@somewhere.com"
              required
              type="email"
            />
          </label>
          <label>
            A LITTLE ABOUT THE PROJECT
            <textarea
              name="project"
              placeholder="The big idea, the tiny details, anything you like..."
              required
              rows={4}
            />
          </label>
          <button className="button button-dark" type="submit">
            Send a little note <span aria-hidden="true">↗</span>
          </button>
          <p className="form-message" aria-live="polite">{formMessage}</p>
        </form>
      </section>

      <footer className="site-footer">
        <a className="footer-wordmark" href="#home">MAYA<span>.</span></a>
        <span>MADE SLOWLY, IN BROOKLYN. © 2025 MAYA BENNETT</span>
        <a className="back-to-top" href="#home">
          BACK TO THE TOP <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </main>
  );
}
