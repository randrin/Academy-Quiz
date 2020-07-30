import React from "react";

const ProgressBar = ({ idQuestion, maxQuestions }) => {
  const actualQuestion = idQuestion + 1;
  return (
    <>
      <div className="percentage">
        <div className="progressPercent">{`Question ${actualQuestion}/${maxQuestions}`}</div>
        <div className="progressPercent">Progression {actualQuestion}0%</div>
      </div>
      <div className="progressBar">
        <div
          className="progressBarChange"
          style={{ width: `${actualQuestion}0%` }}
        ></div>
      </div>
    </>
  );
};

export default React.memo(ProgressBar);
