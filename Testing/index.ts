class Debugger {
  static debugGhost(
    debugGhostOn: boolean = false,
    line: number,
    params: any[]
  ) {
    if (!debugGhostOn) return;

    console.log(`Ghost.ts (${line})`, ...params);
  }
}

export default Debugger;
