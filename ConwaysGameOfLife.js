int rowscols = 200;
int squareSize;

boolean[][] cells;
boolean[][] newCells;

int skips;

boolean paused = true;

void setup() {
  size(800, 800);
  noStroke();
  
  cells = new boolean[rowscols][rowscols];
  newCells = new boolean[rowscols][rowscols];
  
  for (int x = 0; x < rowscols; x++) {
    for (int y = 0; y < rowscols; y++) {
      int rand = floor(random(2));
      if (rand == 1) cells[x][y] = true;
      else cells[x][y] = false;
    }
  }
  
  squareSize = width / rowscols;
  drawCells();
}

void drawCells() {
  for (int x = 0; x < rowscols; x++) {
    for (int y = 0; y < rowscols; y++) {
      if (cells[x][y]) fill(0);
      else fill(255);
      
      square(x * squareSize, y * squareSize, squareSize);
    }
  }
}

void checkCells() {
  int aliveNeighbors = 0;
  
  for (int x = 0; x < rowscols; x++) {
    for (int y = 0; y < rowscols; y++) {
      
      aliveNeighbors = 0;
      
      for (int x2 = x - 1; x2 <= x + 1; x2++) {
        for (int y2 = y - 1; y2 <= y +1; y2++) {
          if (x2 == x && y2 == y) continue;
          int checkX = x2;
          int checkY = y2;
          if (x2 < 0) checkX = rowscols - 1;
          if (x2 >= rowscols) checkX = 0;
          if (y2 < 0) checkY = rowscols - 1;
          if (y2 >= rowscols) checkY = 0;
          
          if (cells[checkX][checkY]) aliveNeighbors++;
        }
      }
      
      if (x == 2 && y == 2) println(" --- " + x + " : " + y + " : " + aliveNeighbors);
      
      if (cells[x][y]) {
        if (aliveNeighbors < 2 || aliveNeighbors > 3) newCells[x][y] = false;
        else newCells[x][y] = true;
      }
      else {
        if (aliveNeighbors == 3) newCells[x][y] = true;
        else newCells[x][y] = false;
      }
    }
  }
  
  for (int x = 0; x < rowscols; x++) {
    for (int y = 0; y < rowscols; y++) {
      cells[x][y] = newCells[x][y];
    }
  }
}

void draw() {
  
  if (paused) return;
  
  //if (skips > 0) {
  //  skips--;
  //  return;
  //}
  
  skips = 1;
  drawCells();
  checkCells();
  
}

void mouseClicked() {
  PVector pos = new PVector(floor(mouseX / squareSize), floor(mouseY / squareSize));
  println(mouseX + " : " + width + " : " + rowscols + " : " + floor(mouseX / (width / rowscols)));
  cells[(int)pos.x][(int)pos.y] = !cells[(int)pos.x][(int)pos.y];
}

void keyPressed() {
  paused = !paused;
}
