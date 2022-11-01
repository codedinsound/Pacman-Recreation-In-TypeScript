class Utils {
  static generateElementWithClasses(
    type: string,
    classes: string[] = []
  ): HTMLElement {
    const el = document.createElement('div');
    el.classList.add(...classes);

    return el;
  }

  static getElementAtSpecifiedID(row, col): HTMLElement {
    return document.getElementById(`${row}-${col}`);
  }

  static async pause(time: number = 500) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  static randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

// function randomIntFromInterval(min, max) { // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

export default Utils;
