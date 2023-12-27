"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@radix-ui/themes";
import { FaArrowAltCircleRight, FaArrowAltCircleDown } from "react-icons/fa";

interface CanvasManagerProps {
  width: number;
  height: number;
  commandInput?: string;
}

interface Position {
  x: number;
  y: number;
  angle: number;
}

const ACTION_COMMANDS = ["AV", "RE", "TD", "TG"];

const fancyCircle = "REPETE 20 [REPETE 180 [AV 1 TD 2] TD 18]";
const simpleSquare = fancyCircle; // "REPETE 4 [AV 100 TD 90]";

const CanvasManager: React.FC<CanvasManagerProps> = ({
  width,
  height,
  commandInput,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [inputValue, setInputValue] = useState<string>(simpleSquare);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [angle, setAngle] = useState(0);
  const [pathValue, setPathValue] = useState({ x: 0 });
  const [currentPosition, setCurrentPosition] = useState<Position>({
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
      if (commandInput) {
        injectCommand(commandInput);
      }
    }
  }, [width, height, commandInput]);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      injectCommand(inputValue);
    }
  };

  const injectCommand = (injectedCommand: string) => {
    let position = { ...currentPosition };

    const validatedCommmand = injectedCommand
      .toUpperCase()
      .replace(/\s+/g, " ")
      .replace("\n", " ");
    const commandArgs = validatedCommmand.split(" ");
    position = executeCommand(commandArgs, position);
    setCurrentPosition(position);
  };

  const rotate = (position: Position, angle: number): Position => {
    if (context) {
      context.translate(position.x, position.y);
      context.rotate((angle * Math.PI) / 180);
      context.translate(-position.x, -position.y);
    }
    return position;
  };

  const moveForward = (position: Position, distance: number): Position => {
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
    position: Position
  ): Position => {
    switch (command) {
      case "AV":
        position = moveForward(position, value);
        break;
      case "RE":
        position = moveForward(position, -value);
        break;
      case "TD":
        position = rotate(position, value);
        // position.angle += rotationAngle;
        break;
      case "TG":
        position = rotate(position, -value);
        // position.angle += rotationAngle;
        break;
    }
    return position;
  };

  // c cos a = b
  // y = distance  cos angle
  const executeCommand = (commands: string[], position: Position): Position => {
    //TODO Do validation and cleaning

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      if (ACTION_COMMANDS.includes(command)) {
        i += 1;
        const commandValue = parseInt(commands[i]);
        console.log(command, commandValue);
        position = executeActionCommand(command, commandValue, position);
      } else if (command === "REPETE") {
        i += 1;
        const loopCount = parseInt(commands[i]);

        const loopCommands = [];
        i += 1;
        console.log(commands[i]);

        if (!commands[i].startsWith("[")) {
          console.log("ERROR");
          return position;
        }
        const starter = commands[i].slice(1);
        loopCommands.push(starter);

        let openCount = 1;
        let closeCount = 0;

        while (openCount !== closeCount) {
          i += 1;
          if (commands[i].startsWith("[")) {
            openCount++;
          }
          if (commands[i].endsWith("]")) {
            closeCount++;
          }
          if (openCount === closeCount) {
            const ender = commands[i].slice(0, -1);
            loopCommands.push(ender);
          } else {
            loopCommands.push(commands[i]);
          }
        }

        for (let k = 0; k < loopCount; k++) {
          position = executeCommand(loopCommands, position);
        }
      }
    }

    console.log(startX, startY, angle);

    return position;
  };

  return (
    <div className="bg-neutral-200">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="bg-neutral-50"
      />
      <label>
        Input Label:
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          style={{ border: "1px solid black" }}
          className="w-full"
        />
      </label>
    </div>
  );
};

export default CanvasManager;
