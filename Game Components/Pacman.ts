import MovingComponent from '../Game Components/MovingComponent';
import { Shape } from '../UI';
import Utils from '../Utils';

class Pacman extends Shape implements MovingComponent {
  private isMoving: boolean;
  private direction: string;
  private canEatGhost: boolean;

  constructor() {
    super();
    let inner = Utils.generateElementWithClasses('div', ['pacman']);
    this.element.appendChild(inner);

    this.isMoving = false;
    this.direction = 'ArrowRight';
    this.canEatGhost = false;
  }

  // MARK: Change Pacmans Direction and Update UI
  changeDirection(direction: string) {
    if (
      direction === 'ArrowUp' || //
      direction === 'ArrowDown' ||
      direction === 'ArrowLeft' ||
      direction === 'ArrowRight'
    ) {
      this.element.firstChild.classList.remove(
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft'
      );
      this.direction = direction;
      this.element.firstChild.classList.add(this.direction);
    }
  }

  checkObstacle() {
    throw new Error('Method not implemented.');
  }

  // -1 - Empty
  // 0  - Pacman
  // 1  - Ghost
  // 2  - Token
  // 3  - Power Up
  // 4  - Wall

  // MARK: Check Obstacle
  checkObstacle2({ grid, engine }, row, col): boolean {
    let component;

    if (row === -1 || col === -1 || row === 15 || col === 15) component = 4;
    else component = grid[row][col];

    if (component === 4) {
      console.log('Ran Into a Wall');
      return false;
    } else if (component === 1) {
      if (this.canEatGhost) {
        console.log('Eat the Ghost and Update Points');
      } else {
        // Destroy yourself since you got attacked by a ghost
      }
    } else if (component === 2) {
      console.log('Eat Token');
      this.eatToken(row, col);
      engine.points += 10;
      return true;
    } else if (component === 3) {
      console.log('Ran into Power Up');

      // Change Pacmans State so It Can Eat the Ghost
      this.canEatGhost = true;

      console.log(this);

      return true;
    } else {
      console.log('Empty Space');

      let space = Utils.getElementAtSpecifiedID(row, col);
      space.appendChild(this.element.firstChild);
      this.element = space;

      return true;
    }
  }

  // MARK: Eat the Token
  private eatToken(row, col): void {
    let space = Utils.getElementAtSpecifiedID(row, col);
    space.firstChild.remove();
    space.appendChild(this.element.firstChild);
    this.element = space;
  }

  // MARK: Eat the Power Token
  private eatPowerToken(): void {}

  // MARK: Eat the Ghost if Power Token Is Eaten

  // MARK: Move Pacman
  movePacman({ world, engine }) {
    const { row, col } = this.getVector; //

    console.log('Pacman before moving is at row: ', row, 'col: ', col);

    // What direction is Pacman heading towards
    if (this.direction === 'ArrowRight') {
      // Check for obstructions see if he can move
      let updateGrid: boolean = this.checkObstacle2(
        { grid: world.getMatrixGameGrid(), engine },
        row,
        col + 1
      );

      if (updateGrid) {
        // Update Pacmans Position in the World
        world.setNewElementOnSpecifiedCoordinate(-1, row, col);
        world.setNewElementOnSpecifiedCoordinate(0, row, col + 1);

        this.setVectorMatrixCoordinates(row, col + 1);
      }
    }

    if (this.direction === 'ArrowLeft') {
      // Check for obstructions see if he can move
      let updateGrid: boolean = this.checkObstacle2(
        { grid: world.getMatrixGameGrid(), engine },
        row,
        col - 1
      );

      if (updateGrid) {
        // Update Pacmans Position in the World
        world.setNewElementOnSpecifiedCoordinate(-1, row, col);
        world.setNewElementOnSpecifiedCoordinate(0, row, col - 1);

        this.setVectorMatrixCoordinates(row, col - 1);
      }
    }

    if (this.direction === 'ArrowUp') {
      // Check for obstructions see if he can move
      let updateGrid: boolean = this.checkObstacle2(
        { grid: world.getMatrixGameGrid(), engine },
        row - 1,
        col
      );

      if (updateGrid) {
        // Update Pacmans Position in the World
        world.setNewElementOnSpecifiedCoordinate(-1, row, col);
        world.setNewElementOnSpecifiedCoordinate(0, row - 1, col);

        this.setVectorMatrixCoordinates(row - 1, col);
      }
    }

    if (this.direction === 'ArrowDown') {
      // Check for obstructions see if he can move
      let updateGrid: boolean = this.checkObstacle2(
        { grid: world.getMatrixGameGrid(), engine },
        row + 1,
        col
      );

      if (updateGrid) {
        // Update Pacmans Position in the World
        world.setNewElementOnSpecifiedCoordinate(-1, row, col);
        world.setNewElementOnSpecifiedCoordinate(0, row + 1, col);

        this.setVectorMatrixCoordinates(row + 1, col);
      }
    }

    console.log(
      'Pacman After moving is at row: ',
      this.getVector.row,
      'col: ',
      this.getVector.col
    );
  }
}
export default Pacman;

// private eatTokenIncrementPointsCounter() {
//   this.points += 10;

//   console.log(this.points);
//   // Update UI
//   // ----------------------------------
//   document
//     .getElementsByClassName('points_field')
//     .item(0).innerHTML = `Points: ${this.points}`;
// }
