"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@radix-ui/themes";
import { FaArrowAltCircleRight, FaArrowAltCircleDown } from "react-icons/fa";

interface CanvasManagerProps {
  width: number;
  height: number;
}

interface Postion {
  x: number;
  y: number;
  angle: number;
}

const ACTION_COMMANDS = ["AV", "RE", "TD", "TG"];

const CanvasManager: React.FC<CanvasManagerProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [currentRotation, setCurrentRotation] = useState(0);
  const [angle, setAngle] = useState(0);
  const [pathValue, setPathValue] = useState({ x: 0 });
  const [currentPosition, setCurrentPosition] = useState<Postion>({
    x: width / 2,
    y: height / 2,
    angle: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
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
      context.strokeStyle = "red";
      context.stroke();
      context.restore();
    }
  };

  const handleButtonClick = (
    direction:
      | "up"
      | "right"
      | "down"
      | "left"
      | "up-right"
      | "up-left"
      | "down-right"
      | "down-left"
  ) => {
    if (context) {
      context.beginPath();
      context.strokeStyle = "black";

      switch (direction) {
        case "up":
          context.moveTo(startX, startY);
          context.lineTo(startX, startY - 20);
          setStartY(startY - 20);
          break;
        case "right":
          context.moveTo(startX, startY);
          context.lineTo(startX + 20, startY);
          setStartX(startX + 20);
          break;
        case "down":
          context.moveTo(startX, startY);
          context.lineTo(startX, startY + 20);
          setStartY(startY + 20);
          break;
        case "left":
          context.moveTo(startX, startY);
          context.lineTo(startX - 20, startY);
          setStartX(startX - 20);
          break;
        case "up-right":
          context.moveTo(startX, startY);
          context.lineTo(startX + 20, startY - 20);
          setStartX(startX + 20);
          setStartY(startY - 20);
          break;
        case "up-left":
          context.moveTo(startX, startY);
          context.lineTo(startX - 20, startY - 20);
          setStartX(startX - 20);
          setStartY(startY - 20);
          break;
        case "down-right":
          context.moveTo(startX, startY);
          context.lineTo(startX + 20, startY + 20);
          setStartX(startX + 20);
          setStartY(startY + 20);
          break;
        case "down-left":
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
    if (event.key === "Enter") {
      executeCommand(inputValue);
    }
  };

  const rotate = (position: Postion, angle: number): Postion => {
    if (context) {
      context.translate(position.x, position.y);
      context.rotate((angle * Math.PI) / 180);
      context.translate(-position.x, -position.y);
    }
    return position;
  };

  const moveForward = (position: Postion, distance: number): Postion => {
    if (context) {
      const newPosition = { ...position };
      context.beginPath();
      context.moveTo(position.x, position.y);
      newPosition.y = position.y - distance;
      context.lineTo(newPosition.x, newPosition.y);
      context.stroke();
      return newPosition;
    }
    return position;
  };

  const executeActionCommand = (
    command: string,
    value: number,
    position: Postion
  ): Postion => {
    switch (command) {
      case "AV":
        const distance = value;
        position = moveForward(position, distance);
        break;
      case "TD":
        position = rotate(position, value);
        // position.angle += rotationAngle;
        break;
    }
    return position;
  };

  // c cos a = b
  // y = distance  cos angle
  const executeCommand = (commandInput: string) => {
    //TODO Do validation and cleaning
    const validatedCommmand = commandInput.toUpperCase();
    const commandArgs = validatedCommmand.split(" ");

    let position = { ...currentPosition };

    for (let i = 0; i < commandArgs.length; i++) {
      const command = commandArgs[i];
      if (ACTION_COMMANDS.includes(command)) {
        i += 1;
        const commandValue = parseInt(commandArgs[i]);
        console.log(command, commandValue);
        position = executeActionCommand(command, commandValue, position);
      }
    }

    console.log(startX, startY, angle);
    setInputValue("AV 80 TD 134");

    setCurrentPosition(position);
    return;
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ border: "1px solid black" }}
      />
      <div>
        <Button onClick={() => handleButtonClick("up")}>Haut</Button>
        <Button onClick={() => handleButtonClick("right")}>Droite</Button>
        <Button onClick={() => handleButtonClick("down")}>Bas</Button>
        <Button onClick={() => handleButtonClick("left")}>Gauche</Button>
        <Button onClick={() => handleButtonClick("up-right")}>
          D Haut-Droite
        </Button>
        <Button onClick={() => handleButtonClick("up-left")}>
          D Haut-Gauche
        </Button>
        <Button onClick={() => handleButtonClick("down-right")}>
          D Bas-Droite
        </Button>
        <Button onClick={() => handleButtonClick("down-left")}>
          D Bas-Gauche
        </Button>
      </div>
      <label style={{ color: "red", display: "block" }}>
        Input Label:
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          style={{ border: "1px solid black" }}
        />
      </label>
    </div>
  );
};

export default CanvasManager;
