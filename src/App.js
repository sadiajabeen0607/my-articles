import Main from "./components/Main";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Article from "./components/Article";

function App() {
  return (
    <div className="w-screen h-auto bg-primary flex flex-col">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/article/:id" element={<Article />} />
          <Route
            path="/"
            element={
              <div className="mt-14 md:mt-20">
                <Main />
              </div>
            }
          />
        </Routes>
        <Header />
      </Router>
    </div>
  );
}

export default App;
