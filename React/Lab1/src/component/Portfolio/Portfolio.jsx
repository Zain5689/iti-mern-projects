import React, { Component } from "react";
import "./Portfolio.css";
export class Portfolio extends Component {
  data = [
    {
      title: "WEB DESIGN",
    },
    {
      title: "MOBILE DESIGN",
    },
    {
      title: "LOGO DESIGN",
    },
    {
      title: "WEB APPLICATION DEVELOPMENT ",
    },
    {
      title: "MOBILE APPLICATION DEVELOPMENT ",
    },
    {
      title: "PWA DEVELOPMENT ",
    },
  ];
  render() {
    return (
      <>
        <div className="portfolio">
          <h2>Portfolio</h2>
          <div className="contain">
            <div className="box">
              {this.data.map((port, index) => (
                <div className="port-item" key={index}>
                  <div className="port-info">
                    <span>{port.title}</span>
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

export default Portfolio;
