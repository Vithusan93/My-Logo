"use client";
import ClassCard, { PublicLogoClass } from "@/components/class/ClassCard";
import { useEffect, useState } from "react";
import TaskPanel from "./_components/TaskPanel";
import ClassPanel from "./_components/ClassPanel";
import { Task } from "@prisma/client";
import TaskDetail from "./_components/TaskDetail";

interface JoinedClasses {
  logoClass: PublicLogoClass;
}

const ClassesPage = () => {
  const [classes, setClasses] = useState<JoinedClasses[]>([]);
  const [logoClass, setLogoClass] = useState<PublicLogoClass>();

  const [task, setTask] = useState<Task>();

  return (
    <div className="pt-14 p-2">
      <div className="bg-neutral-50 rounded-lg overflow-hidden shadow-md">
        <div className="flex">
          <ClassPanel onClassSelect={setLogoClass} />
          <TaskPanel logoClass={logoClass} onTaskSelect={setTask} />
          <TaskDetail />
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
