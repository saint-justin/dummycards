import * as React from 'react';
import { useRef, useEffect } from 'react';
import CardDrawer from '../../utils/CardDrawer';
import { Drawable, Size } from '../../utils/types';

// Canvas's type
type CanvasProps = {
  size: Size, // Size of the card component (height/width)
  drawables?: Drawable[], // List of all the components to be draw to the card
};

// Component to create and draw to the canvas
const Canvas = ({ size, drawables = [] } : CanvasProps): JSX.Element => {
  const canvasRef: React.RefObject<HTMLCanvasElement> = useRef(null);
  const cardDrawer = new CardDrawer();
  // const { size, drawables } = props;

  // Actually draws onto the canvas
  const draw = (ctx: CanvasRenderingContext2D) => {
    if (!canvasRef.current) {
      console.error('ERR: Canvas Element Null');
      return;
    }

    // Calculate canvas width and height
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = canvasRef.current.clientWidth;
    canvas.height = canvasRef.current.clientHeight;
    cardDrawer.updateCanvasSize(canvas);

    // Clear canvas
    ctx.fillStyle = '#262626';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draws main card components
    cardDrawer.drawCardBase(ctx);
    cardDrawer.drawCardComponents(ctx, drawables || []);

    // Debug outputs for sizing
    ctx.fillStyle = 'tomato';
    ctx.font = '12px serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Canvas Width: ${canvas.width}   Canvas Height: ${canvas.height}`, 8, 16);
    ctx.fillText(`Card Width: ${cardDrawer.getCardInfo().height}   Card Height: ${cardDrawer.getCardInfo().width}`, 8, 32);
  };

  // Redraws the canvas
  const redraw = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) {
      console.error('ERROR: Canvas Context Null');
      return;
    }
    draw(ctx);
  };

  // Set up the canvas w/ info needed for drawing
  useEffect(() => {
    // Check canvas is real
    if (!canvasRef.current) {
      console.error('ERROR: Canvas Reference Null');
      return;
    }

    // Set canvas to fill 100% and run the first draw
    const canvas = canvasRef.current;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    // Checking context is real drawing
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('ERROR: Canvas Context Null');
      return;
    }

    // Updates card sizing & draws
    cardDrawer.updateCardSize(size.height, size.width);
    draw(ctx);
  }, [size, drawables]);

  // Initializer to add event listeners to the window for resize events
  useEffect(() => {
    window.addEventListener('resize', redraw);
    return () => window.removeEventListener('resize', redraw);
  }, []);

  return <canvas ref={canvasRef} data-refresh={size} />;
};

// Appending default props for optional properties
Canvas.defaultProps = {
  drawables: [],
};

export default Canvas;
