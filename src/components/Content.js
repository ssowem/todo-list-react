import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import axios from 'axios';


function Content({addTask, filterList, taskList, message}) {
   const [content, setContent] = useState(null);

   useEffect(() => {
    fetchData();
   }, []);

   const accessToken = localStorage.getItem('accessToken');

   const fetchData = async () => {
    const url = "http://172.30.1.33:8080/to-do-list/api/v1/todo?pageNumber=1&pageSize=10&status=ACTIVE"
    try {
      const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,  // YOUR_ACCESS_TOKEN는 실제 토큰 값으로 대체해야 함
          }
      })
      
      console.log("성공",response)
      setContent(response.data.content)
    } catch (error) {
      console.log("실패",error);
    }
  }
    return (
        <div className="wrapper">
              <h2>💡오늘의 할 일</h2>
              <TodoForm addTask={addTask}/>
              <div className='filter-btn'>
                {filterList}
              </div>
              <ul className='list-wrap'>
                {taskList}
              </ul>
              <div className='todo-count'>
                {message}
              </div>
            </div>
    )
}


export default Content;