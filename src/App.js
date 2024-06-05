import React, { useState, createContext, useContext } from 'react';
import './App.css';
import ExamWorkSpace from "./exam/ExamWorkSpace";
import testData from './assets/json/testData.json';
import ShowUserName from './exam/ShowUserName';
import ScoreDisplay from './exam/ScoreDisplay';
import Page1 from '../src/exam/ExamWorkSpace';
import { Route, Routes } from 'react-router-dom';
import Page2 from '../src/exam/page2';
export const ScoreContext = createContext(0);

function App() {
// json 파일의 문제 정보를 가져옴. ( 그리드 선 개수, 문제 이름, 문제 선 양식 등 )
const exam = testData.examList[0];
const [score,setScore] = useState(0);

  return (
    <ScoreContext.Provider value={{score, setScore}}>
    <div className="App">
      <div className={'container'}>
      <ShowUserName/>
      <ScoreDisplay/>
      <Routes>
        <Route path='/' element={<Page1 exam={exam}/>} />
        <Route path='/' element={<Page2 />} />
      </Routes>
      </div>
    </div>
  </ScoreContext.Provider>
  );
}

export default App;
