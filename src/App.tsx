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
import FilterList from './components/my-components/filter-list.tsx'
import { searchPreprocessing, searchText } from './components/my-components/search-processor.ts'

const sentences: string[] = [
  "回り出したあの子と僕の未来が",
  "大丈夫よ私は最強",
  "動物は基本群れるものである",
  "私を雇ってもらえませんか",
  "こんにちは、私はミラーです",
  "もしも相手が絶対かなわない様な強敵だとしても　勝とうとしなきゃ勝てないよ",
  "いいじゃないか 偽物の勇者で。僕は魔王を倒して世界の平和を取り戻す。そうすれば偽物だろうが本物だろうが関係ない",
];

function App() {
  const [searchWords, setSearchWords] = useState<Word[]>([]);
  const [listSentences, setSentences] = useState<Word[][]>([])

  const [stateReadingIndex, setReadingIndex] = useState<Map<string, number[]>>(new Map());
  const [stateGeneralIndex, setGeneralIndex] = useState<Map<string, number[]>>(new Map());
  const [filter, setFilter] = useState<Set<number>>(new Set());

  useEffect(() => {
    const asyncFunction = async () => {

      const tokenizer = await KuromojiTokenizer()
      const processed = sentences.map(sentence => {
        const result = tokenizer.tokenize(sentence)
        return (result as Word[]);
      })
      const { generalIndex, readingIndex } = searchPreprocessing(processed);
      setReadingIndex(readingIndex);
      setGeneralIndex(generalIndex);
      setSentences(processed);
    }

    asyncFunction()


  }, []);


  const inputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    const tokenizer = await KuromojiTokenizer()
    const nihongo = event.target.value;
    const path = tokenizer.tokenize(nihongo);
    setSearchWords(path as Word[])
    const tempFilter = searchText(stateGeneralIndex, stateReadingIndex, (path as Word[]));
    setFilter(tempFilter);
  }


  return (
    <>

      <Header />
      <div className="grid grid-cols-1 justify-items-center gap-36">
        <div className='flex flex-wrap items-end gap-5 max-w-3/4 min-h-[44px]'>
          {
            searchWords.map((word, i) => {
              return <WordBlock key={i} word={word} />
            })
          }
        </div>


        <div className="relative mx-auto min-w-1/2"> {/* Input Field section */}
          <Input onChange={inputChange}
            placeholder='Search Japanese Text'
            className='focus-visible:ring-2 focus-visible:ring-gray-600' />
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600' >
            <CornerDownLeft strokeWidth={2} size={20} />
          </div>
        </div>


        <FilterList sentences={listSentences} filter={filter} />




      </div>
    </>
  )
}

export default App
