import './App.css'

import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import New from './pages/New'
import Diary from './pages/Diary'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'
import axios from 'axios'
import Join from './pages/Join'

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()

function App() {
  let isLoggedIn = localStorage.getItem('isLoggedIn') // 로그인 상태 관리
  const [diaryData, setDiaryData] = useState([{}]) // 일기리스트

  const nav = useNavigate()

  function setAuthToken(token) {
    if (token) {
      // 모든 axios 요청의 Authorization 헤더에 토큰을 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      // 토큰이 없는 경우 Authorization 헤더 삭제
      delete axios.defaults.headers.common['Authorization']
    }
  }

  const getData = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      localStorage.setItem('isLoggedIn', 'false')
    }
    setAuthToken(token)
    try {
      const res = await axios.get('http://localhost:8080/api/diary')
      const data = res.data.body
      return setDiaryData(data)
    } catch (e) {
      nav('/login')
    }
  }

  // 로그인된 유저만 일기 조회가능, 비로그인시 로그인화면 이동
  useEffect(() => {
    if (isLoggedIn === 'true') {
      getData()
    } else {
      nav('/login')
    }
  }, [])

  // 로그인
  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post(
        'http://localhost:8080/open-api/members/sign-in',
        {
          username: email,
          password: password,
        }
      )

      const statusCode = res.data.result.result_code
      const token = res.data.body.access_token

      if (Number(statusCode) === 200) {
        localStorage.setItem('accessToken', token)
        localStorage.setItem('isLoggedIn', 'true')
      }
      getData()
      nav('/home')
    } catch (e) {
      const errorCode = Number(e.response.data.result.result_code)
      if (errorCode === 1501) {
        alert('비밀번호를 다시 확인하세요.')
      }
      if (errorCode === 1404) {
        alert('등록되지 않은 사용자입니다.')
      }
    }
  }

  // 새로운 일기 추가
  const onCreate = async (createdDate, emotionId, content) => {
    try {
      const postDiary = await axios.post('http://localhost:8080/api/diary', {
        result: {
          result_code: 0,
          result_message: 'string',
          result_description: 'string',
        },
        body: {
          created_at: new Date(createdDate),
          emotion_id: String(emotionId),
          content: content,
        },
      })

      // 새로고침 없이 업데이트 반영되게 추후 보완하기
      getData()
    } catch (e) {
      console.error('POST 요청 실패:', e)
    }
  }

  // 기존 일기 수정
  const onUpdate = async (id, createdDate, emotionId, content) => {
    try {
      const postDiary = await axios.put(
        `http://localhost:8080/api/diary/${id}`,
        {
          result: {
            result_code: 0,
            result_message: 'string',
            result_description: 'string',
          },
          body: {
            created_at: new Date(createdDate),
            emotion_id: String(emotionId),
            content: content,
          },
        }
      )
      console.log('PUT 요청 성공: ', postDiary.data)
      getData()
      nav(`/diary/${id}`, { replace: true })
    } catch (e) {
      console.error('PUT 요청 실패:', e)
    }
  }

  // 기존 일기 삭제
  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/diary/${id}`)
      console.log('DELETE 요청 성공')
      getData()
      nav('/', { replace: true })
    } catch (e) {
      console.error('DELETE 요청 실패:', e)
    }
  }

  // 문법 교정
  const checkGrammar = async (input) => {
    try {
      const res = await axios.get('http://localhost:8080/api/check-grammar', {
        params: { prompt: input },
      })
      const data = res.data
      const jsonData = JSON.stringify(data)
      return jsonData
    } catch (e) {
      console.error('CHECK GRAMMAR 요청 실패:', e)
    }
  }

  // 변역
  const translatePrompt = async (input) => {
    try {
      const res = await axios.get(
        'http://localhost:8080/api/check-grammar/translation',
        { params: { prompt: input } }
      )
      const data = res.data
      const jsonData = JSON.stringify(data)
      return jsonData
    } catch (e) {
      console.error('CHECK GRAMMAR 요청 실패:', e)
    }
  }

  return (
    <>
      <DiaryStateContext.Provider value={diaryData}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
            checkGrammar,
            translatePrompt,
            handleLogin,
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            {/* <Route
              path="/home"
              element={
                isLoggedIn === 'true' ? <Home /> : <Navigate to="/login" />
              }
            /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
