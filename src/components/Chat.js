import React from 'react'
import CAM from "../img/Cam.png"
import ADD from "../img/Add.png"
import MORE from "../img/More.png"
import Messages from './Messages'
import Input from "./Input"

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>Malik</span>
        <div className='chatIcons'>
          <img src={CAM} alt=""/>
          <img src={ADD} alt=""/>
          <img src={MORE} alt=""/>

        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat