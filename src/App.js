import "./App.css";
import Aside from "./components/Aside/Aside";
import MyRoutes from "./components/MyRoutes";
import NavBar from "./components/NavBar/NavBar";
import logo from "./logo.png";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="grid-col-2--20-80">
        <Aside />
        <MyRoutes />
      </div>
    </div>
  );
}

export default App;
