import './App.css';
import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup"
import Edit from "./components/Edit"
import { onAuthStateChanged } from "firebase/auth";
import { auth} from "./components/firebase-config";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [ypt, setypt] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        setypt(true);
      } else {
        
        setypt(false);
      }
    });
  }, [auth.currentUser]);


  return (
   <BrowserRouter>
    <Navbar />
        <Routes>
        <Route path="/login" element={<div>
                <Login />
            </div>} />
            <Route path="/edit" element={<div>
                <Edit/>
            </div>} />
            <Route path="/"  element={
               <> { ypt ? 
                <div> <Home />
                </div> : <div>
                <Login />
               
                </div>
            } </>     
              } />
         <Route path="/signup" element={
        <div>
        <Signup />
        
                </div>
        } />
        </Routes>
        <Footer />
        </BrowserRouter>
  );
}

export default App;
