import { LogoClass } from "@prisma/client";
import React, { useEffect, useState } from "react";

const OwnedClassList = () => {
  const [classes, setClasses] = useState<LogoClass[]>([]);

  useEffect(() => {
    const getClasses = async () => {
      const response = await fetch("/api/classes/");
      const ownedClasses: LogoClass[] = await response.json();
      setClasses(ownedClasses);
    };
    getClasses();
  }, []);

  return (
    <div>
      OwnedClassList
      <div>
        {classes.map((ownedClass) => (
          <div key={ownedClass.id}>
            {ownedClass.name}
            <div>{ownedClass.password}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnedClassList;
