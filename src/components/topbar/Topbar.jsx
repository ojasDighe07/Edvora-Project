import React from 'react'
import "./topbar.css"
const Topbar = ({user}) => {
   
  return (
      <div className="container">
          <div className="edvora">Edvora</div>
          <div className="user">
              <div className="userName">{user.name}</div>
              <img src={user.url} alt="" className="userImage" />
          </div>
      </div>
  )
}

export default Topbar
