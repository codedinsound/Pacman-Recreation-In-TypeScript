import MovingComponent from '../Game Components/MovingComponent';
import Debugger from '../Testing';
import { Shape } from '../UI';
import Utils from '../Utils';

class Ghosts extends Shape implements MovingComponent {
  private direction: string;

  private standingOnState: number;
  storeStandingElementDiv;

  constructor() {
    super();
    let inner = Utils.generateElementWithClasses('div', []);
    this.element.appendChild(inner);
    this.standingOnState = -1; //
    this.direction = 'ArrowLeft';

    this.storeStandingElementDiv = null;
  }

  // MARK: Change Ghosts Direction
  changeDirection(direction: string) {
    // Get Random Direction To Go To
    let dir = Utils.randomIntFromInterval(0, 3);

    let directions = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

    direction = directions[dir];

    if (
      direction === 'ArrowUp' ||
      direction === 'ArrowDown' ||
      direction === 'ArrowLeft' ||
      direction === 'ArrowRight'
    ) {
      this.direction = direction;
    }
  }

  checkObstacle2({ grid, engine }, row, col): boolean {
    let component; //

    if (row === -1 || col === -1 || row === 15 || col === 15) component = 4;
    else component = grid[row][col];

    if (component === 4) {
      // console.log('Ran Into a Wall');
      return false;
    } else if (component === 1) {
      // console.log('Ran into a ghost');
      return true;
    } else if (component === 2) {
      return true;
    } else if (component === 3) {
      // console.log('Power Up');
      return true;
    } else {
      // console.log('Empty Space'); 
      return true;
    }
  }

  move({ world, engine }) {
    const { row, col } = this.getVector;

    Debugger.debugGhost(false, 54, ['Before Moving', 'row', row, 'col', col]);

    if (this.direction === 'ArrowLeft') {
      // Check for obstructions ahead to see if he can move
      const updateGrid: boolean = this.checkObstacle2(
        { grid: world.getMatrixGameGrid(), engine },
        row,
        col - 1
      );

      if (updateGrid) {
        let tempGhost = this.element.firstChild.cloneNode();
        this.element.firstChild.remove();

        // Update World With Whats is On Top
        world.setNewElementOnSpecifiedCoordinate(
          this.standingOnState,
          row,
          col
        );

        if (this.storeStandingElementDiv) {
          this.element.append(this.storeStandingElementDiv.cloneNode());
          this.storeStandingElementDiv = null;
        }

        // Move Ghost To New Tile Location but Store Upcoming Space Values
        let upcomingSpace = Utils.getElementAtSpecifiedID(row, col - 1);
        let upcomingSpaceChild = upcomingSpace.firstChild;
        let upcomingSpaceValue = world.getElementAtMatrixCoordinate(
          row,
          col - 1
        );

        if (upcomingSpaceChild) {
          console.log('Has Child');
          this.storeStandingElementDiv = upcomingSpaceChild.cloneNode();

          upcomingSpace.firstChild.remove();
        }

        this.standingOnState = upcomingSpaceValue;

        // Move Ghost UI
        this.element = upcomingSpace;

        this.element.append(tempGhost);

        world.setNewElementOnSpecifiedCoordinate(1, row, col - 1);

        this.setVectorMatrixCoordinates(row, col - 1);

        console.log(this);
      }
    } else if (this.direction === 'ArrowRight') {
      // Check for obstructions ahead to see if he can move
      const updateGrid: boolean = this.checkObstacle2(
        { grid: world.getMatrixGameGrid(), engine },
        row,
        col + 1
      );

      if (updateGrid) {
        let tempGhost = this.element.firstChild.cloneNode();
        this.element.firstChild.remove();

        // Update World With Whats is On Top
        world.setNewElementOnSpecifiedCoordinate(
          this.standingOnState,
          row,
          col
        );

        if (this.storeStandingElementDiv) {
          this.element.append(this.storeStandingElementDiv.cloneNode());
        }

        // Move Ghost To New Tile Location but Store Upcoming Space Values
        let upcomingSpace = Utils.getElementAtSpecifiedID(row, col + 1);
        let upcomingSpaceChild = upcomingSpace.firstChild;
        let upcomingSpaceValue = world.getElementAtMatrixCoordinate(
          row,
          col + 1
        );

        if (upcomingSpaceChild) {
          console.log('Has Child');
          this.storeStandingElementDiv = upcomingSpaceChild.cloneNode();

          upcomingSpace.firstChild.remove();
        }

        this.standingOnState = upcomingSpaceValue;

        // Move Ghost UI
        this.element = upcomingSpace;

        this.element.append(tempGhost);

        world.setNewElementOnSpecifiedCoordinate(1, row, col + 1);

        this.setVectorMatrixCoordinates(row, col + 1);
      }
    } else if (this.direction === 'ArrowUp') {
      // Check for obstructions ahead to see if he can move
      const updateGrid: boolean = this.checkObstacle2(
        { grid: world.getMatrixGameGrid(), engine },
        row - 1,
        col
      );

      if (updateGrid) {
        let tempGhost = this.element.firstChild.cloneNode();
        this.element.firstChild.remove();

        // Update World With Whats is On Top
        world.setNewElementOnSpecifiedCoordinate(
          this.standingOnState,
          row,
          col
        );

        if (this.storeStandingElementDiv) {
          this.element.append(this.storeStandingElementDiv.cloneNode());
        }

        // Move Ghost To New Tile Location but Store Upcoming Space Values
        let upcomingSpace = Utils.getElementAtSpecifiedID(row - 1, col);
        let upcomingSpaceChild = upcomingSpace.firstChild;
        let upcomingSpaceValue = world.getElementAtMatrixCoordinate(
          row - 1,
          col
        );

        if (upcomingSpaceChild) {
          console.log('Has Child');
          this.storeStandingElementDiv = upcomingSpaceChild.cloneNode();

          upcomingSpace.firstChild.remove();
        }

        this.standingOnState = upcomingSpaceValue;

        // Move Ghost UI
        this.element = upcomingSpace;

        this.element.append(tempGhost);

        world.setNewElementOnSpecifiedCoordinate(1, row - 1, col);

        this.setVectorMatrixCoordinates(row - 1, col);
      }
    } else if (this.direction === 'ArrowDown') {
      // Check for obstructions ahead to see if he can move
      const updateGrid: boolean = this.checkObstacle2(
        { grid: world.getMatrixGameGrid(), engine },
        row + 1,
        col
      );

      if (updateGrid) {
        let tempGhost = this.element.firstChild.cloneNode();
        this.element.firstChild.remove();

        // Update World With Whats is On Top
        world.setNewElementOnSpecifiedCoordinate(
          this.standingOnState,
          row,
          col
        );

        if (this.storeStandingElementDiv) {
          this.element.append(this.storeStandingElementDiv.cloneNode());
        }

        // Move Ghost To New Tile Location but Store Upcoming Space Values
        let upcomingSpace = Utils.getElementAtSpecifiedID(row + 1, col);
        let upcomingSpaceChild = upcomingSpace.firstChild;
        let upcomingSpaceValue = world.getElementAtMatrixCoordinate(
          row + 1,
          col
        );

        if (upcomingSpaceChild) {
          console.log('Has Child');
          this.storeStandingElementDiv = upcomingSpaceChild.cloneNode();

          upcomingSpace.firstChild.remove();
        }

        this.standingOnState = upcomingSpaceValue;

        // Move Ghost UI
        this.element = upcomingSpace;

        this.element.append(tempGhost);

        world.setNewElementOnSpecifiedCoordinate(1, row + 1, col);

        this.setVectorMatrixCoordinates(row + 1, col);
      }
    }
  }

  // MARK: Check Obstacle
  checkObstacle() {
    throw new Error('Method not implemented.');
  }
}

export default Ghosts;
