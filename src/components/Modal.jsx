import React from 'react'
import './Modal.css'

// 모달창이 화면 중간에 뜨게 하려면?
const Modal = ({ text, closeModal, applyFunc }) => {
  const showApplyButton = (fun) => {
    if (fun === "") {
      return false
    } else {
      return true
    }
  }

  return (
    <div className="modal_section">
      <div className="checked_grammar_modal">
        <div className="checked_grammar_content">
          <p>{text}</p>
          <div className="modal_button_section">
            {showApplyButton(applyFunc) && (
            <button className="close_button" onClick={applyFunc}>
              반영하기
            </button>
            )}
            <button className="apply_button" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
