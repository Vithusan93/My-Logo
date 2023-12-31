import { Button } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";

const ACTION_COMMANDS = ["AV", "RE", "TD", "TG"];

interface Position {
  x: number;
  y: number;
  angle: number;
}
const simpleSquare = "REPETE 4 [AV 100 TD 90]";

interface Procedure {
  commands: string[];
}

const LogoDisplay = ({
  width,
  height,
  commandInput,
}: {
  width: number;
  height: number;
  commandInput?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Position>({
    x: width / 2,
    y: height / 2,
    angle: 0,
  });
  const [inputValue, setInputValue] = useState<string>(simpleSquare);
  const [procedureList, setProcedures] = useState({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      setContext(ctx);
      // Définir le point de départ au centre du canvas
      console.log("injection", commandInput);

      if (commandInput) {
        injectCommand(commandInput);
      }
    }
  }, [width, height, commandInput]);

  const injectCommand = (injectedCommand: string) => {
    let position = { ...currentPosition };
    let procedures = { ...procedureList };

    const validatedCommmand = injectedCommand
      .toUpperCase()
      .replace(/\s+/g, " ")
      .replace("\n", " ");
    const commandArgs = validatedCommmand.split(" ");
    [position, procedures] = executeCommand(commandArgs, position, procedures);
    setCurrentPosition(position);
    setProcedures(procedures);
    console.log(procedures);
  };

  const translate = (position: Position, distance: number): Position => {
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

  const rotate = (position: Position, angle: number): Position => {
    if (context) {
      context.translate(position.x, position.y);
      context.rotate((angle * Math.PI) / 180);
      context.translate(-position.x, -position.y);
    }
    return position;
  };

  const reset = () => {
    if (context) {
      context.resetTransform();
      context.clearRect(0, 0, width, height);
      setCurrentPosition({
        x: width / 2,
        y: height / 2,
        angle: 0,
      });
    }
  };

  const executeActionCommand = (
    command: string,
    value: number,
    position: Position
  ): Position => {
    switch (command) {
      case "AV":
        position = translate(position, value);
        break;
      case "RE":
        position = translate(position, -value);
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

  const executeCommand = (
    commands: string[],
    position: Position,
    procedures: any
  ): [Position, Procedure[]] => {
    //TODO Do validation and cleaning
    console.log(commands);

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
          return [position, procedures];
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
          [position, procedures] = executeCommand(
            loopCommands,
            position,
            procedures
          );
        }
      } else if (command === "POUR") {
        //TODO Handle params
        i += 1;
        const procedureName = commands[i];
        i += 1;

        const procedureCommands = [];
        const procedureParams = [];
        let fetchingParams = true;
        while (commands[i] != "FIN") {
          if (fetchingParams && commands[i].startsWith(":")) {
            procedureParams.push(commands[i]);
          } else {
            fetchingParams = false;
            procedureCommands.push(commands[i]);
          }
          i += 1;
        }
        const procedure = {
          commands: procedureCommands,
          params: procedureParams,
        };
        procedures[procedureName] = procedure;
      } else if (command in procedures) {
        let procedureCommands = [...procedures[command].commands];
        console.log(procedureCommands);
        for (let j = 0; j < procedures[command].params.length; j++) {
          i += 1;
          let paramValue = commands[i];
          let paramKey = procedures[command].params[j];
          procedureCommands = procedureCommands.map((item) =>
            item.replace(paramKey, paramValue)
          );
        }
        console.log(procedureCommands);

        [position, procedures] = executeCommand(
          procedureCommands,
          position,
          procedures
        );
      }
    }

    return [position, procedures];
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      injectCommand(inputValue);
    }
  };

  return (
    <div className="bg-neutral-300 h-full">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="bg-neutral-100 mx-auto h-full"
      />
      <div>
        <Button variant="surface" onClick={() => reset()}>
          Reset
        </Button>
      </div>
      <div className="flex p-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="w-full border-2 border-yellow-500 px-2"
          placeholder="Type your commands and press Enter to execute"
        />
        <Button
          onClick={() => {
            injectCommand(inputValue);
          }}
        >
          Execute
        </Button>
      </div>
    </div>
  );
};

export default LogoDisplay;
