import React, { useState } from "react";
import Timer from "react-compound-timer";


function DuelCoder(props) {

  return (
    <div className="bg-gray-400 w-1/3 rounded-lg p-10 m-10">
      <div>
        {props.name} vs {props.opponent}
      </div>

      <div>
        <Timer >
          {({ start, resume, pause, stop, reset, timerState }) => (
            <React.Fragment>
              <div className="flex flex-wrap justify-center">
                <div className="bg-green-400 p-4 my-4 flex mx-1 justify-center">
                  <Timer.Days />{" "}
                </div>
                <div className="bg-green-400 p-4 my-4 flex mx-1 justify-center">
                  <Timer.Hours />{" "}
                </div>{" "}
                <div className="bg-green-400 p-4 my-4 flex mx-1 justify-center">
                  <Timer.Minutes />{" "}
                </div>
                <div className="bg-green-400 p-4  my-4 flex mx-1 justify-center">
                  <Timer.Seconds />{" "}
                </div>{" "}
              </div>
              <br />
            </React.Fragment>
          )}
        </Timer>{" "}
      </div>

    </div>
  );
}

export default DuelCoder;