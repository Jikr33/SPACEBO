export interface HeroProps {
  heroHeight: number;
  heroWidth: number;
  play: boolean;
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
  size: { w: number; h: number };
}

export interface EnemiesProps {
  play: Boolean;
  heroHeight: number;
  enemies: Enemye[];
  setEnemies: React.Dispatch<React.SetStateAction<Enemye[]>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  isMobile: boolean;
  life: number;
  setLife: React.Dispatch<React.SetStateAction<number>>;
}
export interface BulletsProps {
  bullets: Bulletye[];
  setBullets: React.Dispatch<React.SetStateAction<Bulletye[]>>;
  enemies: Enemye[];
  play: boolean;
}
export interface bulletProps {
  topY: number;
  leftX: number;
  idB: string;
}

export interface controllerProps {
  play: boolean;
  setjoyStickMoving: React.Dispatch<React.SetStateAction<boolean>>;
  setmoveRate: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  position: { x: number; y: number };
  joystickMoving: boolean;
  moveRate: { x: number; y: number };
}

export interface DesktopProps {
  position: { x: number; y: number };
  speed: number;
  heroSize: { w: number; h: number };
  shoot: Function;
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  play: boolean;
  paused: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
  ended: boolean;
}
export interface MobileProps {
  heroSize: { w: number; h: number };
  play: boolean;
  position: { x: number; y: number };
  shoot: Function;
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setShooting: React.Dispatch<React.SetStateAction<boolean>>;
  shooting: Boolean;
}
