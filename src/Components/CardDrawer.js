/* eslint-disable max-len */
// Class to facilitate drawing cards to the canvas
class CardDrawer {
  // Constructor defaults to -1's if nothing is passed
  constructor(cardHeight, cardWidth, canvas) {
    this.cardHeight = cardHeight || -1;
    this.cardWidth = cardWidth || -1;
    this.canvasWidth = canvas ? canvas.width : -1;
    this.canvasHeight = canvas ? canvas.height : -1;

    // Top-left trackers for cards
    this.cardLeft = -1;
    this.cardTop = -1;
    this.cardRight = -1;
    this.cardBottom = -1;
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
    this.cardLeft = (this.canvasWidth / 2) - ((this.cardWidth / 2) * this.scalar);
    this.cardTop = (this.canvasHeight / 2) - ((this.cardHeight / 2) * this.scalar);
    this.cardRight = (this.canvasWidth / 2) + ((this.cardWidth / 2) * this.scalar);
    this.cardBottom = (this.canvasHeight / 2) + ((this.cardHeight / 2) * this.scalar);

    ctx.fillStyle = 'white';
    ctx.fillRect(
      this.cardLeft,
      this.cardTop,
      this.cardWidth * this.scalar,
      this.cardHeight * this.scalar,
    );
  }

  // Demo component for testing
  // const demoCardComponent = {
  //   text: 'Card Title',
  //   textAlign: 'centered'
  //   fillStyle: 'black',
  //   font: '36px serif',
  //   position: {
  //     top: 32,
  //     left: centered,
  //   },
  // };

  drawCardComponents(ctx, cards) {
    console.log('Drawing Card Components...');
    const amt = cards.length;

    ctx.font = '50px serif';
    ctx.fillStyle = 'tomato';
    ctx.textAlign = 'center';
    ctx.fillText('Test Text', this.canvasWidth / 2, this.canvasHeight / 2);

    for (let i = 0; i < amt; i++) {
      ctx.fillStyle = cards[i].fillStyle || 'black';
      ctx.font = cards[i].font || '20px serif';
      ctx.textAlign = cards[i].textAlign || 'center';

      const xPos = (cards[i].position.left === 'center')
        ? this.canvasWidth / 2
        : ((cards[i].position.left * 0.01) * (this.cardWidth * this.scalar)) + this.cardLeft;

      const yPos = (cards[i].position.top === 'center')
        ? this.canvasHeight / 2
        : ((cards[i].position.top * 0.01) * (this.cardHeight * this.scalar)) + this.cardTop;

      ctx.fillText(cards[i].text, xPos, yPos);
    }
  }
}

export default CardDrawer;
