import { useEffect, useState } from "react"
import axios from "axios"

const useDiary = (id) => {
    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/diary/${id}`);
            setDetailData(response.data.body);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);

      return detailData
}

export default useDiary