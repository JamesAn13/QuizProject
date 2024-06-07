import React, { useCallback, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import 포도 from './포도.jpg';
import 딸기 from './딸기.jpg';
import 복숭아 from './복숭아.jpg';
import 바나나 from './바나나.jpg';
import 감 from './감.jpg';
import 사과 from './사과.jpg';
import 냉동고 from './냉동고.jpg';
import 냉장고 from './냉장고.jpg';
import { ScoreContext } from '../App'; // ScoreContext import

function Fruits(props) {
  const {score: User_Score ,setScore: setUserScore} = useContext(ScoreContext);

  const [fruits] = useState([
    { name: '포도', image: 포도 },
    { name: '딸기', image: 딸기 },
    { name: '복숭아', image: 복숭아 },
    { name: '바나나', image: 바나나 },
    { name: '감', image: 감 },
    { name: '사과', image: 사과 },
  ]);

  const AStyle = {
    border: '1px black solid',
    margin: '10mm',
    padding: '10mm'
  };

  const [homeStorage, setHomeStorage] = useState(Array(3).fill(''));
  const [fridgeStorage, setFridgeStorage] = useState(Array(3).fill(''));
  const [feedback, setFeedback] = useState({ fridge: [], home: [] });
  const [score, setScore] = useState(0);

  const handleInputChange = useCallback((event, index, storageType) => {
    const { value } = event.target;
    if (storageType === 'home') {
      setHomeStorage(prev => {
        const newHomeStorage = [...prev];
        newHomeStorage[index] = value;
        return newHomeStorage;
      });
    } else if (storageType === 'fridge') {
      setFridgeStorage(prev => {
        const newFridgeStorage = [...prev];
        newFridgeStorage[index] = value;
        return newFridgeStorage;
      });
    }
  }, []);

  const checkAnswers = () => {
    const fridgeCorrect = ['포도', '사과', '딸기'];
    const freezerCorrect = ['감', '바나나', '복숭아'];

    let newScore = 0;
    
    const fridgeFeedback = fridgeStorage.map(answer => {
      if (fridgeCorrect.includes(answer)) {
        newScore += 10;
        return "맞습니다 +10점";
      } else {
        return "틀립니다";
      }
    });

    const homeFeedback = homeStorage.map(answer => {
      if (freezerCorrect.includes(answer)) {
        newScore += 10;
        return "맞습니다 +10점";
      } else {
        return "틀립니다 ";
      }
    });

    setFeedback({ fridge: fridgeFeedback, home: homeFeedback });
    setScore(newScore);
    setUserScore(User_Score + newScore);

  };

  return (
    <div style={AStyle}>
      <header>
        <h1>과일 보관법 기억하기</h1>
      </header>
      <section style={{ margin: '20px' }}>
        <footer style={{ backgroundColor: '#f8f8f8', padding: '10px' }}>
          <p>
            앞서 기억해 둔 과일 보관법을 떠올리며 보관 장소에 따라 <strong>보기</strong>의 과일 이름을 빈칸에 적어보세요.
          </p>
        </footer>
      </section>
      <section style={{ display: 'flex', justifyContent: 'center' }}>
        <table style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              {fruits.slice(0, 3).map((fruit, index) => (
                <td key={fruit.name}>
                  <img src={fruit.image} alt={fruit.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                  <p>{fruit.name}</p>
                </td>
              ))}
            </tr>
            <tr>
              {fruits.slice(3).map((fruit, index) => (
                <td key={fruit.name}>
                  <img src={fruit.image} alt={fruit.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                  <p>{fruit.name}</p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
      <section style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ margin: '0 20px' }}>
          <img src={냉동고} alt="냉동고.jpg" style={{ width: '50px', height: '50px' }} />
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {[0, 1, 2].map(index => (
              <li key={`home-${index}`} style={{ margin: '10px 0' }}>
                {index + 1}.{' '}
                <input
                  type="text"
                  placeholder="여기에 과일 이름"
                  value={homeStorage[index]}
                  onChange={event => handleInputChange(event, index, 'home')}
                />
                <span>{feedback.home[index]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ margin: '0 20px' }}>
          <img src={냉장고} alt="냉장고.jpg" style={{ width: '50px', height: '50px' }} />
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {[0, 1, 2].map(index => (
              <li key={`fridge-${index}`} style={{ margin: '10px 0' }}>
                {index + 1}.{' '}
                <input
                  type="text"
                  placeholder="여기에 과일 이름"
                  value={fridgeStorage[index]}
                  onChange={event => handleInputChange(event, index, 'fridge')}
                />
                <span>{feedback.fridge[index]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={checkAnswers}>정답 확인</button>
      </section>
      <section style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <h2>점수: {score}/60점</h2>
      
      </section>
      <section>
        
        <h2>총 점수: {User_Score} </h2>
        <h6> 360점 만점입니다.</h6>
      </section>
      <footer style={{ backgroundColor: '#f8f8f8', padding: '10px', marginTop: '20px' }}>
        <Link to={'/page3'} className="link-button">이전 문제</Link>
        <Link to={'/'}  className="link-button" >첫 문제로 돌아가기
</Link>

      </footer>
    </div>
  );
}

export default Fruits;