import React, { Component } from 'react'

interface Enemye {
   id: string;
   position: { x: number; y: number };
   speed: number;
   health: number;
   power: number;
}
interface EnemyProps {
   enemy: Enemye
}
const Enemy: React.FC<EnemyProps> = (props) => {
   return (
      <div className={`enemy enemy${props.enemy.power}`} style={{
         left: props.enemy.position.x,
         top: props.enemy.position.y
      }}></div>
   )

}

export default Enemy