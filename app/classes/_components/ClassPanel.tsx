import React from "react";
import { useEffect, useState } from "react";
import ClassCard, { PublicLogoClass } from "@/components/class/ClassCard";

interface JoinedClasses {
  logoClass: PublicLogoClass;
}
const ClassPanel = ({
  onClassSelect,
}: {
  onClassSelect: (logoClass: PublicLogoClass) => void;
}) => {
  const [classes, setClasses] = useState<JoinedClasses[]>([]);
  const [selectedClass, setSelectedClass] = useState<PublicLogoClass>();

  useEffect(() => {
    const getJoinedClasses = async () => {
      const response = await fetch("/api/classes/join/");
      if (response.status === 200) {
        const data = await response.json();
        setClasses(data);
      }
    };
    getJoinedClasses();
  }, []);

  return (
    <div className="w-1/4">
      <div className="bg-neutral-200 text-center p-1 border-r-2 border-gray-400">
        <span className="font-bold">Classes</span>
      </div>
      <div className="">
        {classes.map((joinedClass) => (
          <div
            key={joinedClass.logoClass.name}
            onClick={() => {
              setSelectedClass(joinedClass.logoClass);
              onClassSelect(joinedClass.logoClass);
            }}
            className={`cursor-pointer ${
              selectedClass?.id === joinedClass.logoClass.id && "bg-yellow-500"
            }`}
          >
            <ClassCard logoClass={joinedClass.logoClass} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassPanel;
