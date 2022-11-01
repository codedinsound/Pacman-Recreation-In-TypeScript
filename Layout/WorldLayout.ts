// -1 - Empty
// 0  - Pacman
// 1  - Ghost
// 2  - Token
// 3  - Power Up
// 4  - Wall

import GameComponentsFactory from '../Game Components/GameComponenFactory';
import { Shape } from '../UI';
import Utils from '../Utils';

class WorldLayout {
  private htmlGridLayout: HTMLElement;
  private matrixGameGrid: number[][];

  // MARK: Constructor
  constructor() {
    this.htmlGridLayout = Utils.generateElementWithClasses('div', [
      'worldLayout',
    ]);
    this.matrixGameGrid = this.loadNewGameGrid();
  }

  public loadNewGameGrid(): number[][] {
    return [
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
      [2, 4, 4, 2, 4, 4, 4, 2, 4, 4, 4, 2, 4, 4, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 4, 2, 4, 4, 2, 4, 4, 4, 2, 4, 4, 2, 4, 2],
      [2, 2, 2, 2, 4, 2, 4, 4, 4, 2, 4, 2, 2, 2, 2],
      [4, 4, 4, 2, 4, 2, 2, 4, 2, 2, 4, 2, 4, 4, 4],
      [4, 4, 4, 2, 2, -1, 1, 2, 2, 2, 2, 2, 4, 4, 4],
      [2, 2, 2, 2, 4, 2, 4, 4, 4, 2, 4, 2, 2, 2, 2],
      [4, 4, 4, 2, 4, 2, 2, -1, 2, 2, 4, 2, 4, 4, 4],
      [4, 4, 4, 2, 4, 4, 4, 2, 4, 4, 4, 2, 4, 4, 4],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2],
      [2, 2, 4, 2, 2, 2, 2, 4, 2, 2, 2, 2, 4, 2, 2],
      [4, 2, 2, 2, 4, 4, 2, 4, 2, 4, 4, 2, 2, 2, 4],
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
    ];
  }

  public get getHTMLGameGrid(): HTMLElement {
    return this.htmlGridLayout;
  }

  public getMatrixGameGrid(): number[][] {
    const gameGrid = this.matrixGameGrid;
    return gameGrid;
  }

  public setNewElementOnSpecifiedCoordinate(element, row, col): void {
    this.matrixGameGrid[row][col] = element;
  }

  public getElementAtMatrixCoordinate(row: number, col: number): number {
    return this.matrixGameGrid[row][col];
  }

  public populateHTMLGameGrid(): any {
    const coordinates = { x: 0, y: 0 };

    let shape: Shape;
    let ghostCounter = 0;
    let ghostColors = ['black', 'pink', 'red'];

    let movingComponents: Shape = {} as Shape;

    for (let row = 0; row < this.matrixGameGrid.length; row++) {
      for (let col = 0; col < this.matrixGameGrid[row].length; col++) {
        let component = this.matrixGameGrid[row][col];

        shape = GameComponentsFactory.getComponent(component);
        shape.setElementsID(`${row}-${col}`);
        shape.setVectorMatrixCoordinates(row, col);
        shape.setHTMLGridCoordinates(coordinates.x, coordinates.y);

        if (component === 0) {
          movingComponents['pacman'] = shape;
        } else if (component === 1) {
          let ghost = shape.getHTMLElement.querySelector('div');

          ghost.classList.add('ghost');
          ghost.classList.add(ghostColors.pop());

          movingComponents['ghost-' + ghostCounter] = shape;
          ghostCounter += 1;
        }

        this.htmlGridLayout.appendChild(shape.getHTMLElement);

        // coordinates.x += 32;
      }
      // coordinates.x = 0;
      // coordinates.y += 24;
    }

    return movingComponents;
  }
}

export default WorldLayout;
