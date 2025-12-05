// App.js
import React from "react";
import CurriculumEditor from "./components/CurriculumEditor";
import ThemeProvider from "./provider/ThemeProvider";
import FontProvider from "./provider/FontProvider";
// import "boxicons/css/boxicons.min.css";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <FontProvider>
          <CurriculumEditor />
        </FontProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
