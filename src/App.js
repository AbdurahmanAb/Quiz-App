import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./components/Home"
import Instructions from "./components/Instructions";
import Quizpage from "./components/Quizpage";
import Result from "./components/Result";
function App() {
  return (
   <Router>
   <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/play/instruction" exact element={<Instructions/>} />
       <Route path="/play/quiz" exact element={<Quizpage/>} />
       <Route path="/play/result" exact element={<Result/>} />
    </Routes>
   </Router>
  );
}

export default App;
