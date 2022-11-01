import { Ghosts, Pacman, PowerToken, Token } from '../Game Components';
import { Walls } from '../Layout';
import { Shape } from '../UI';

// -1 - Empty
// 0  - Pacman
// 1  - Ghost
// 2  - Token
// 3  - Power Up
// 4  - Wall

class GameComponentsFactory {
  public static getComponent(type: number): Shape {
    if (type === 0) {
      return new Pacman();
    } else if (type === 1) {
      return new Ghosts();
    } else if (type === 2) {
      return new Token();
    } else if (type === 3) {
      return new PowerToken();
    } else if (type === 4) {
      return new Walls();
    }
    {
      return new Shape();
    }
  }
}

export default GameComponentsFactory;
