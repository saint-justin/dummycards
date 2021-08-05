import React, { useRef, useEffect } from 'react';

// Component to draw to specializaed canvas in React
const Canvas = (props) => {
  const canvasRef = useRef(null);

  const draw = (ctx) => {
    const canvas = canvasRef.current;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.beginPath();
    // ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    // ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas to fill the parent div
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth - 16;
    canvas.height = canvas.offsetHeight - 16;

    // Our draw come here
    draw(context);
  }, [draw]);

  return <canvas ref={canvasRef} {...props}/>;
};

export default Canvas;
