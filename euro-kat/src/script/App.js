import '../style/App.css';
import React, { useState } from "react";

import StartPage from './StartPage';
import Navigator from './Navigator';
import Releases from './Releases';


function App() {

  const [currentSection, setCurrentSection] = useState("home");

  const handleSelectSection = (section) => {
    setCurrentSection(section);
  };

  const renderComponent = () => {
    if (currentSection === "home") {
      return <StartPage />;
    } else if (currentSection === "releases") {
      return <Releases />;
    } else {
      return null;
    }
  };

  return (
    <div>
      <Navigator onSelectSection={handleSelectSection} />
      {renderComponent()}
    </div>
  );
}

export default App;