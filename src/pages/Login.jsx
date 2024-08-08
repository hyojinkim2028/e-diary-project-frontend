import './Login.css'
import logo from '../assets/logo.png'
import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DiaryDispatchContext } from '../App'

const Login = () => {
  const nav = useNavigate()
  const { handleLogin } = useContext(DiaryDispatchContext)

  const login = async () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    try {
      await handleLogin(email, password)
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <div className="Login">
      <img className="logo_img" src={logo} />

      <form className="login_form">
        <div className="login_input">
          <input type="email" id="email" name="email" placeholder="이메일" />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
          />
        </div>
        <button className="email_login_button" type="button" onClick={login}>
          이메일 로그인
        </button>
        <div className="link">
          <a onClick={() => nav('/join')} className="link_button">
            회원가입
          </a>
          <a href="/" className="link_button">
            비밀번호 찾기
          </a>
        </div>
        <button className="naver_login_button" type="button">
          네이버로 시작하기
        </button>
        <button className="kakao_login_button" type="button">
          카카오로 시작하기
        </button>
      </form>
    </div>
  )
}

export default Login
