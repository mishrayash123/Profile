import React,{useEffect,useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import { storage } from "./firebase-config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, updateProfile } from "firebase/auth";
import '../CSS/Edit.css';






export default function Edit() {
    const [LoginName, setaLoginName] = useState("");
    const [Image, setImage] = useState(null);
    const [url, seturl] = useState("");
    const [uid, setuid] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            
          setuid(user.uid);
          } else {
           
           setuid("");
          }
        });
        
      }, [auth.currentUser]);

      
     const NameChange = () =>{
        updateProfile(auth.currentUser, {
            displayName: LoginName, photoURL: url
          }).then(() => {
           alert("updated");
           nav("/");
          }).catch((error) => {
            
          });
     }
  


    const Update = async (event) => {
        const imageRef = ref(storage, "image");
        if(Image){
        uploadBytes(imageRef, Image).then(() => {
            getDownloadURL(imageRef).then((url) => {
                seturl(url);
                alert("Image Uploaded")
            })
            .catch((error) => {
                console.log(error.message, "error geting the image url");
            })
            setImage(null);
        })
        .catch((error) => {
            console.log(error.message);
        })
    }
   
  
    };

   

    return (
        <div className="card23 mt-56  mx-auto bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border border-dark rounded  ">

           
                
                <h5 className="text-center m-3 text-white">Edit</h5>

                <div className="m-3">
                    <label className="form-label text-white">Name</label>
                    <input type="text" className="form-control"
                        onChange={
                            (e) => {
                                setaLoginName(e.target.value);
                            }
                        }/>
                         
                </div>

                 

            <div className="m-3 ">
                
               
                    <input type="file"  onChange={(e) => {
                        if(e.target.files[0]){
                        setImage(e.target.files[0])}}
                    }/>
                    <button type="submit" className="btn btn-dark mt-2 hover:bg-black "
                onClick={Update}>Upload</button>
               
                
            </div>
            
            <button type="submit" className="btn btn-dark m-3 hover:bg-black " onClick={NameChange}
                >Submit</button>
      

    </div>
    );
}
