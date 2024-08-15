import React from 'react'
import './landing.css'
import Navbar from '../Navbar/Navbar'

const Landing = () => {
  return (
    <div>
        <Navbar/>

    <div className='landinPage'>
        <div className='landingDiv'>
            <p className='landingParagraph'>All team discussions, in one room</p>
            <h3>Great software that allows you to communicate from anywhere at anytime</h3>
            <button className='landingBtn'> <a href='/lists'>See more</a></button>
        </div>
        <div className='imgDiv'>   
         <div className='landingImg'></div>
</div>
    </div>
    </div>
  )
}

export default Landing