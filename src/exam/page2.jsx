import React, { useContext } from 'react';
import { ScoreContext } from '../App'; // ScoreContext import
import { Link } from 'react-router-dom';
function Page2() {
  const { score } = useContext(ScoreContext); // ScoreContext에서 score 값 가져오기

  return (
    <div>
      <h2>페이지 2</h2>
    
    </div>
  );
}

export default Page2;