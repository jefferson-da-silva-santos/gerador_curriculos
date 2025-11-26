// App.js
import React from "react";
import CurriculumEditor from "./components/CurriculumEditor";
import ThemeProvider from "./provider";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <CurriculumEditor />
      </ThemeProvider>
    </div>
  );
}

export default App;
