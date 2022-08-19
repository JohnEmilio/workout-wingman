import Exercises from "./components/Exercise"
import Header from "./components/Header"
import Login from "./components/Login"
import Home from "./components/Home"
import Profile from "./components/Profile"
import Edit from "./components/Edit"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<Profile />} />
        <Route path="/user/create" element={<Exercises />} />
        <Route path="/user/log/edit" element={<Edit />} />
      </Routes>
    </Router>
  );
}