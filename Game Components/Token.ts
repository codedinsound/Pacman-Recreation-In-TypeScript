import { Shape } from '../UI';
import Utils from '../Utils';

class Token extends Shape {
  constructor() {
    super();
    let inner = Utils.generateElementWithClasses('div', ['token']);
    this.element.appendChild(inner);
  }
}

export default Token;
