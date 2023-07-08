export interface HeroProps {
   heroHeight: number;
   heroWidth: number;
   play: boolean
}
export interface Bulletye {
   id: string;
   position: { x: number; y: number };
}
export interface Enemye {
   id: string;
   position: { x: number; y: number };
   speed: number;
   health: number;
   power: number;
   size: { w: number; h: number }
}

export interface EnemiesProps {
   play: Boolean;
   heroHeight: number;
   enemies: Enemye[];
   setEnemies: React.Dispatch<React.SetStateAction<Enemye[]>>;
   setScore: React.Dispatch<React.SetStateAction<number>>;
   score: number
}
export interface BulletsProps {
   bullets: Bulletye[];
   setBullets: React.Dispatch<React.SetStateAction<Bulletye[]>>;
   enemies: Enemye[];
   play: boolean
}
export interface bulletProps {
   topY: number,
   leftX: number,
   idB: string
}