class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.coordinate = [x, y];
    this.right = null;
    this.down = null;
    this.left = null;
    this.up = null;
    this.upUpRight = null;
    this.rightRightUp = null;
    this.rightRightDown = null;
    this.downDownRight = null;
    this.downDownLeft = null;
    this.leftLeftDown = null;
    this.leftLeftUp = null;
    this.upUpLeft = null;
  }
}

class Graph {
  constructor() {
    this.start = this.buildGraph();
  }

  buildGraph() {
    let currentNode;
    let nodeAbove;
    let nodeRight;

    //Generate the grid connections of up, right, down, and left.
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (x === 0 && y === 0) {
          currentNode = new Vertex(x, y);
        }

        //Connect node with the one above
        if (y < 7) {
          currentNode.up = new Vertex(x, y + 1);
          nodeAbove = currentNode.up;
          nodeAbove.down = currentNode;
        }

        //Connect node with the one to the right
        if (x < 7) {
          if (y === 0) {
            currentNode.right = new Vertex(x + 1, y);
          } else {
            currentNode.right = currentNode.down.right.up;
          }
          nodeRight = currentNode.right;
          nodeRight.left = currentNode;

          //Navigate to the node on the right.
          currentNode = currentNode.right;
        }
      }

      //Navigate through the nodes back towards the left and one square up.
      if (y < 7) {
        while (currentNode.left) {
          currentNode = currentNode.left;
        }
        currentNode = currentNode.up;
      }
    }

    //Navigate back to [0,0].
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    while (currentNode.down) {
      currentNode = currentNode.down;
    }

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if ((0 <= currentNode.x + 1 && currentNode.x + 1 <= 7) &&
            (0 <= currentNode.y + 2 && currentNode.y + 2 <= 7)) {
          currentNode.upUpRight = currentNode.up.up.right;
        }

        if ((0 <= currentNode.x + 2 && currentNode.x + 2 <= 7) &&
            (0 <= currentNode.y + 1 && currentNode.y + 1 <= 7)) {
          currentNode.rightRightUp = currentNode.right.right.up;
        }

        if ((0 <= currentNode.x + 2 && currentNode.x + 2 <= 7) &&
            (0 <= currentNode.y - 1 && currentNode.y - 1 <= 7)) {
          currentNode.rightRightDown = currentNode.right.right.down;
        }

        if ((0 <= currentNode.x + 1 && currentNode.x + 1 <= 7) &&
            (0 <= currentNode.y - 2 && currentNode.y - 2 <= 7)) {
          currentNode.downDownRight = currentNode.down.down.right;
        }

        if ((0 <= currentNode.x - 1 && currentNode.x - 1 <= 7) &&
            (0 <= currentNode.y - 2 && currentNode.y - 2 <= 7)) {
          currentNode.downDownLeft = currentNode.down.down.left;
        }

        if ((0 <= currentNode.x - 2 && currentNode.x - 2 <= 7) &&
            (0 <= currentNode.y - 1 && currentNode.y - 1 <= 7)) {
          currentNode.leftLeftDown = currentNode.left.left.down;
        }

        if ((0 <= currentNode.x - 2 && currentNode.x - 2 <= 7) &&
            (0 <= currentNode.y + 1 && currentNode.y + 1 <= 7)) {
          currentNode.leftLeftUp = currentNode.left.left.up;
        }

        if ((0 <= currentNode.x - 1 && currentNode.x - 1 <= 7) &&
            (0 <= currentNode.y + 2 && currentNode.y + 2 <= 7)) {
          currentNode.upUpLeft = currentNode.up.up.left;
        }

        if (x < 7) {
          currentNode = currentNode.right;
        }
      }
      if (y < 7) {
        while (currentNode.left) {
          currentNode = currentNode.left;
        }
        currentNode = currentNode.up;
      }
    }
    //Navigate back to [0,0].
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    while (currentNode.down) {
      currentNode = currentNode.down;
    }
    return currentNode;
  }

  knightMoves(startCoord, endCoord) {
    if (!this.isValidCoord(startCoord) || !this.isValidCoord(endCoord)) {
      throw new Error("Coordinates are not valid");
    }
    if (startCoord[0] === endCoord[0] && startCoord[1] === endCoord[1]) {
      return [startCoord];
    }
    let currentNode = this.start;
    let moves = 0;
    let levelSize = 1;
    const queue = [[startCoord]];
    while (queue.length > 0 && moves < 6) {
      const seq = queue.shift();
      levelSize--;
      const lastCoord = seq.pop();
      currentNode = this.start;
      while (currentNode.x !== lastCoord[0]) {
        if (currentNode.x > lastCoord[0]) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
      }
      while (currentNode.y !== lastCoord[1]) {
        if (currentNode.y > lastCoord[1]) {
          currentNode = currentNode.down;
        } else {
          currentNode = currentNode.up;
        }
      }
      seq.push(lastCoord);

      const knightMoves = [
        { dx:  1, dy:  2, prop: 'upUpRight' },
        { dx:  2, dy:  1, prop: 'rightRightUp' },
        { dx:  2, dy: -1, prop: 'rightRightDown' },
        { dx:  1, dy: -2, prop: 'downDownRight' },
        { dx: -1, dy: -2, prop: 'downDownLeft' },
        { dx: -2, dy: -1, prop: 'leftLeftDown' },
        { dx: -2, dy:  1, prop: 'leftLeftUp' },
        { dx: -1, dy:  2, prop: 'upUpLeft' },
      ];

      for (const move of knightMoves) {
        const nextCoord = [currentNode.x + move.dx, currentNode.y + move.dy];
        const nextNode = currentNode[move.prop];

        if (nextNode !== null && !this.checkRepeatSquare(nextCoord, seq)) {
          seq.push(nextCoord);
          if (nextCoord[0] === endCoord[0] && nextCoord[1] === endCoord[1]) {
            return seq;
          }
          queue.push([...seq]);
          seq.pop();
        }
      }
      if (levelSize === 0) {
        levelSize = queue.length;
        if (queue.length > 0) {
          moves++;
        }
      }
    }
    return null;
  }

  checkRepeatSquare(coord, seq) {
    for (let i = 0; i < seq.length; i++) {
      if (coord[0] === seq[i][0] && coord[1] === seq[i][1]) {
        return true;
      }
    }
    return false;
  }

  isValidCoord(coord) {
    return (
      Array.isArray(coord) &&
      coord.length === 2 &&
      Number.isInteger(coord[0]) &&
      Number.isInteger(coord[1]) &&
      coord[0] >= 0 && coord[0] <= 7 &&
      coord[1] >= 0 && coord[1] <= 7
    );
  }
}

let board = new Graph();
// console.log(board.knightMoves([0, 0], [0, 0]));
// console.log(board.knightMoves([3, 3], [3, 3]));
// console.log(board.knightMoves([3, 3], [4, 3]));
// console.log(board.knightMoves([0, 0], [1, 2]));
// console.log(board.knightMoves([0, 0], [7, 7]));
// console.log(board.knightMoves([7, 0], [0, 7]));
console.log(board.knightMoves([7, 0], [0, 6]));