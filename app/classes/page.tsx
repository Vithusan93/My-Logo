"use client";
import ClassCard, { PublicLogoClass } from "@/components/class/ClassCard";
import { useEffect, useState } from "react";
import TaskPanel from "./_components/TaskPanel";
import ClassPanel from "./_components/ClassPanel";
import { Task } from "@prisma/client";
import TaskDetail from "./_components/TaskDetail";
import TaskResponses, { TaskResponseDetail } from "./_components/TaskResponses";
import { useSession } from "next-auth/react";

interface JoinedClasses {
  logoClass: PublicLogoClass;
}

const ClassesPage = () => {
  const [logoClass, setLogoClass] = useState<PublicLogoClass>();

  const [task, setTask] = useState<Task>();
  const [taskResponse, setTaskResponse] = useState<TaskResponseDetail>();
  const { data: session } = useSession();

  if (!session) {
    return <div>You are not logged in</div>;
  }

  const isAdmin =
    session.user_id === logoClass?.instructor.id ||
    (logoClass?.assistantInstructor
      ? session.user_id === logoClass?.assistantInstructor.id
      : false);

  return (
    <div className="pt-14 p-2 h-screen">
      <div className="bg-neutral-50 rounded-lg overflow-hidden shadow-md h-full">
        <div className="flex h-full">
          <ClassPanel onClassSelect={setLogoClass} />
          <TaskPanel
            logoClass={logoClass}
            onTaskSelect={setTask}
            isAdmin={isAdmin}
          />
          {isAdmin && (
            <TaskResponses task={task} onResponseSelect={setTaskResponse} />
          )}
          <TaskDetail
            task={task}
            responseId={taskResponse ? taskResponse.student.id : 0}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
