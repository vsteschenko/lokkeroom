import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [info, setInfo] = useState('Hello Caladan!')
  const fetchInfo = url => {
    fetch('https://millenium-falcon-e8394498af5e.herokuapp.com/info')
      .then((response) => response.json())
      .then((data) => {
        setInfo(data)
      })
      .catch(error => console.log(error))
  }
  useEffect(() => {
    fetchInfo()
  }, [])
  return (
    <>
      {info.message}
    </>
  )
}

export default App
