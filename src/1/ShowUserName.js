import React from 'react';
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";


function ShowUserName(props) {
  const [username, setUsername] = useState('');
    
  useEffect(() => {
    function showUserName() {
      Swal.fire({
        title: '당신의 이름을 입력해주세요',
        text: '사용자 이름 설정',
        input: 'text',
        inputPlaceholder: '이름을 입력..',
        allowOutsideClick: false,
          preConfirm: (inputName) => {
            if (!inputName) {
              Swal.showValidationMessage('이름을 입력해야 합니다.');
            } else {
              return inputName;
            }
          }
        }).then((result) => {
          if (result.isConfirmed) {
            setUsername(result.value); 
          }
        });
      }
    
    showUserName(); 
    }, []); 

    return (
        <div>
            <span id="username">사용자 이름: {username}</span>
        </div>
    );
}

export default ShowUserName;