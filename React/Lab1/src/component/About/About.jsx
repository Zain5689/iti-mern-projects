import React, { Component } from "react";
import "./About.css";

export class About extends Component {
  render() {
    return (
      <>
        <div className="about">
          <div className="title">About Me</div>
          <div className="inf">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
              sint praesentium explicabo minus architecto cum cumque laboriosam
              hic iure fugiat! Voluptatem quo consequatur tempore est beatae ea
              voluptates magnam dolorem. Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Magnam culpa illum distinctio harum aut maiores
              architecto? A voluptas unde neque impedit officia, quas magni
              dolor libero aspernatur itaque molestiae corporis.
            </p>

            <button>Download Resume</button>
          </div>
        </div>
      </>
    );
  }
}

export default About;
