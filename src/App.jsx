import { Routes, Route } from "react-router-dom";
import CurriculumEntry from "./components/CurriculumEntry";
import ThemeProvider from "./provider/ThemeProvider";
import FontProvider from "./provider/FontProvider";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/loading" element={<LandingPage />} />
      <Route
        path="/editor"
        element={
          <div className="App">
            <FontProvider>
              <ThemeProvider>
                <CurriculumEntry />
              </ThemeProvider>
            </FontProvider>
          </div>
        }
      />
    </Routes>
  );
}
export default App;
