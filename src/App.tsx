// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import kuromoji from '@aiktb/kuromoji'
import KuromojiTokenizer from './tokenizer/KuromojiTokenizer.ts'
import { useEffect } from 'react'

function App() {
  // const [count, setCount] = useState(0)
  useEffect(() => {
    const asyncFunction = async () => {

      const tokenizer = await KuromojiTokenizer()
      const nihongo = "わたしを雇ってください"
      const path = tokenizer.tokenize(nihongo);
      console.log(path)
      console.log("HAR SEMO")
    }

    asyncFunction()


  }, [])


  return (
    <>
      <div className="mx-auto max-w-fit">
        Hello
      </div>
    </>
  )
}

export default App
