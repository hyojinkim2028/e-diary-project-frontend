import { useNavigate } from 'react-router-dom'
import './Setup.css'

const Setup = () => {
  const nav = useNavigate()

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('isLoggedIn')
    alert("로그아웃 완료")
    nav("/login")
  }

  return (
  <div className='Setup'>
    <div className="btn-group">
      <button className="setup_btn btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        menu
      </button>
      <ul className="dropdown-menu">
        <li><a className="move_my_info" href="#">마이페이지</a></li>
        <li><a className="move_setup" href="#">설정</a></li>
        <li><a className="logout" onClick={logout}>로그아웃</a></li>
      </ul>
    </div>
  </div>
  )
}

export default Setup
