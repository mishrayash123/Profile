import React from "react";
import {useState} from "react";
import {Link} from 'react-router-dom'
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from './firebase-config';
import '../CSS/signup.css';

export default function Signup() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [sy, setsy] = useState("");

    const signup = async (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, Email, Password).then((userCredential) => { // Signed in
            const user = userCredential.user;
            alert("user signed up successfully")
        }).catch((error) => {
            const errorCode = error.code;
            setsy(errorCode);
        });
    };

    return (
        <div className="card11 mt-44 mx-auto bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border border-dark rounded  ">
            <form onSubmit={signup}
                className="mt-3 ">
                <h5 className="text-center m-3 text-white ">Sign up</h5>
                <div className="m-3">
                    <label className="form-label text-white">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        onChange={
                            (e) => {
                                setEmail(e.target.value);
                            }
                        }/>
                </div>
            <div className="m-3">
                <label className="form-label text-white">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                    onChange={
                        (e) => {
                            setPassword(e.target.value);
                        }
                    }/>
            </div>
        <p className="m-3 text-warning">
            {sy} </p>
        <p className="m-3 text-white">If you have an account :
            <Link to="/login" className="nav-link text-warning">Log in</Link>
        </p>
        <button type="submit" className="btn btn-dark m-3 hover:bg-black "
            onClick={signup}>Sign up</button>
    </form>
</div>
    );
}
