// Class to facilitate drawing cards to the canvas
class CardDrawer {
  // Constructor defaults to -1's if nothing is passed
  constructor(cardHeight, cardWidth, canvas) {
    this.cardHeight = cardHeight || -1;
    this.cardWidth = cardWidth || -1;
    this.canvasWidth = canvas ? canvas.width : -1;
    this.canvasHeight = canvas ? canvas.height : -1;
  }

  // Setter for card sizes
  updateCardSize(cardHeight, cardWidth) {
    this.cardHeight = cardHeight;
    this.cardWidth = cardWidth;
  }

  // Setter for canvas sizes
  updateCanvasSize(canvas) {
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  }

  // Fxn to draw the basic card to the canvas
  drawCardBase(ctx) {
    // Get a scalar to fit the card in frame
    this.scalar = 1;
    const padding = 8;
    if (this.cardHeight > this.canvasHeight - (padding * 2)) {
      this.scalar = (this.canvasHeight - (padding * 2)) / this.cardHeight;
    }
    if (this.cardWidth * this.scalar > this.canvasWidth - (padding * 2)) {
      this.scalar = (this.canvasWidth - (padding * 2)) / this.cardWidth;
    }

    // Calc and draw the card base
    const x = (this.canvasWidth / 2) - ((this.cardWidth / 2) * this.scalar);
    const y = (this.canvasHeight / 2) - ((this.cardHeight / 2) * this.scalar);
    ctx.fillStyle = 'white';
    ctx.fillRect(
      x,
      y,
      this.cardWidth * this.scalar,
      this.cardHeight * this.scalar,
    );
    console.log(`Drawing to (${x}, ${y})`);
    console.log(`Width/Height: ${this.cardWidth} & ${this.cardHeight} scaled by ~${this.scalar.toFixed(4)}`);
  }
}

export default CardDrawer;
