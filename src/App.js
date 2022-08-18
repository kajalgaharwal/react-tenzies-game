import './App.css';
import React, { useState } from 'react';
import Die from './components/Die';
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'; //generate random ID
import Confetti from 'react-confetti';
function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld === true);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log('diceeee');
    }
  }, [dice]);
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice =>
        oldDice.map(die => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice(oldDice =>
      oldDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  return (
    <div className='container'>
      <div className='main'>
        {tenzies && <Confetti />}
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>
          Roll until each die are the same. Click each die to freeze it at its
          current value between cells.
        </p>
        <div className='dice-container'>{diceElements}</div>
        <button className='roll-dice' onClick={rollDice}>
          {tenzies ? 'New Game' : 'Roll'}
        </button>
      </div>
    </div>
  );
}

export default App;
