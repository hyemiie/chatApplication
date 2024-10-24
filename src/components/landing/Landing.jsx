import React from 'react'
import './landing.css'
import Navbar from '../Navbar/Navbar'

const Landing = () => {
  return (
    <div className='landingBody'>
    <div>
        <Navbar/>
</div>
    <div className='landinPage'>
        <div className='landingDiv'>
            <p className='landingParagraph'>All team discussions<h2>in one room</h2></p>
            <h3>Accessible and allows you to communicate from anywhere at anytime</h3>
            <button className='landingBtn'> <a href='/lists'>See more</a></button>

            

        </div>
        {/* <div className='imgDiv'>   
         <div className='landingImg'></div>
</div> */}
    </div>
    </div>
  )
}

export default Landing