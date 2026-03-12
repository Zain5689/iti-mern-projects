import React, { Component } from "react";
import { Facebook, Linkedin, Mail, Phone, Twitch } from "lucide-react";
export class Footer extends Component {
  render() {
    return (
      <>
        <div className="footer">
          <div className="personalInfo">
            <h3>GET IN TOUCH</h3>
            <div className="email">
              <Mail />
              <a>example@email.com</a>
            </div>
            <div className="phone">
              <Phone />
              <a>01125938547</a>
            </div>
          </div>
          <div className="contactInfo">
            <button>Contact Me</button>
          </div>
          <div className="socialInfo">
            <div className="icons">
              <Linkedin />
              <Facebook />
              <Twitch />
            </div>
            <p>copyright@2026</p>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
