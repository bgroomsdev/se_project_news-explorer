import "./About.css";
import authorAvatar from "../../assets/author-avatar.jpg";

function About() {
  return (
    <section className="about">
      <img src={authorAvatar} alt="Author portrait" className="about__avatar" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__paragraph">
          Hi, I&apos;m Braden Grooms, a junior full-stack developer based in San
          Antonio, Texas. Through TripleTen, I learned to build complete apps
          with React, Node, Express, and MongoDB.
        </p>
        <p className="about__paragraph">
          News Explorer puts that into practice: an app built from a Figma
          design, with routing, reusable components, and live search results
          from the News API. I also deployed my previous project, WTWR, on my
          own Google Cloud server. I&apos;m looking for a team where I can keep
          building and learning.
        </p>
      </div>
    </section>
  );
}

export default About;
