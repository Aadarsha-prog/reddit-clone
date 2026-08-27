import { Button } from "./components/ui/button";
import Typography from "./components/ui/typogrpahy";

function App() {
  function toggleTheme() {
    const body = document.body;
    if (!body) return;

    body.classList.toggle("dark");
  }
  return (
    <div className="">
      <Button onClick={toggleTheme}>Change Theme</Button>
      <Typography variant="h3">Hello there</Typography>
    </div>
  );
}

export default App;
