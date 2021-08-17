import * as React from 'react';
import { useRef, useEffect } from 'react';

// Element drawn onto the canvas's type
type Drawable = {
  text: string
  textAlign: 'left' | 'center' | 'right',
  fillStyle: string,
  font: string,
  position: {
    top: 'center' | number,
    bottom: 'center' | number,
    left: 'center' | number,
    right: 'center' | number,
  }
}

// Canvas's type
type Canvas = {
  drawables?: Drawable[],
}

// Component to create and draw to the canvas
const Canvas = (props: Canvas): JSX.Element => {
  const canvasRef: React.RefObject<HTMLCanvasElement> = useRef(null);
  // const cardDrawer = new CardDrawer();

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

    // Clear canvas
    ctx.fillStyle = '#262626';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draws main card components
    // cardDrawer.drawCardBase(ctx);
    // cardDrawer.drawCardComponents(ctx, props.drawnComponents);

    // Debug outputs for sizing
    ctx.fillStyle = 'tomato';
    ctx.font = '12px serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Canvas Width: ${canvas.width}   Canvas Height: ${canvas.height}`, 8, 16);
    ctx.fillText(`Card Width: TBD   Card Height: TBD`, 8, 32);
    // ctx.fillText(`Card Width: ${cardDrawer.cardWidth}   Card Height: ${cardDrawer.cardHeight}`, 8, 32);
    console.log(ctx);
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
