import { Shape } from '../UI';
import Utils from '../Utils';

class PowerToken extends Shape {
  constructor() {
    super();
    let inner = Utils.generateElementWithClasses('div', ['power-token']);
    this.element.appendChild(inner);
  }
}

export default PowerToken;
