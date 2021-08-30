import * as _ from 'lodash';
import { Drawable, Card } from './types';

// Class to facilitate drawing cards to the canvas
class CardDrawer {
  scalar: number;

  canvas: {
    width: number | undefined,
    height: number | undefined,
  };

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
      },
    };
  }

  getCardInfo(): Card {
    return _.cloneDeep(this.card);
  }

  // Setter for card sizes
  updateCardSize(cardHeight: number, cardWidth: number): void {
    if (cardHeight < 1 || cardWidth < 1) {
      throw new Error('ERROR: Card size must be positive');
    }
    this.card.height = cardHeight;
    this.card.width = cardWidth;
  }

  // Setter for canvas sizes
  updateCanvasSize(canvas: HTMLCanvasElement): void {
    if (canvas.width < 1 || canvas.height < 1) {
      throw new Error('ERROR: Canvas size must be at least 1x1');
    }
    this.canvas.width = canvas.width;
    this.canvas.height = canvas.height;
  }

  // Fxn to draw the basic card to the canvas
  drawCardBase(ctx: CanvasRenderingContext2D): void {
    // Check all values used exist
    if (!this.card.height || !this.card.width) {
      throw new Error('ERROR: Tried to draw card base with missing card size values');
    } else if (!this.canvas.height || !this.canvas.width) {
      throw new Error('ERROR: Tried to draw card base with missing canvas size values');
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

  // Actually try to draw the card components
  drawCardComponents(ctx: CanvasRenderingContext2D, cards: Drawable[]): void {
    // Checking to make sure values used will exist
    if (!this.card.width || !this.card.height || this.card.width < 1 || this.card.height < 1) {
      throw new Error('ERROR: Tried to draw card components with invalid card measures');
    }

    if (!this.card.sides.left
      || !this.card.sides.right
      || !this.card.sides.top
      || !this.card.sides.bottom) {
      throw new Error('ERROR: Tried to draw card components with invalid card sides');
    }

    if (!this.canvas.height || !this.canvas.width
      || this.canvas.height < 1 || this.canvas.width < 1) {
      throw new Error('ERROR: Tried to draw card components with invalid canvas measures');
    }

    // Draw out all chunks of text onto the canvas
    const amt = cards.length;
    for (let i = 0; i < amt; i += 1) {
      ctx.fillStyle = cards[i].fillStyle || 'black';
      ctx.font = cards[i].font || '20px serif';
      ctx.textAlign = cards[i].textAlign || 'center';
      let xPos: number | undefined;
      let yPos: number | undefined;

      // Determining X Position
      if (cards[i].position.left === 'center') {
        xPos = this.canvas.width / 2;
      } else if (Number.isInteger(cards[i].position.left)) {
        xPos = this.card.sides.left;
        xPos += ((<number>cards[i].position.left * 0.01) * (this.card.width * this.scalar));
      } else if (Number.isInteger(cards[i].position.right)) {
        xPos = this.card.sides.right;
        xPos -= ((<number>cards[i].position.right * 0.01) * (this.card.width * this.scalar));
      }

      // Determining Y Position
      if (cards[i].position.top === 'center') {
        yPos = this.canvas.height / 2;
      } else if (Number.isInteger(cards[i].position.top)) {
        yPos = this.card.sides.top;
        yPos += ((<number>cards[i].position.top * 0.01) * (this.card.height * this.scalar));
      } else if (Number.isInteger(cards[i].position.bottom)) {
        yPos = this.card.sides.bottom;
        yPos -= ((<number>cards[i].position.bottom * 0.01) * (this.card.height * this.scalar));
      }

      // Make sure values got populated for x and y, throw an error and skip drawing if they didn't
      if (xPos === undefined || yPos === undefined) {
        console.error(`ERROR: Invalid inputs for input: ${cards[i].text}`);
        console.error(`x,y: (${xPos},${yPos})`);
      } else {
        // Draw the card if values are valid
        ctx.fillText(cards[i].text, xPos, yPos);
      }
    }
  }
}

export default CardDrawer;
