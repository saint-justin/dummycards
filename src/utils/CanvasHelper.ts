type Card = {
  height: number | undefined,
  width: number | undefined,
  sides: {
    left: number | undefined,
    right: number | undefined,
    top: number | undefined,
    bottom: number | undefined,
  }
}

// Class to facilitate drawing cards to the canvas
class CardDrawer {
  scalar: number;
  canvasWidth: number | undefined;
  canvasHeight: number | undefined;
  card: Card;

  // Populate w/ undefined
  constructor() {
    this.scalar = 1;
    this.canvasWidth =  undefined;
    this.canvasHeight =  undefined;
    this.card = {
      height: undefined,
      width: undefined,
      sides: {
        left: undefined,
        right: undefined,
        top: undefined,
        bottom: undefined,
      }
    }
  }

  // Setter for card sizes
  updateCardSize(cardHeight: number, cardWidth: number): void  {
    this.card.height = cardHeight;
    this.card.width = cardWidth;
  }

  // Setter for canvas sizes
  updateCanvasSize(canvas: HTMLCanvasElement): void {
    if(!canvas) {
      console.error('ERROR: Tried up update canvas size with null object')
      return;
    }

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  }

  // Fxn to draw the basic card to the canvas
  drawCardBase(ctx: CanvasRenderingContext2D): void {
    // Check all values used exist
    if (!this.card.height || !this.card.width || !this.canvasHeight || !this.canvasWidth) {
      console.error("ERROR: Tried to draw card base with missing values");
      return;
    }

    // Get a scalar to fit the card in frame
    this.scalar = 1;
    const padding = 8;
    if (this.card.height > this.canvasHeight - (padding * 2)) {
      this.scalar = (this.canvasHeight - (padding * 2)) / this.card.height;
    }
    if (this.card.width * this.scalar > this.canvasWidth - (padding * 2)) {
      this.scalar = (this.canvasWidth - (padding * 2)) / this.card.width;
    }

    // Calc and draw the card base
    this.card.sides.left = (this.canvasWidth / 2) - ((this.card.width / 2) * this.scalar);
    this.card.sides.top = (this.canvasHeight / 2) - ((this.card.height / 2) * this.scalar);
    this.card.sides.right = (this.canvasWidth / 2) + ((this.card.width / 2) * this.scalar);
    this.card.sides.bottom = (this.canvasHeight / 2) + ((this.card.height / 2) * this.scalar);

    ctx.fillStyle = 'white';
    ctx.fillRect(
      this.card.sides.left,
      this.card.sides.top,
      this.card.width * this.scalar,
      this.card.height * this.scalar,
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

  drawCardComponents(ctx: CanvasRenderingContext2D, cards: Drawable[]): void {
    // Checking to make sure values used will exist
    if (!this.card.width 
      || !this.card.height
      || !this.card.sides.left 
      || !this.card.sides.right 
      || !this.card.sides.top 
      || !this.card.sides.bottom 
      || !this.canvasHeight 
      || !this.canvasWidth) {
        console.error('ERROR: Tried to draw card components with invalid measures');
        return;
    }

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
        : ((cards[i].position.left * 0.01) * (this.card.width * this.scalar)) + this.card.sides.left;

      const yPos = (cards[i].position.top === 'center')
        ? this.canvasHeight / 2
        : ((cards[i].position.top * 0.01) * (this.cardHeight * this.scalar)) + this.card.sides.top;

      ctx.fillText(cards[i].text, xPos, yPos);
    }
  }
}

module.exports = {
  CardDrawer,
  Drawable,
};
