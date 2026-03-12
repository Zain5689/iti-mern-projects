import { Component } from "react";
import Header from "./component/Header/Header";
import Hero from "./component/Hero/Hero";
import About from "./component/About/About";
import Skills from "./component/Skills/Skills";
import Portfolio from "./component/Portfolio/Portfolio";
import Footer from "./component/Footer/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Footer />
      </div>
    );
  }
}

export default App;
