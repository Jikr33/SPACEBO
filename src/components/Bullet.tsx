import React, { Component } from 'react'
import { bulletProps } from '../types'

const Bullet: React.FC<bulletProps> = (props) => {
   const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
   return (
      <div id={props.idB} style={{
         position: 'absolute',
         top: props.topY,
         left: props.leftX,
      }} className='bullet'></div>
   )

}

export default Bullet