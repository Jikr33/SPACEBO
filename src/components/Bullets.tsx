import React, { useEffect } from 'react'
import { BulletsProps } from '../types';

const Bullets: React.FC<BulletsProps> = ({ bullets, setBullets, enemies, play }) => {

   // const [bulletSize, setBulletSize] = useState({ w: parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.8, h: parseFloat(getComputedStyle(document.documentElement).fontSize) * 2 })

   // useEffect(() => {
   //    let lastUpdateTimestamp = performance.now()
   //    let enemies2: Enemye[] = enemies
   //    if (play && (bullets.length !== 0) && (enemies2.length !== 0)) {
   //       console.log(play, bullets, enemies2)
   //       const updateBullets = (timestamp: number) => {
   //          const deltaTime = timestamp - lastUpdateTimestamp
   //          if (deltaTime >= 50) {
   //             setBullets((prevBullets) => prevBullets.filter((bullet) => !checkBulletEnemyCollision(bullet, enemies2)))
   //             // console.log('checked')
   //             lastUpdateTimestamp = timestamp;
   //          }
   //          requestAnimationFrame(updateBullets);
   //       }
   //       requestAnimationFrame(updateBullets);
   //    }

   // }, [enemies])

   useEffect(() => {
      let lastUpdateTimestamp = performance.now();

      const updateBullets = (timestamp: number) => {
         const deltaTime = timestamp - lastUpdateTimestamp;

         if (deltaTime >= 15) {
            setBullets((prevBullets) =>
               prevBullets
                  .map((bullet) => ({
                     ...bullet,
                     position: {
                        x: bullet.position.x,
                        y: bullet.position.y - 2 * (deltaTime / 15),
                     },
                  }))
                  .filter((bullet) => bullet.position.y >= 0)
               // .filter((bullet) => !checkBulletEnemyCollision(bullet, enemies))
            );

            lastUpdateTimestamp = timestamp;
         }
         requestAnimationFrame(updateBullets);
      };
      requestAnimationFrame(updateBullets);

   }, []);

   // const checkBulletEnemyCollision = (bullet: Bulletye, enemiess: Enemye[]): boolean => {
   //    if (enemiess) {
   //       for (const enemy of enemiess) {
   //          if (
   //             bullet.position.x + bulletSize.w * 0.6 > enemy.position.x && bullet.position.x < enemy.position.x + (enemy.size.w * 0.85) && bullet.position.y < enemy.position.y + enemy.size.h && bullet.position.y + bulletSize.h > enemy.position.y
   //          ) {
   //             // Collision detected
   //             // Handle collision logic here, such as removing the enemy or reducing its health
   //             console.log('bullet collided', 'enemy->', enemy.id, enemiess.map((x) => x.id == enemy.id ? 'its collided' : null))
   //             return true;

   //          }
   //       }
   //    }
   //    return false;
   // };


   return (
      <div className='h-screen w-screen fixed top-0 left-0'>
         {bullets.map((bullet) => (
            // <Bullet
            //    key={bullet.id}
            //    topY={bullet.position.y}
            //    leftX={bullet.position.x}
            //    idB={bullet.id}
            // ></Bullet>
            <div id={bullet.id} key={bullet.id} style={{
               position: 'absolute',
               top: bullet.position.y,
               left: bullet.position.x,
            }} className='bullet'></div>
         ))}
         {/* <div id={'hgj'} key={'gjygj'} style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
         }} className='bullet'></div> */}
      </div>
   )

}

export default Bullets