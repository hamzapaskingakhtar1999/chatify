import React from 'react'
import { useState } from 'react';

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc,setDoc} from "firebase/firestore"


import { auth,storage,db } from '../firebase';

import ADDAVATAR from "../img/Add Avatar.png"
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const [err,setErr] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0]


try {
  const res = await createUserWithEmailAndPassword(auth, email, password)

const storageRef = ref(storage, 'images/rivers.jpg');

const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
    setErr(true)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
      await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL
      });
      await setDoc(doc(db,"users",res.user.uid), {
        uid:res.user.uid,
        displayName,
        email,
        photoURL:downloadURL,
    });

    await setDoc (doc(db,"userChats",res.user.uid), {});
    navigate("/");
  }
);


})
}
catch(err)
{
    setErr(true)
}


  
  }

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chatify</span>
            <span className='title'>Register</span>
            <form onSubmit={ handleSubmit}>
                <input type='text' placeholder='Name'>
                
                </input>

                <input type='email' placeholder='Email'>
                
                </input>

                <input type='password' placeholder='Password'>
                
                </input>
     
                <input type='file' id="file" style={{display:"none"}}></input>

                <label htmlFor='file' >
                    <img  src={ADDAVATAR} alt="" style={{width:"32px"}}/>
                    <span>Add an Avatar</span>
                </label>

                <button>Sign Up</button>
                {err && <span>Something went wrong.</span>}
            </form>
            <p>Have an account? <Link to="/login">Login</Link> Instead.</p>
        </div>
    </div>
  )
}

export default Register