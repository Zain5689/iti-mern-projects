import React, { Component } from "react";
import "./Skills.css";
export class Skills extends Component {
  data = [
    {
      title: "Html",
      percentage: "90%",
    },
    {
      title: "css",
      percentage: "70%",
    },
    {
      title: "JS",
      percentage: "50%",
    },
    {
      title: "React",
      percentage: "80%",
    },
    {
      title: "Figma",
      percentage: "30%",
    },
    {
      title: "Angular",
      percentage: "65%",
    },
  ];
  render() {
    return (
      <>
        <div className="skills">
          <h2>My Skills</h2>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            eligendi vitae voluptatibus nulla consequatur reiciendis non ab
            soluta accusamus. Provident odio aliquam recusandae consequuntur
            inventore magnam delectus? Sint, nobis magnam?
          </p>
          <div className="skillsContain">
            <div className="left">
              <h3>My Focus</h3>
              <ul>
                <li>Ui/Ux design</li>
                <li>Frontend </li>
                <li>Backend</li>
              </ul>
            </div>
            <div className="skillBar">
              {" "}
              {this.data.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-info">
                    <span>{skill.title}</span>
                    <span className="percentage">{skill.percentage}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: skill.percentage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Skills;
