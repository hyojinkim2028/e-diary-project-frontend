import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import Viewer from '../components/Viewer'
import useDiary from '../hooks/useDiary'
import { getStringedDate } from '../util/get-stringed-date'


const Diary = () => {
  const nav = useNavigate()
  const params = useParams()

  const curDiaryItem = useDiary(params.id)

  if(!curDiaryItem) {
    return <div>데이터 로딩중</div>
  }
  
  const {created_at:createdDate, emotion_id:emotionId, content} = curDiaryItem;
  const title = getStringedDate(new Date(createdDate))


  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={'< 뒤로가기'} />}
        rightChild={
          <Button onClick={() => nav(`/edit/${params.id}`)} text={'수정하기'} />
        }
      />
      <Viewer emotionId={Number(emotionId)} content={content} />
    </div>
  )
}

export default Diary
