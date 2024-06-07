import React from 'react';
import { Link } from 'react-router-dom';
import 포도 from './포도.jpg';
import 딸기 from './딸기.jpg';
import 복숭아 from './복숭아.jpg';
import 바나나 from './바나나.jpg';
import 감 from './감.jpg';
import 사과 from './사과.jpg';
import 냉동고 from './냉동고.jpg';
import 냉장고 from './냉장고.jpg';
import check from './check.jpg'

function FruitsSave  (props)  {
  const fruits = [
    { name: '포도', image: 포도, place: '위' },
    { name: '사과', image: 사과, place: '위' },
    { name: '딸기', image: 딸기, place: '위' },
    { name: '감', image: 감,   place: '아래' },
    { name: '바나나', image: 바나나, place: '아래' },
    { name: '복숭아', image: 복숭아, place: '아래' },
    
  ];

  const AStyle= {
    border: '1px black solid',
    margin: '10mmm',
    padding: '10mm'
};

  const BStyle= {
    border: 'px black solid',
    margin: '10mmm',
    padding: '10mmm'
  };
  


  return (
    <div style={AStyle}>
      <header>
        <h1>과일 보관법 기억하기</h1>
      </header>
      <section style={{ margin: '20px' }}>
      <footer style={{ backgroundColor: '#f8f8f8', padding: '10px' }}>
        <p>
          다음 6가지의 과일 보관법을 <strong>기억해주세요</strong>
        </p>
        </footer>
      </section>
      <section style={{ display: 'flex', justifyContent: 'center' }}>
        <table style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              {fruits.slice(0, 3).map((fruit) => (
                <td key={fruit.name} style={{ position: 'relative' }}>
                  <img src={fruit.image} alt={fruit.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                  <p>{fruit.name}</p>
                  {fruit.place === '위' && (
                    <img src={냉장고} alt="냉장고" style={{ width: '50px', height: '50px', position: 'absolute', top: '0', right: '0' }} />
                  )}
                </td>
              ))}
            </tr>
            <tr>
              {fruits.slice(3).map((fruit) => (
                <td key={fruit.name} style={{ position: 'relative' }}>
                  <img src={fruit.image} alt={fruit.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                  <p>{fruit.name}</p>
                  {fruit.place === '아래' && (
                    <img src={냉동고} alt="냉동고" style={{ width: '50px', height: '50px', position: 'absolute', top: '0', right: '0' }} />
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
      <footer style={{ backgroundColor: '#ffffff', padding: '10px', marginTop: '20px' }}>
      <img src={check} alt="check.jpg" style={{ width: '100px', height: '100px' }} /> 
      과일 보관법을 기억해 주세요.
      </footer>
      <footer style={{ backgroundColor: '#f8f8f8', padding: '10px', marginTop: '100px' }}>
      <Link to= {'/Fruits'}>다음페이지</Link>
      
      </footer>
    </div>
  );
};

export default FruitsSave;