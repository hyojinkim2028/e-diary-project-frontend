
import { useContext } from "react"
import getEmotionImage  from "../util/get-emotion-image"
import Button from "./Button"
import "./DiaryItem.css"
import { useNavigate } from "react-router-dom"
import { DiaryDispatchContext } from "../App"

const DiaryItem = ({id, created_at:createdAt, emotion_id:emotionId, content}) => {

    const nav = useNavigate(); 
    const {onDelete} = useContext(DiaryDispatchContext)

    const onClickDelete = () => {
        if(
            window.confirm("일기를 정말 삭제하시겠습니까? (삭제 시 복구 불가)")
        ) {
            // 일기 삭제로직 
            onDelete(id)
            nav("/", {replace:true})
        }
    }

    return (
        <div className="DiaryItem" >
            <div 
            onClick={()=>{nav(`/diary/${id}`)}}
            className={`img_section img_section_${emotionId}`}>
                <img src={getEmotionImage(Number(emotionId))} />
            </div>
            <div 
            onClick={()=>{nav(`/diary/${id}`)}}
            className="info_section">
                <div className="created_date">{new Date(createdAt).toLocaleDateString()}</div>
                <div className="content">{content}</div>
            </div>
            <div className="button_section">
                <Button 
                onClick={()=>{nav(`/edit/${id}`)}}
                text={"수정하기"} />
                <Button
                onClick={onClickDelete}
                text={"삭제하기"} />
            </div>
        </div>
    )
}

export default DiaryItem