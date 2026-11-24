import "./About.css";
import authorAvatar from "../../assets/author-avatar.jpg";

function About() {
  return (
    <section className="about">
      <img src={authorAvatar} alt="Author portrait" className="about__avatar" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__paragraph">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className="about__paragraph">
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;
