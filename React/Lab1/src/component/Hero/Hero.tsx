import React, { Component } from "react";
import "./Hero.css";
import profileImg from "../../assets/porflio.webp";
export class Hero extends Component {
  render() {
    return (
      <section className="hero">
        <div className="info">
          <h1>Zainab Hilal</h1>
          <p>FrontEnd Developer</p>
          <button className="btn-contact">Contact Me</button>
        </div>

        <div className="image-container">
          <img src={profileImg} alt="Zainab Hilal" />
        </div>
      </section>
    );
  }
}

export default Hero;
