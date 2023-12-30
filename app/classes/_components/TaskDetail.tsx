import CanvasManager from "@/app/CanvasManager";
import React from "react";

const TaskDetail = () => {
  return (
    <div className="w-full">
      <div className="bg-neutral-200 text-center p-1 border-r-2 border-gray-400">
        <span className="font-bold">Task Detail</span>
      </div>
      <div>
        <CanvasManager width={800} height={600} />
      </div>
    </div>
  );
};

export default TaskDetail;
