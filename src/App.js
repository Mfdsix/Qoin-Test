import logo from "./logo.svg";
import "./App.css";
import MainNavbar from "./components/MainNavbar";

import HomeScreen from "./screens/Home";
import GenreScreen from "./screens/Genre";
import MovieScreen from "./screens/Movie";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <MainNavbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/genre" element={<GenreScreen />} />
          <Route path="/movie" element={<MovieScreen />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
