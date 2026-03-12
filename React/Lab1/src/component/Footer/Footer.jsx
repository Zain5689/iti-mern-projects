import React, { Component } from "react";
import { Facebook, Linkedin, Mail, Phone, Twitch } from "lucide-react";
import "./Footer.css";
export class Footer extends Component {
  render() {
    return (
      <>
        <div className="footer">
          <div className="personalInfo">
            <h3>GET IN TOUCH</h3>
            <div className="email">
              <Mail size={20} />
              <a>example@email.com</a>
            </div>
            <div className="phone">
              <Phone size={20} />
              <a>01125938547</a>
            </div>
          </div>
          <div className="contactInfo">
            <button>Contact Me</button>
          </div>
          <div className="socialInfo">
            <div className="icons">
              <Linkedin size={20} />
              <Facebook size={20} />
              <Twitch size={20} />
            </div>
            <p>copyright@2026</p>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
