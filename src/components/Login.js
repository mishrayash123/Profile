import React from "react";
import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from './firebase-config';



export default function Login() {
    const [LoginEmail, setaLoginEmail] = useState("");
    const [LoginPassword, setLoginPassword] = useState("");
    const [sk, setsk] = useState("");
    const nav = useNavigate();


    const login = async (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, LoginEmail, LoginPassword).then((userCredential) => { // Signed in
            const user = userCredential.user;
            alert("user signed in successfully")
            nav("/");
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            setsk(errorCode);
        });
        
    };

    return (
        <div className="mt-56 w-50 mx-auto bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border border-dark rounded  ">
        
            <form onSubmit={login}
                className="mt-3 ">
                <h5 className="text-center m-3 text-white">Log in</h5>
               
                <div className="m-3">
                    <label className="form-label text-white">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        onChange={
                            (e) => {
                                setaLoginEmail(e.target.value);
                            }
                        }/>
                </div>
            <div className="m-3">
                <label className="form-label text-white">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                    onChange={
                        (e) => {
                            setLoginPassword(e.target.value);
                        }
                    }/>
            </div>
            
        <p className="m-3 text-warning">
            {sk} </p>
        <p className="m-3 text-white">If you don't have an account :
            <Link to="/signup" className="nav-link text-warning">Sign up</Link>
        </p>
        <button type="submit" className="btn btn-dark m-3 hover:bg-black"
            onClick={login}>Log in</button>
    </form>
    
</div>
    );
}