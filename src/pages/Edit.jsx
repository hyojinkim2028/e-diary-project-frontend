import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import useDiary from "../hooks/useDiary";

const Edit = () => {
    const params = useParams();
    const {onUpdate, onDelete} = useContext(DiaryDispatchContext)

    const curDiaryItem = useDiary(params.id)

    const nav = useNavigate();

    const onClickDelete = () => {
        if(
            window.confirm("일기를 정말 삭제하시겠습니까? (삭제 시 복구 불가)")
        ) {
            // 일기 삭제로직 
            onDelete(params.id)
            nav("/", {replace:true})
        }
    }


    const onSubmit = (input) => {
        if(
            window.confirm("일기를 수정하시겠습니까?")
        ) {
            onUpdate (
                params.id,
                input.createdDate.getTime(), 
                input.emotionId, 
                input.content
                )
        
        }
    }


    return(
    <div>
        <Header 
        title={"일기 수정하기"}
        leftChild={<Button 
            onClick={()=>{nav(-1)}}
            text={"< 뒤로가기"} />}
        rightChild={<Button 
            onClick={onClickDelete}
            text={"삭제하기"} 
            type={"NEGATIVE"}
            />}
        />
        <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
    )
}

export default Edit;