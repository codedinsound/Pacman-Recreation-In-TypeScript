import WorldLayout from '../Layout/WorldLayout';
import { Shape } from '../UI';
import Utils from '../Utils';

class GameEngine {
  private world: WorldLayout;
  private movingGameComponents: Shape = {} as Shape;
  public points: number = 0;
  private isGameStarted: boolean = false;

  async testMovingGhosts() {
    // console.log('(11): Changing Ghost Direction and Moving Automatically');

    let i = 0;
    while (true) {
      await Utils.pause(100);
      this.movingGameComponents['ghost-0'].changeDirection();

      await Utils.pause(100);
      this.movingGameComponents['ghost-0'].move({
        world: this.world,
        engine: this,
      });

      i++;
    }
  }

  // MARK: Attach Controllers
  private attachControllers() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      if (e.code === 'KeyT' && !this.isGameStarted) {
        // console.log('GE-29: Game Started');
        this.isGameStarted = true;

        // Logic to Init Ghosts
        this.testMovingGhosts();
      } else if (this.isGameStarted === true && e.code === 'Space') {
        // For Testing Only Manually Move Pacman
        this.movingGameComponents['pacman'].movePacman({
          world: this.world,
          engine: this,
        });
        // console.log('See if mutated original: ', this.points, this.world);
      } else if (this.isGameStarted === true) {
        // Test Pacman
        // ---------------------d
        this.movingGameComponents['pacman'].changeDirection(e.code);
      }
    });
  }

  // ============================================================================
  // MARK: Init Game Engine
  init(): void {
    // console.log('Initilizing Pacman Game....');

    // Get a New World Game Layout
    this.world = new WorldLayout();

    // Attch The HTML Grid to the Container Field
    document
      .getElementsByClassName('app-container')
      .item(0)
      .appendChild(this.world.getHTMLGameGrid);
    console.log('Attached world to App Container');

    // Populate HTML Game Grid and Get Game Components
    this.movingGameComponents = this.world.populateHTMLGameGrid();

    // Attach Game Controllers
    this.attachControllers();
  }
}

export default GameEngine;

// this.worldHeight = parseInt(getComputedStyle(this.htmlGridLayout).height);
