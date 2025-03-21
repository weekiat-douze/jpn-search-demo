import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import kuromoji from '@aiktb/kuromoji'
import KuromojiTokenizer from './tokenizer/KuromojiTokenizer.ts'
import { useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { CornerDownLeft } from 'lucide-react'
import Header from './components/my-components/header.tsx'
import Word from './types/word.ts'
import WordBlock from './components/my-components/word-block.tsx'

const sentences: string[] = [
  "回り出したあの子と僕の未来が",
  "大丈夫よ私は最強",
  "動物は基本群れるものである",
];

function App() {
  // const [count, setCount] = useState(0)
  const [words, setWords] = useState<Word[]>([]);

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
    console.log("Hello", path)
    setWords(path as Word[])
  }


  return (
    <>

      <Header />
      <div className="grid grid-cols-1 justify-items-center gap-40">
        <div className='flex flex-wrap items-end gap-5 max-w-3/4'>
          {
            words.map(word => {
              return <WordBlock word={word} />
            })
          }
        </div>


        <div className="relative mx-auto min-w-1/2"> {/* Input Field section */}
          <Input onChange={inputChange} className='focus-visible:ring-2 focus-visible:ring-gray-600' />
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600' >
            <CornerDownLeft strokeWidth={2} size={20} />
          </div>
        </div>

        <div className='flex flex-col md:text-xl gap-4 items-start'>
          {
            sentences.map(sentence => {
              return <p className='text-slate-600'>{sentence}</p>
            })
          }
        </div>



      </div>
    </>
  )
}

export default App
