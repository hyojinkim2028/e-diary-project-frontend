import './Button.css'

const Button = ({id, text, type, onClick }) => {
  return <button id={id}  onClick={onClick} className={`Button Button_${type}`}>{text}</button>
}

export default Button
