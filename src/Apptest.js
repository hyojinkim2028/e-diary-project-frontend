//import React, {useEffect, useState} from 'react';
//import axios from 'axios';
//
//function App() {
//   const [diaryData, setDiaryData] = useState([{
//   id: '',
//   title: '',
//   content: '',
//   created_at: '',
//   }])
//
//    const getData = async() => {
//        try{
//          const res = await axios.get('/api/diary')
//          const data = res.data.body
//        return setDiaryData(data)
////        return setData(data.concat(_inputData))
//        } catch(e){
//          console.error(e.message)
//        }
//    }
//
//     useEffect(() => {
//       getData();
//     }, []);
//
//  return (
//    <>
//          <div>
//            {diaryData.map((d) => <div key={d.id}>{d.title}</div>)}
//          </div>
//    </>
//  )
//}
//
//export default App;