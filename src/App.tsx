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
  "今日と明日の天気予報を調べる方法を知りたい。",
  "現在地から近くのカフェを探してみよう。",
  "東京でおすすめの観光名所や人気スポットを知りたい。",
  "予算内で泊まれる安いホテルを検索する。",
  "初心者向けの日本語の勉強方法を教えてください。",
  "最新のニュースや今日の重要な話題を確認する。",
  "今年の人気アニメランキングを見たい。",
  "今乗る電車の時刻表や運行情報をチェックする。"
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


        <FilterList sentences={listSentences} filter={filter} searchWord={searchWords} />




      </div>
    </>
  )
}

export default App
