import './Join.css'
import logo from '../assets/logo.png'
import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DiaryDispatchContext } from '../App'

const Join = () => {
  const nav = useNavigate()

  const emailAuth = () => {
    const emailAuthButton = document.getElementById(
      'email_auth_check_container'
    )
    emailAuthButton.style.display = 'flex'
    alert('요청하신 주소로 이메일 전송이 되었습니다. 인증번호를 입력하세요.')
  }

  // 회원가입
  const join = async () => {
    const fields = [
      { id: 'join_email', message: '이메일을 입력해주세요.' },
      { id: 'join_password', message: '비밀번호를 입력해주세요.' },
      { id: 'join_password_check', message: '비밀번호 확인을 입력해주세요.' },
      { id: 'join_nickname', message: '닉네임을 입력해주세요.' },
    ]

    for (const field of fields) {
      const value = document.getElementById(field.id).value
      if (!value) {
        alert(field.message)
        document.getElementById(field.id).focus()
        return
      }
    }

    const email = document.getElementById('join_email').value
    const password = document.getElementById('join_password').value
    const nickname = document.getElementById('join_nickname').value
    const passwordCheck = document.getElementById('join_password_check').value

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const res = await axios.post('http://localhost:8080/open-api/members/sign-up', {
        email,
        password,
        nickname,
        role: 'USER',
      })
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.')
      nav("/login")
    } catch (e) {
      alert(e)
      console.error(e);
    }
  }

  return (
    <div className="Join">
      <img className="logo_img" src={logo} />

      <form className="join_form">
        <div className="join_input">
          <div className="email_container">
            <input type="email" id="join_email" name="email" placeholder="이메일" />
            <button type="button" id="email_auth_submit" onClick={emailAuth}>
              인증번호전송
            </button>
          </div>
          <div id="email_auth_check_container">
            <input
              type="email"
              id="email_auth_number_input"
              placeholder="인증번호 입력"
            />
            <button id="email_auth_submit_check">인증번호확인</button>
          </div>
          <input type="password" id="join_password" placeholder="비밀번호" />
          <input type="password" id="join_password_check" placeholder="비밀번호" />
          <input type="text" id="join_nickname" placeholder="닉네임" />
        </div>
        <button className="join_button" type="button" onClick={join}>
          회원가입
        </button>
      </form>
    </div>
  )
}

export default Join
