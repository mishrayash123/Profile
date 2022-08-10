import { React, useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import { auth } from "./firebase-config";



function Home() {
  
    const [user, setuser] = useState([]);
    

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
        setuser(user);
        } else {
         
         setuser("");
        }
      });
      
    }, [auth.currentUser]);


      

  
    


  return (
    <div class="card mt-56 w-25 mx-auto bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 ">
  <img   src={user.photoURL} class="card-img-top w-50 mx-auto p-1 rounded-circle" alt="..." />
  <div class="card-body">
    <h5 class="card-title text-center text-white">{user.displayName}</h5>
  </div>
</div>
   
  );
}

export default Home;