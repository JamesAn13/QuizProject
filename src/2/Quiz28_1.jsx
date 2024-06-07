import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Quiz28.css';
import { ScoreContext } from '../App'; // ScoreContext import

// 찾아야 하는 단어 리스트
const wordList = ["정원", "도박", "프랑스", "공부", "고양이", "가야금", "올챙이", "운동", "캄보디아", "할아버지"];

// 그리드 글자판
const initialGrid = [
  ['콰', '야', '도', '치', '무', '학', '리', '골', '가'],
  ['나', '개', '이', '기', '이', '역', '교', '지', '올'],
  ['꽃', '게', '구', '동', '심', '에', '알', '구', '챙'],
  ['조', '정', '원', '리', '철', '사', '좌', '치', '이'],
  ['코', '고', '콰', '려', '할', '아', '버', '지', '동'],
  ['고', '감', '정', '적', '린', '사', '가', '은', '르'],
  ['공', '부', '운', '고', '백', '프', '야', '금', '이'],
  ['황', '현', '철', '양', '해', '랑', '금', '연', '아'],
  ['아', '경', '역', '이', '느', '스', '자', '디', '캄'],
  ['캄', '박', '성', '도', '박', '은', '새', '동', '보'],
  ['세', '경', '캄', '보', '디', '아', '타', '쿠', '차'],
  ['운', '동', '구', '둔', '님', '운', '부', '처', '상'],
];

const Quiz28_1 = () => {
    const {score: User_Score ,setScore: setUserScore} = useContext(ScoreContext);
    const [grid] = useState(initialGrid); // 그리드 관리
    const [foundWords, setFoundWords] = useState([]); // 찾은 단어 저장
    const [selectedCells, setSelectedCells] = useState([]); // 선택한 cell
    const [matchedWord, setMatchedWord] = useState(null); // 선택한 단어가 있을 때 -> 단어 저장
    const [timer, setTimer] = useState(60); // 타이머 상태
    const [gameOver, setGameOver] = useState(false); // 게임 종료 상태
    const [score, setScore] = useState(0); // 점수 상태

    // Timer countdown
    useEffect(() => {
        //1초마다 초기상태(timer) = 60에서 -1 => timer -1
        // 게임 종료 => 점수 = 찾은 단어수 * 2
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else {
            setGameOver(true);
            setScore(foundWords.length * 10);
            setUserScore(User_Score + foundWords);

        }
    }, [timer, foundWords]);

    // cell을 눌렀을 때 선택한 셀 => selectedCells, MatchedWord 저장
    const handleMouseDown = (rowIndex, colIndex) => {
        setSelectedCells([[rowIndex, colIndex]]);
        setMatchedWord(null);
    };

    const handleMouseEnter = (rowIndex, colIndex) => {
        if (selectedCells.length > 0) {
            setSelectedCells([...selectedCells, [rowIndex, colIndex]]);
        }
    };

    
    const handleMouseUp = () => {
        const selectedWord = selectedCells.map(([row, col]) => grid[row][col]).join('');
        if (wordList.includes(selectedWord) && !foundWords.includes(selectedWord)) {
            setFoundWords([...foundWords, selectedWord]);
            setMatchedWord(selectedWord);
        }
        setSelectedCells([]);
    };

    return (
        <div className="Quiz28">
            <h1>단어 찾기 퀴즈</h1>
            <div className="timer">
                {gameOver ? (
                    <div>
                        <h2>게임 종료!</h2>
                        <p>찾은 단어 개수: {foundWords.length}</p>
                        <p>점수: {score}점</p>
                    </div>
                ) : (
                    <h2>남은 시간: {timer}초</h2>
                )}
            </div>
            <div className="grid" onMouseLeave={handleMouseUp}>
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((letter, colIndex) => {
                            const isSelected = selectedCells.some(cell => cell[0] === rowIndex && cell[1] === colIndex);
                            const selectedWord = selectedCells.map(([row, col]) => grid[row][col]).join('');
                            const isSelectedWord = foundWords.includes(selectedWord);
                            return (
                                <div
                                    key={colIndex}
                                    className={`cell ${isSelected ? 'selected' : ''} ${isSelectedWord ? 'word-found' : ''}`}
                                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                                    onMouseUp={handleMouseUp}
                                >
                                    {letter}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="word-list">
                <h2>찾을 단어</h2>
                <ul>
                    {wordList.map((word, index) => (
                        <li key={index} className={foundWords.includes(word) ? 'found' : ''}>
                            {word}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
            <Link to={'/'} className="link-button">이전 문제</Link>
            <Link to={'/page3'} className="link-button">다음 문제</Link>
            
            </div>
         

        </div>
    );
};

export default Quiz28_1;
