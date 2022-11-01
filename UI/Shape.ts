import Utils from '../Utils';

class Shape {
  protected vector: { htmlX: number; htmlY: number };
  protected matrixVectorCoodrinates: { row: number; col: number };
  protected element: HTMLElement;

  constructor(htmlX: number = 0, htmlY: number = 0) {
    this.vector = { htmlX, htmlY };
    this.matrixVectorCoodrinates = { row: 0, col: 0 };
    this.element = Utils.generateElementWithClasses('div', ['shape']);
    this.element.style.left = `${this.vector.htmlX}px`;
    this.element.style.top = `${this.vector.htmlY}px`;
  }

  // MARK: Set HTML Element ID
  public setElementsID(id: string): void {
    this.element.setAttribute('id', id);
  }

  public setCSSStyle(className: string) {
    this.element.classList.add(className);
  }

  public setHTMLGridCoordinates(htmlX: number, htmlY: number): Shape {
    this.vector.htmlX = htmlX;
    this.vector.htmlY = htmlY;
    return this;
  }
  public setVectorMatrixCoordinates(row: number, col: number): void {
    this.matrixVectorCoodrinates.row = row;
    this.matrixVectorCoodrinates.col = col;
  }
  public get getHTMLElement(): HTMLElement {
    return this.element;
  }
  public get getVector() {
    return this.matrixVectorCoodrinates;
  }

  public updateGridPosition() {
    this.element.style.left = `${this.vector.htmlX}px`;
    this.element.style.top = `${this.vector.htmlY}px`;
  }
}

export default Shape;
