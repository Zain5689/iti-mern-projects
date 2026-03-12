import { Component } from "react";

import "./Header.css";
export class Header extends Component {
  render() {
    return (
      <>
        <div className="container">
          <div>
            <h2>Zainab</h2>
          </div>
          <ul>
            <li>
              <a className="active">Home</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Skills</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Header;
