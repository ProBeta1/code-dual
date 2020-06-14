import React, { useState, useEffect } from "react";
import DuelCoder from "./DuelCoder";

function Duel(props) {
  const { name, opponent } = props;
  const [duelWinner, setDuelWinner] = useState("TBA");
  const [problemAssigned, setProblemAssigned] = useState("https://codeforces.com/problemset/problem/1366/F");

  const [t1, setT1] = useState(-1);
  const [t2, setT2] = useState(-1);

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  const calc = (tmp, id) => {
    for (let i = 0; i < tmp.length; i++) {
      let prob = tmp[i].problem.contestId + tmp[i].problem.index;
      let verdict = tmp[i].verdict;
      let time = tmp[i].creationTimeSeconds;
      if (prob === problemAssigned && verdict === "OK") {
        id === 1 ? setT1(time) : setT2(time);
        break;
      }
    }
  };

  const declareWinner = () => {

    let p = Math.floor(Math.random() * (20)) + 1;
    p<=10 ? setDuelWinner(name):setDuelWinner(opponent);



    // if( t1 === -1 && t2 === -1){
    //   setDuelWinner("No Winner , All Loosers !!")
    // }
    // else if(t1 === -1 && t2 !== -1){
    //   setDuelWinner(opponent);
    // }
    // else if(t1!== -1 && t2 === -1){
    //   setDuelWinner(name);
    // }
    // else{
    //   (t1 > t2)?setDuelWinner(opponent):setDuelWinner(name);
    // }
  }

  useEffect(() => {
    // calculate challenge problem rating and render it
    let p = Math.floor(Math.random() * (1366)) + 1;
    let d = Math.floor(Math.random() * (30)) + 1;
    let ind = 'A';
    if(d>10){
      ind = 'B';
    }
    else if(d>20){
      ind='C';
    }
    setProblemAssigned(`https://codeforces.com/problemset/problem/${p}/${ind}`)

  },[])

  const handleClick = async () => {
    // await fetch(
    //   `${proxyUrl}https://codeforces.com/api/user.status?handle=${name}&from=1&count=20`
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     let tmp = res["result"];
    //     calc(tmp, 1);
    //   });

    // await fetch(
    //   `${proxyUrl}https://codeforces.com/api/user.status?handle=${opponent}&from=1&count=20`
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     let tmp = res["result"];
    //     calc(tmp, 2);
    //   });

    declareWinner(); 

  };

  return (
    <div className="bg-gray-600  h-screen">
      <div className="flex justify-center mx-40 bg-red-200  p-2 text-5xl text-teal-400 font-mono">
        Let the Fight Begin !!
      </div>

      <div className="flex flex-row justify-center">
        <DuelCoder name={name} opponent={opponent} />
      </div>

    <div className="flex flex-row justify-center bg-red-300">
      Problem : <a href={problemAssigned} target="_blank">Link</a>
    </div>

      {duelWinner === "TBA" ? (
        <button
          onClick={handleClick}
          className="bg-blue-400 mx-30 p-4 w-full text-3xl justify-center flex item-center"
        >
          FETCH RESULTS
        </button>
      ) : (
        <div className="flex flex-wrap justify-center bg-gray-400  rounded-lg p-10 mx-40 text-4xl text-green-600">
          And the Winner is
          <h3 className="mx-10 text-orange-500"> {duelWinner}</h3>
        </div>
      )}
    </div>
  );
}

export default Duel;
