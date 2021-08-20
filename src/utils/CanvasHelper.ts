import { Drawable, Card } from '../types'

// Class to facilitate drawing cards to the canvas
class CardDrawer {
  scalar: number;
  canvas: {
    width: number | undefined,
    height: number | undefined,
  }
  card: Card;

  // Populate w/ undefined
  constructor() {
    this.scalar = 1;
    this.canvas = {
      width: undefined,
      height: undefined,
    };
    this.card = {
      height: 1125,
      width: 825,
      sides: {
        left: undefined,
        right: undefined,
        top: undefined,
        bottom: undefined,
      }
    }
  }

  getCardInfo(): Card {
    return this.card;
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

    this.canvas.width = canvas.width;
    this.canvas.height = canvas.height;
  }

  // Fxn to draw the basic card to the canvas
  drawCardBase(ctx: CanvasRenderingContext2D): void {
    // Check all values used exist
    if (!this.card.height || !this.card.width || !this.canvas.height || !this.canvas.width) {
      console.error("ERROR: Tried to draw card base with missing values");
      return;
    }

    // Get a scalar to fit the card in frame
    this.scalar = 1;
    const padding = 8;
    if (this.card.height > this.canvas.height - (padding * 2)) {
      this.scalar = (this.canvas.height - (padding * 2)) / this.card.height;
    }
    if (this.card.width * this.scalar > this.canvas.width - (padding * 2)) {
      this.scalar = (this.canvas.width - (padding * 2)) / this.card.width;
    }

    // Calc and draw the card base
    this.card.sides.left = (this.canvas.width / 2) - ((this.card.width / 2) * this.scalar);
    this.card.sides.top = (this.canvas.height / 2) - ((this.card.height / 2) * this.scalar);
    this.card.sides.right = (this.canvas.width / 2) + ((this.card.width / 2) * this.scalar);
    this.card.sides.bottom = (this.canvas.height / 2) + ((this.card.height / 2) * this.scalar);

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
      || !this.canvas.height 
      || !this.canvas.width) {
        console.error('ERROR: Tried to draw card components with invalid measures');
        return;
    }

    const amt = cards.length;

    // Draw out all chunks of text onto the
    for (let i = 0; i < amt; i++) {
      // Initializing draw vars from card info
      ctx.fillStyle = cards[i].fillStyle || 'black';
      ctx.font = cards[i].font || '20px serif';
      ctx.textAlign = cards[i].textAlign || 'center';
      let xPos: number | undefined = undefined;
      let yPos: number | undefined = undefined;

      // Determining X Position
      if (cards[i].position.left === 'center' || cards[i].position.right === 'center') {
        xPos = this.canvas.width / 2;
      } else if (Number.isInteger(cards[i].position.left)) {
        xPos = this.card.sides.left + ((<number>cards[i].position.left * 0.01) * (this.card.width * this.scalar));
      } else if (Number.isInteger(cards[i].position.right)) {
        xPos = this.card.sides.right - ((<number>cards[i].position.right * 0.01) * (this.card.width * this.scalar));
      }

      // Determining Y Position
      if (cards[i].position.top === 'center' || cards[i].position.bottom === 'center') {
        yPos = this.canvas.height / 2;
      } else if (Number.isInteger(cards[i].position.top)) {
        yPos = this.card.sides.top + ((<number>cards[i].position.top * 0.01) * (this.card.height * this.scalar));
      } else if (Number.isInteger(cards[i].position.bottom)) {
        yPos = this.card.sides.bottom - ((<number>cards[i].position.bottom * 0.01) * (this.card.height * this.scalar));
      }

      // Make sure values got populated for x and y, throw an error and skip drawing if they didn't
      if (xPos === undefined || yPos === undefined) {
        console.error('ERROR: Invalid inputs for input: ' + cards[i].text)
        console.error(`x,y: (${xPos},${yPos})`)
        continue;
      }

      // Actually draw the card
      ctx.fillText(cards[i].text, xPos, yPos);
    }
  }
}

export default CardDrawer;
