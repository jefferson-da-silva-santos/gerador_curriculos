import CurriculumEditor from "./components/CurriculumEditor";
import ThemeProvider from "./provider/ThemeProvider";
import FontProvider from "./provider/FontProvider";

function App() {
  return (
    <div className="App">
      <FontProvider>
        <ThemeProvider>
          <CurriculumEditor />
        </ThemeProvider>
      </FontProvider>
    </div>
  );
}
export default App;
