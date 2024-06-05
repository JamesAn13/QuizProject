import React, { useContext } from 'react';
import { ScoreContext } from '../App.js'

function ScoreDisplay() {
  const { score } = useContext(ScoreContext);
  return <div>점수: {score}</div>;
}

export default ScoreDisplay;
