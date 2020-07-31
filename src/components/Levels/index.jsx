import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";

const Levels = ({ levels, academyLevel }) => {
  const [steps, setSteps] = useState([]);
  useEffect(() => {
    const stepsLevel = levels.map((step) => ({ title: step.toUpperCase() }));
    setSteps(stepsLevel);
  }, [levels]);
  return (
    <div className="levelsContainer">
      <Stepper
        steps={steps}
        activeStep={academyLevel}
        circleTop={10}
        completeColor="#0cb765"
        completeTitleColor="#0cb765"
        completeBorderColor="#0cb765"
        completeBarColor="#0cb765"
        activeColor="#d31017"
        activeTitleColor="#d31017"
      />
      {/* <h2 className="headingLevels">Débutant</h2> */}
    </div>
  );
};

export default React.memo(Levels);
