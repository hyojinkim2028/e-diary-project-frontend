// import { useSearchParams } from "react-router-dom";
import { useState, useContext } from 'react'

import Header from '../components/Header'
import Button from '../components/Button'
import DiaryList from '../components/DiaryList'
import Setup from '../components/Setup'
import { DiaryStateContext } from '../App'


const getMonthlyData = (pivotDate, data) => {
  // 해당 월 1일 ~ 말일 구함
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime()

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime()

  const newData = data.filter((item) => {
    const parsedDate = Date.parse(item.created_at)
    return beginTime <= parsedDate && parsedDate <= endTime
  }
  )
  return newData 
}

const Home = () => {

  const data = useContext(DiaryStateContext)
  const [pivotDate, setPivotDate] = useState(new Date())
  const monthlyData = getMonthlyData(pivotDate, data)

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
  }
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))
  }


  return (
    <div>
      <Setup />
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={'<'} />}
        rightChild={<Button onClick={onIncreaseMonth} text={'>'} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  )
}

export default Home
