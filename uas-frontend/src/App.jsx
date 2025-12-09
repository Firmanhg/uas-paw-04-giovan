import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
