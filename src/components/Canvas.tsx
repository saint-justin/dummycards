import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import CardDrawer from '../utils/CanvasHelper';
import { Drawable, Size } from '../types';

// Canvas's type
type Canvas = {
  size: Size // Size of the card component (height/width)
  drawables?: Drawable[], // List of all the components to be draw to the card
  setRedrawInParent:  (child: (height: number, width: number) => void) => void // Fxn to give parent a way to force a redraw
}

// Component to create and draw to the canvas
const Canvas = (props: Canvas): JSX.Element => {
  const canvasRef: React.RefObject<HTMLCanvasElement> = useRef(null);
  const cardDrawer = new CardDrawer();

  // Actually draws onto the canvas
  const draw = (ctx: CanvasRenderingContext2D) => {
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
    console.log('EFFECT 01 --> Trying to update!')

    // Check canvas is real
    if(!canvasRef.current) {
      console.error('ERROR: Canvas Reference Null')
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

    // Updates card sizing
    cardDrawer.updateCardSize(props.size.height, props.size.width);
    draw(ctx);
  });

  // Resize the canvas when the window's size gets changed
  const redraw = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) {
      console.error('ERROR: Canvas Context Null')
      return;
    }
    draw(ctx);
  }

  const resizeAndRedraw = (height: number, width: number) => {
    cardDrawer.updateCardSize(height, width);
    redraw();
  }

  // Run-onnce to force redraws
  useEffect(() => {
    // Sets up the parent redraw function on setup
    props.setRedrawInParent(resizeAndRedraw);
    console.log('Parent redraw set up!')

    // Event listener to redraw on resize events
    window.addEventListener('resize', redraw);
    return () => window.removeEventListener('resize', redraw);
  }, []);

  return <canvas ref={canvasRef} data-refresh={props.size} />;
};

export default Canvas;
