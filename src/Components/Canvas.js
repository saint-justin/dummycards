import React, { useRef, useEffect } from 'react';
import CardDrawer from './CardDrawer';

// Component to create and draw to the canvas
const Canvas = (props) => {
  const canvasRef = useRef(null);
  const cardDrawer = new CardDrawer();

  // Actually draws onto the canvas
  const draw = (ctx) => {
    // Calculate canvas width and height
    const canvas = canvasRef.current;
    canvas.width = canvasRef.current.clientWidth;
    canvas.height = canvasRef.current.clientHeight;
    cardDrawer.updateCardSize(props.dimensions[0], props.dimensions[1]);
    cardDrawer.updateCanvasSize(canvas);

    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draws main card components
    cardDrawer.drawCardBase(ctx);

    // Debug outputs for sizing
    ctx.fillStyle = 'white';
    ctx.font = '12px serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Canvas Width: ${cardDrawer.canvasWidth}   Canvas Height: ${cardDrawer.canvasHeight}`, 8, 8);
    ctx.fillText(`Card Width: ${cardDrawer.cardWidth}   Card Height: ${cardDrawer.cardHeight}`, 8, 28);
  };

  // Set up the canvas w/ info needed for drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas to fill the parent div
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    // Actually draw
    draw(context);
  }, [draw]);

  // Resize the canvas when the window's size gets changed
  const redraw = () => draw(canvasRef.current.getContext('2d'));
  useEffect(() => {
    // const canvas = canvasRef.current;
    window.addEventListener('resize', redraw);
    return () => window.removeEventListener('resize', redraw);
  });

  return <canvas ref={canvasRef} {...props}/>;
};

export default Canvas;
