import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import kuromoji from '@aiktb/kuromoji'
import KuromojiTokenizer from './tokenizer/KuromojiTokenizer.ts'
import { useEffect } from 'react'
import { Input } from "@/components/ui/input"


function App() {
  // const [count, setCount] = useState(0)
  const [text, setText] = useState("")

  // useEffect(() => {
  //   const asyncFunction = async () => {

  //     const tokenizer = await KuromojiTokenizer()
  //     const nihongo = "わたしを雇ってください"
  //     const path = tokenizer.tokenize(nihongo);
  //     // console.log(path)
  //     // console.log("HAR SEMO")
  //     setText(JSON.stringify(path))
  //   }

  //   asyncFunction()


  // }, [])

  const inputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {


    const tokenizer = await KuromojiTokenizer()
    const nihongo = event.target.value;
    // console.log("Nihongo", nihongo);
    const path = tokenizer.tokenize(nihongo);
    // console.log("Hello", path)
    setText(JSON.stringify(path))
  }


  return (
    <>
      <div className="flex flex-col mx-auto my-10 max-w-1/2">
        <Input onChange={inputChange} />
        <p>{text}</p>


      </div>
    </>
  )
}

export default App
