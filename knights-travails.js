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
}