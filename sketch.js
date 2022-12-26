/**
 * Fractal Tree
 * The Coding Train / Daniel Shiffman
 * https://thecodingtrain.com/challenges/14-fractal-trees-recursive
 * https://youtu.be/0jjeOYMjmDU
 * https://editor.p5js.org/codingtrain/sketches/xTjmYXU3q
 */

let tree = [];
let tree2 = []; // hardcode in a second tree, parameter of function different, execution the same
let leaves = [];
let colors = ["#008000", "#006400", "#90EE90", "#3CB371", "#2E8B57"];
let randomColor;
let count = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
}

// draw the rest of the tree
function drawTree(tree, tree2) {
  /**
   * Where do I establish how many trees are in the TREES array?
   */

  // tree
  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branch(25));
      tree.push(tree[i].branch(-25));
    }
    tree[i].finished = true;
  }

  if (count === 6) {
    for (let i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        let leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }

  // tree2
  for (let i = tree2.length - 1; i >= 0; i--) {
    if (!tree2[i].finished) {
      tree2.push(tree2[i].branch(25));
      tree2.push(tree2[i].branch(-25));
    }
    tree2[i].finished = true;
  }

  if (count === 6) {
    for (let i = 0; i < tree2.length; i++) {
      if (!tree2[i].finished) {
        let leaf = tree2[i].end.copy();
        leaves.push(leaf);
      }
    }
  }

  count++;
}

// initialize tree
function setUpTree(tree, tree2) {
  /**
   * For every tree in the TREES array,
   * initialize a root/trunk at
   * let a = createVector(width / 5, height);
   * let b = createVector(width / 5, height - 200);
   * let root = new Branch(a, b);
   * trees[0] = root;
   *
   * Will this work?
   */

  let a = createVector(width / 2, height + 100);
  let b = createVector(width / 2, height - 200);
  let c = createVector(width / 3, height);
  let d = createVector(width / 3, height - 200);
  let root = new Branch(a, b);
  let root2 = new Branch(c, d);
  tree[0] = root;
  tree2[0] = root2;
}

// draw tree on mouse press
function mousePressed() {
  if (tree[0] && tree2[0]) {
    drawTree(tree, tree2);
  } else {
    setUpTree(tree, tree2);
  }
}

function flower(x, y) {
  push();
  translate(x, y);
  for (let i = 0; i < 10; i++) {
    ellipse(0, 4, 2, 8);
    rotate(45);
  }
  pop();
}

function draw() {
  background(51);
  if (frameCount % 50 === 0) {
    randomColor = random(colors.length);
    randomColor = floor(randomColor);
  }

  for (let i = 0; i < tree.length; i++) {
    tree[i].show();
  }

  for (let i = 0; i < tree2.length; i++) {
    tree2[i].show();
  }

  // different kind of loop here to handle each leaf?
  for (let i = 0; i < leaves.length; i++) {
    fill(colors[randomColor]);
    noStroke();
    leaves[i].y += noise(frameCount / 100, leaves[i].x, leaves[i].y);
    flower(leaves[i].x, leaves[i].y);
  }

  if (count === 8) {
    // reset function: everything goes back to the beginning
    // reset function for after the leaves have all fallen? prevent more branches being made?
    count = 0;
    tree = [];
    tree2 = [];
    leaves = [];
  }
}
