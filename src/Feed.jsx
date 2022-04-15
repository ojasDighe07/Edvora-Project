import React from 'react'
import Rides from './components/Rides/Rides'
import Topbar from './components/topbar/Topbar'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./feed.css"

const Feed = () => {
   const [user, setUser] = useState({});
    useEffect(() => {
       const fetchUser =async ()=> {
             const res = await axios.get("https://assessment.api.vweb.app/user");
             setUser(res.data);
             console.log(user)
         }
      fetchUser();
    },[])
    return (
      <>
        <div className="topbarContainer"><Topbar user={user}/></div>
        <div className="ridesContainer"><Rides user={user}/></div>
      </>
  )
}

export default Feed