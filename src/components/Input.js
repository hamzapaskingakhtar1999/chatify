import React from 'react'
import ADD from "../img/Add Image.png"
import ATTACH from "../img/Attach.png"

const Input = () => {
  return (
    <div className='input'>
      <input type='text' placeholder='Enter message..'/>
      <div className='send'>
        <img src={ATTACH} alt=""/>
        <input type='file' style={{display:"none"}} id='file'/>
        <label htmlFor='file'>
          <img src={ADD} alt=""/>
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input