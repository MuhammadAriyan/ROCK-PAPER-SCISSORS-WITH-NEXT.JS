
'use client'

import React, { useState } from 'react';

type typeOfRPS = "ROCK" | "PAPER" | "SCISSORS";

const RPSgame = () => {
  // STATE
  const [playerChoice, setPlayerChoice] = useState<typeOfRPS | null>(null);
  const [computerChoice, setComputerChoice] = useState<typeOfRPS>("ROCK"); // Default value
  const [image, setImage] = useState<string | null>(null);
  const [cImage, setCImage] = useState<string>('/questionMark.png');
  const [result, setResult] = useState<string | null>(null);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [selected, setSelected] = useState<boolean>(false);

  // PLAYER CHOICE & IMAGE SETTER
  const imagesetter = (rps: typeOfRPS) => {
    setSelected(true);
    setPlayerChoice(rps);
    setCImage('/questionMark.png');
    setImage(`/${rps.toLowerCase()}.png`);
  };

  // MAIN GAME ALGORITHM
  const game = (playerchoice: typeOfRPS, computerPlay: () => void) => {
    computerPlay();

    let ab = 0
    const interval = setInterval(() => {
      setCImage(`/paper.png`);
      if(ab>10 && 20>ab)setCImage(`/rock.png`);
      if(ab>20 && 30>ab)setCImage(`/scissors.png`);
      if(ab>30 && 40>ab)setCImage(`/rock.png`);
      if(ab>40 && 50>ab)setCImage(`/scissors.png`);
      if(ab>50 && 20>ab)setCImage(`/paper.png`)
      if(ab>20 && 30>ab)setCImage(`/scissors.png`);
      ab++
      if (ab > 100) {
        clearInterval(interval);
        setCImage(`/${computerChoice.toLowerCase()}.png`);
        setSelected(false)
      } 
    },10);

    // Update computer choice image
    
    // Decide r esult
    console.log(`${playerChoice} vs ${computerChoice}`);

    if (playerchoice === null) {
      alert("Please choose a choice");
    } else if (playerChoice === computerChoice) {
      setResult('TIE');
    } else if (
      (playerChoice === "ROCK" && computerChoice === "SCISSORS") ||
      (playerChoice === "PAPER" && computerChoice === "ROCK") ||
      (playerChoice === "SCISSORS" && computerChoice === "PAPER")
    ) {
      setResult("player wins");
      setTimeout(()=>{
        setPlayerScore(prevScore => prevScore + 10);
      },1000);
      
    } else {
      setResult("computer wins");
      setTimeout(()=>{
        setComputerScore(prevScore => prevScore + 10);
      },1000)
      
    }
  };

  // COMPUTER CHOICE PICKER
  const computerPlay = () => {
    const choices: typeOfRPS[] = ["SCISSORS", "PAPER", "ROCK"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const res = choices[randomIndex];
    setComputerChoice(res);
    console.log(res);
  };

  return (
    <div className="h-screen bg-cover  relative sm:p-1 md:p-3 lg:p-4 flex flex-col gap-2 justify-center align-middle text-center bg-gradient-ial from-lime-400 to-lime-600 font-mono font-bold ">
      <div className=" rounded-md object-cover shadow-md bg-slate-200 p-3 sm:m-2 md:m-3 lg:m-6 xl:m-10">
        <h1 className=" sm:m-1 p-4 text-lg md:m-2 lg:m-3 xl:m-4 bg-lime-400 rounded-lg border-4 border-black ">ROCK PAPER SCISSOR GAME</h1>
        <div className="p-3 bg-black text-white rounded-xl m-2">PICK YOUR CARD</div>
        <div className="flex p-2 justify-around">
          <button className='w-1/3 md:w-1/4 object-cover bg-slate-200 p-2 rounded-xl shadow-sm shadow-gray-400 hover:shadow-none duration-1000 text-sm' onClick={() => imagesetter("ROCK")}>ROCK</button>
          <button className='w-1/3 md:w-1/4 object-cover bg-slate-200 p-2 rounded-xl shadow-sm shadow-gray-400 hover:shadow-none duration-1000 text-sm' onClick={() => imagesetter("PAPER")}>PAPER</button>
          <button className=' truncate w-1/3 md:w-1/4 object-cover bg-slate-200 p-2 rounded-xl shadow-sm shadow-gray-400 hover:shadow-none duration-1000 text-sm' onClick={() => imagesetter("SCISSORS")}>SCISSOR</button>
        </div>
        <div className="img">
          {image && (
            <div className=' bg-lime-400 rounded-md '>
            <div className=" text-center flex mt-3 p-3 justify-evenly">
              <img  className='rounded-xl size-1/6 md:size-1/6  ' src={image} alt="YOUR CHOICE"   />
              <img className='size-1/6 md:size-1/6' src={"/vs.png"} alt="vs"  />
              <img  className='rounded-xl  size-1/6 md:size-1/6  ' src={cImage} alt="COMPUTER CHOICE" />
            </div>
            <div className="p-2">
            {selected && (
                <input className=' bg-black text-white w-full rounded-md  shadow-md shadow-slate-900 hover:shadow-none duration-1000 sm:m-1 sm:p-1 md:p-2 md:m-2 ' type="button" value="GO" onClick={() => game(playerChoice as typeOfRPS, computerPlay)} />
              )}
            </div>
            </div>
          )}
        </div>
        {selected === false && (
          <div className=" rounded-md p-4 m-2 bg-slate-300 text-center">
            <h1>RESULT : {(result)?.toUpperCase()}</h1>
          </div>
        )}
        <div className=' p-4 m-2 bg-slate-300 rounded-md'>
          <h1 className=' font-bold m-2'>SCORE</h1>
          <h1 className='' >{`PLAYER : ${playerScore}`}</h1>
          <h1>{`COMPUTER : ${computerScore}`}</h1>
        </div>
        </div>
      </div>
  );
}

export default RPSgame;
