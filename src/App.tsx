import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import kuromoji from '@aiktb/kuromoji'
import KuromojiTokenizer from './tokenizer/KuromojiTokenizer.ts'
import { useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { CloudDownload, CornerDownLeft, } from 'lucide-react'
import Header from './components/my-components/header.tsx'
import Word from './types/word.ts'
import WordBlock from './components/my-components/word-block.tsx'
import FilterList from './components/my-components/filter-list.tsx'
import { searchPreprocessing, searchText } from './components/my-components/search-processor.ts'
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert.tsx'
import { AnimatePresence, motion } from 'motion/react';
import { Checkbox } from './components/ui/checkbox.tsx'

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
  const [isLoading, setLoading] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(false);

  const [searchWords, setSearchWords] = useState<Word[]>([]);
  const [listSentences, setSentences] = useState<Word[][]>([])

  const [stateReadingIndex, setReadingIndex] = useState<Map<string, number[]>>(new Map());
  const [stateGeneralIndex, setGeneralIndex] = useState<Map<string, number[]>>(new Map());
  const [stateWiderGeneralIndex, setWiderGeneralIndex] = useState<Map<string, number[]>>(new Map());
  const [stateWiderReadingIndex, setWiderReadingIndex] = useState<Map<string, number[]>>(new Map());
  const [filter, setFilter] = useState<Set<number>>(new Set());

  useEffect(() => {
    const asyncFunction = async () => {

      const tokenizer = await KuromojiTokenizer()
      const processed = sentences.map(sentence => {
        const result = tokenizer.tokenize(sentence)
        return (result as Word[]);
      })
      const { generalIndex, readingIndex, widerGeneralIndex, widerReadingIndex } = searchPreprocessing(processed);

      setReadingIndex(readingIndex);
      setGeneralIndex(generalIndex);
      setWiderReadingIndex(widerReadingIndex);
      setWiderGeneralIndex(widerGeneralIndex);

      setSentences(processed);
      setLoading(false);
    }

    asyncFunction()


  }, []);


  const inputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {


    const tokenizer = await KuromojiTokenizer()
    const nihongo = event.target.value;
    const path = tokenizer.tokenize(nihongo);
    setSearchWords(path as Word[])


    if (checked) {
      const tempFilter = searchText(stateWiderGeneralIndex, stateWiderReadingIndex, (path as Word[]));

      setFilter(tempFilter);
    } else {
      const tempFilter = searchText(stateGeneralIndex, stateReadingIndex, (path as Word[]));
      setFilter(tempFilter);
    }


  }

  const checkChanged = async () => {
    if (!checked) {
      const tempFilter = searchText(stateWiderGeneralIndex, stateWiderReadingIndex, searchWords);

      setFilter(tempFilter);
    } else {
      const tempFilter = searchText(stateGeneralIndex, stateReadingIndex, searchWords);

      setFilter(tempFilter);
    }
    setChecked(!checked);
  }


  return (
    <>

      <Header />
      <div className="grid grid-cols-1 justify-items-center gap-14 md:gap-36">
        <div className='flex flex-wrap items-end gap-5 max-w-3/4 min-h-[44px]'>
          {
            searchWords.map((word, i) => {
              return <WordBlock key={i} word={word} />
            })
          }
        </div>

        <div className="flex flex-col relative mx-auto min-w-3/4 lg:min-w-1/2 gap-1">
          <div className="relative"> {/* Input Field section */}
            <Input onChange={inputChange}
              placeholder='Search Japanese Text'
              className='focus-visible:ring-2 focus-visible:ring-gray-600' />
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600' >
              <CornerDownLeft strokeWidth={2} size={20} />
            </div>
          </div>

          <div className='flex items-center gap-1 text-sm text-slate-500 self-end'>
            <Checkbox id="wide" className='border-gray-400 data-[state=checked]:bg-slate-500 data-[state=checked]:border-slate-500'
              checked={checked} onCheckedChange={checkChanged} />
            <label htmlFor='wide'>Enable wider search</label>
          </div>
        </div>



        <FilterList sentences={listSentences} filter={filter} searchWord={searchWords} />




      </div>
      <AnimatePresence>
        {
          isLoading
            ? <motion.div className='w-sm fixed bottom-5 right-5'
              layout
              key={"alert"}
              initial={{ y: 30 }} animate={{ y: 0 }} exit={{ opacity: 0, y: 50 }}>
              <Alert >
                <CloudDownload strokeWidth={2.5} />
                <AlertTitle>Hold on...</AlertTitle>
                <AlertDescription>
                  Loading dictionary may take awhile
                </AlertDescription>
              </Alert>
            </motion.div>
            : <></>
        }
      </AnimatePresence>


    </>
  )
}

export default App
