import './Editor.css'
import EmotionItem from './EmotionItem'
import Button from './Button'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { emotionList } from '../util/constants'
import { getStringedDate } from '../util/get-stringed-date'
import { useContext } from 'react'
import { DiaryDispatchContext } from '../App'
import Modal from './Modal'

const Editor = ({ initData, onSubmit }) => {
  const nav = useNavigate()

  const { checkGrammar, translatePrompt } = useContext(DiaryDispatchContext)

  // 일기 작성 시 초기값
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: '',
  })

  // 일기 수정 시 초기값
  useEffect(() => {
    if (initData) {
      setInput({
        emotionId: Number(initData.emotion_id),
        content: initData.content,
        createdDate: new Date(initData.created_at),
      })
    }
  }, [initData])

  const [isModalOpen, setIsModalOpen] = useState(false) // 모달 상태 관리
  const [funBtn, setFunBtn] = useState('check_grammar') // 문법 기능 버튼 관리
  // 문법 첨삭 데이터
  const [checkedGrammarText, setCheckedGrammarText] = useState({
    correct_sentence: '',
    reason: '',
  })
  // 번역 데이터
  const [translatePromptText, setTranslatePromptText] = useState('')

  // 클릭한 문법 기능 버튼에 따라 문법 첨삭 또는 번역 api 호출 및 작동
  const onClickFunctionButton = async (e) => {
    const inputContent = document.getElementById('input_content').value
    if (e.target.id === 'check_grammar') {
      try {
        const checkedGrammarData = await checkGrammar(inputContent)
        const toParseData = JSON.parse(checkedGrammarData)
        setFunBtn('check_grammar')
        setCheckedGrammarText(toParseData)
        setIsModalOpen(true)
      } catch (error) {
        console.error(error)
      }
    }
    if (e.target.id === 'translate_text') {
      try {
        const translatedData = await translatePrompt(inputContent)
        const toParseData = JSON.parse(translatedData.replace(/\n/g, '\n'))
        setFunBtn('translate')
        setTranslatePromptText(toParseData)
        setIsModalOpen(true)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const apply = () => {
    // 일기 컨텐츠 수정
    document.getElementById('input_content').value =
      checkedGrammarText.correct_sentence
    // 일기 컨텐츠 반영
    input.content = checkedGrammarText.correct_sentence
  }

  const onChangeInput = (e) => {
    let name = e.target.name
    let value = e.target.value

    if (name === 'createdDate') {
      value = new Date(value)
    }

    setInput({
      ...input,
      [name]: value,
    })
  }

  const onClickSubmitButton = () => {
    onSubmit(input)
  }

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: 'emotionId',
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <section className="check_grammar_button_section">
          <Button
            id={'check_grammar'}
            onClick={onClickFunctionButton}
            text={'문법교정'}
            type={'FUNCTION'}
          />
          <Button
            id={'translate_text'}
            onClick={onClickFunctionButton}
            text={'영어로 번역하기'}
            type={'FUNCTION'}
          />
        </section>
        <div>
          {isModalOpen && (
            <Modal
              text={
                funBtn === 'check_grammar'
                  ? `올바른 문장\n ${checkedGrammarText.correct_sentence}\n\n수정한 이유\n ${checkedGrammarText.reason}`
                  : translatePromptText
              }
              /* 모달창 열려있는 경우 닫기 버튼 누르면 닫히게 */
              closeModal={closeModal}
              applyFunc={funBtn === 'check_grammar' ? apply : ''}
            />
          )}
        </div>
        <textarea
          id="input_content"
          name="content"
          onChange={onChangeInput}
          placeholder="하루를 기록해보세요."
          value={input.content}
        />
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={'취소하기'} />
        <Button
          onClick={onClickSubmitButton}
          text={'작성완료'}
          type={'POSITIVE'}
        />
      </section>
    </div>
  )
}

export default Editor
