import React, { useState, createContext, useContext } from 'react';
import './App.css';
import testData from './assets/json/testData.json';
import ShowUserName from './1/ShowUserName';
import ScoreDisplay from './1/ScoreDisplay';
import Page1 from './1/ExamWorkSpace';
import { Route, Routes } from 'react-router-dom';
import Page3 from './3/ProblemForm';
import Page4 from './4/FruitsSave';
import Fruits from './4/Fruits';
import Page2 from './2/Quiz28_1';

export const ScoreContext = createContext(0);


function App() {

const exam = testData.examList[0];
const [score,setScore] = useState(0);
const [username, setUsername] = useState(''); 

  return (
    <ScoreContext.Provider value={{score, setScore}}>
    <div className="App">
      <div className={'container'}>
      <ShowUserName/>
      <ScoreDisplay/>
      <Routes>
        <Route path='/' element={<Page1 exam={exam}/>} />
        <Route path='/page2' element={<Page2 />} />
        <Route path='/page3' element={<Page3 />} />
        <Route path='/Fruits' element={<Fruits/>} />
        <Route path='/page4' element={<Page4 />} />
      </Routes>
      </div>
    </div>
  </ScoreContext.Provider>
  );
}

export default App;
