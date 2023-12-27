"use client";
import ClassCard, { PublicLogoClass } from "@/components/class/ClassCard";
import React, { useEffect, useState } from "react";

interface JoinedClasses {
  logoClass: PublicLogoClass;
}

const JoinedClasses = () => {
  const [classes, setClasses] = useState<JoinedClasses[]>([]);
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
    <div>
      <div>
        {classes.map((joinedClass) => (
          <ClassCard logoClass={joinedClass.logoClass} />
        ))}
      </div>
    </div>
  );
};

export default JoinedClasses;
