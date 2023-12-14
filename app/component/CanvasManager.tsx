import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@radix-ui/themes';
import { FaArrowAltCircleRight, FaArrowAltCircleDown } from 'react-icons/fa';

interface CanvasManagerProps {
  width: number;
  height: number;
}

const CanvasManager: React.FC<CanvasManagerProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [currentRotation, setCurrentRotation] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      setContext(ctx);
      // Définir le point de départ au centre du canvas
      setStartX(width / 2);
      setStartY(height / 2);
    }
  }, [width, height]);

  useEffect(() => {
    if (context) {
      drawCenterArrow();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, currentRotation]);

  const drawCenterArrow = () => {
    if (context) {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(startX, startY);
      const radians = (currentRotation * Math.PI) / 180;
      context.rotate(radians);
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(0, 20);
      context.moveTo(0, 0);
      context.lineTo(5, 10);
      context.moveTo(0, 0);
      context.lineTo(-5, 10);
      context.strokeStyle = 'red';
      context.stroke();
      context.restore();
    }
  };

  const handleButtonClick = (direction: 'up' | 'right' | 'down' | 'left' | 'up-right' | 'up-left' | 'down-right' | 'down-left') => {
    if (context) {
      context.beginPath();
      context.strokeStyle = 'black';

      switch (direction) {
        case 'up':
          context.moveTo(startX, startY);
          context.lineTo(startX, startY - 20);
          setStartY(startY - 20);
          break;
        case 'right':
          context.moveTo(startX, startY);
          context.lineTo(startX + 20, startY);
          setStartX(startX + 20);
          break;
        case 'down':
          context.moveTo(startX, startY);
          context.lineTo(startX, startY + 20);
          setStartY(startY + 20);
          break;
        case 'left':
          context.moveTo(startX, startY);
          context.lineTo(startX - 20, startY);
          setStartX(startX - 20);
          break;
        case 'up-right':
          context.moveTo(startX, startY);
          context.lineTo(startX + 20, startY - 20);
          setStartX(startX + 20);
          setStartY(startY - 20);
          break;
        case 'up-left':
          context.moveTo(startX, startY);
          context.lineTo(startX - 20, startY - 20);
          setStartX(startX - 20);
          setStartY(startY - 20);
          break;
        case 'down-right':
          context.moveTo(startX, startY);
          context.lineTo(startX + 20, startY + 20);
          setStartX(startX + 20);
          setStartY(startY + 20);
          break;
        case 'down-left':
          context.moveTo(startX, startY);
          context.lineTo(startX - 20, startY + 20);
          setStartX(startX - 20);
          setStartY(startY + 20);
          break;
        default:
          break;
      }

      context.stroke();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      executeCommand(inputValue);
    }
  };

  const executeCommand = (command: string) => {
    switch (command.toUpperCase()) {
      case 'HAUT':
        handleButtonClick('up');
        break;
      case 'DROITE':
        handleButtonClick('right');
        break;
      case 'BAS':
        handleButtonClick('down');
        break;
      case 'GAUCHE':
        handleButtonClick('left');
        break;
      case 'D HAUT-DROITE':
        handleButtonClick('up-right');
        break;
      case 'D HAUT-GAUCHE':
        handleButtonClick('up-left');
        break;
      case 'D BAS-DROITE':
        handleButtonClick('down-right');
        break;
      case 'D BAS-GAUCHE':
        handleButtonClick('down-left');
        break;
      default:
        // Gérer d'autres commandes si nécessaire
        break;
    }

    setInputValue('');
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ border: '1px solid black' }}
      />
      <div>
        <Button onClick={() => handleButtonClick('up')}>Haut</Button>
        <Button onClick={() => handleButtonClick('right')}>Droite</Button>
        <Button onClick={() => handleButtonClick('down')}>Bas</Button>
        <Button onClick={() => handleButtonClick('left')}>Gauche</Button>
        <Button onClick={() => handleButtonClick('up-right')}>D Haut-Droite</Button>
        <Button onClick={() => handleButtonClick('up-left')}>D Haut-Gauche</Button>
        <Button onClick={() => handleButtonClick('down-right')}>D Bas-Droite</Button>
        <Button onClick={() => handleButtonClick('down-left')}>D Bas-Gauche</Button>
      </div>
      <label style={{ color: 'red', display: 'block' }}>
        Input Label:
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          style={{ border: '1px solid black' }}
        />
      </label>
    </div>
  );
};

export default CanvasManager;
