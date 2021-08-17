import * as React from 'react';
import { useRef, useEffect } from 'react';
import CardDrawer from '../utils/CanvasHelper'
import { Drawable, Size } from '../types' 

// Canvas's type
type Canvas = {
  size: Size
  drawables?: Drawable[],
}

// Component to create and draw to the canvas
const Canvas = (props: Canvas): JSX.Element => {
  const canvasRef: React.RefObject<HTMLCanvasElement> = useRef(null);
  const cardDrawer = new CardDrawer();
  cardDrawer.updateCardSize(props.size.height, props.size.width);

  // Actually draws onto the canvas
  const draw = (ctx: CanvasRenderingContext2D) => {
    // Check canvas is real
    if(!canvasRef.current) {
      console.error('ERR: Canvas Element Null')
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
    cardDrawer.drawCardComponents(ctx, props.drawables || []);

    // Debug outputs for sizing
    ctx.fillStyle = 'tomato';
    ctx.font = '12px serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Canvas Width: ${canvas.width}   Canvas Height: ${canvas.height}`, 8, 16);
    ctx.fillText(`Card Width: ${cardDrawer.getCardInfo().height}   Card Height: ${cardDrawer.getCardInfo().width}`, 8, 32);
  };

  // Set up the canvas w/ info needed for drawing
  useEffect(() => {
    // Check canvas is real
    if(!canvasRef.current) {
      console.error('ERROR: Canvas Element Null')
      return;
    }

    // Set canvas to fill 100% and run the first draw
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    // Checking context is real drawing
    if (!ctx) {
      console.error('ERROR: Canvas Context Null')
      return;
    }
    draw(ctx);
  }, [draw]);

  // Resize the canvas when the window's size gets changed
  const redraw = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) {
      console.error('ERROR: Canvas Context Null')
      return;
    }
    draw(ctx);
  }

  // Run-on-first-only to force redraws on window resize
  useEffect(() => {
    window.addEventListener('resize', redraw);
    return () => window.removeEventListener('resize', redraw);
  });

  return <canvas ref={canvasRef} {...props}/>;
};

export default Canvas;
