import Word from "@/types/word";
import { searchPreprocessing, stopWordRemoval } from "./search-processor";


export default function FilterList({ sentences, searchWords }: { sentences: Word[][], searchWords: Word[] }) {
    console.log(searchWords);
    const { generalIndex, readingIndex } = searchPreprocessing(sentences);
    const removedSearchWords = stopWordRemoval(searchWords);
    const set = new Set<number>();

    for (let i = 0; i < removedSearchWords.length; i++) {
        const word = removedSearchWords[i];
        const allHiragana = word.basic_form.split("").reduce((isHiragana, char) => {
            return isHiragana && (/^[\u3040-\u309F]$/.test(char))
        }, true);
        const allKatakana = word.basic_form.split("").reduce((isHiragana, char) => {
            return isHiragana && (/^[\u30A0-\u30FF]$/.test(char))
        }, true);

        if (allHiragana && readingIndex.has(word.reading)) {

            const indexArr = readingIndex.get(word.reading);
            if (indexArr) {
                for (let i = 0; i < indexArr.length; i++) {
                    set.add(indexArr[i])
                }
            }
        }
        if ((allKatakana || word.basic_form == "*") && readingIndex.has(word.surface_form)) { // For Katakana Search
            console.log("entered");
            const indexArr = readingIndex.get(word.surface_form);
            if (indexArr) {
                for (let i = 0; i < indexArr.length; i++) {
                    set.add(indexArr[i])
                }
            }
        }
        if (generalIndex.has(word.basic_form)) { // Standard Case with Kanji
            const indexArr = generalIndex.get(word.basic_form);
            if (indexArr) {
                for (let i = 0; i < indexArr.length; i++) {
                    set.add(indexArr[i])
                }
            }
        }
    }
    console.log(readingIndex)
    console.log("Test", readingIndex.has("キホン"))
    console.log(generalIndex)

    return <>
        <div className='flex flex-col md:text-xl gap-4 items-start'>

            {
                searchWords.length === 0 ? sentences.map((sentence, i) => {
                    const joinedSentence = sentence.reduce((joined, word) => {
                        return joined + word.surface_form;
                    }, "");
                    return <p key={i} className='text-slate-600'>{joinedSentence}</p>

                    // return <div className="flex flex-wrap items-end gap-5">
                    //     {
                    //         sentence.map((word, i) => <WordBlock key={i} word={word} />)
                    //     }

                    // </div>;
                })
                    : sentences.filter((sentence, i) => {
                        return set.has(i);
                    }).map((sentence, i) => {
                        const joinedSentence = sentence.reduce((joined, word) => {
                            return joined + word.surface_form;
                        }, "");
                        return <p key={i} className='text-slate-600'>{joinedSentence}</p>

                        // return <div className="flex flex-wrap items-end gap-5">
                        //     {
                        //         sentence.map((word, i) => <WordBlock key={i} word={word} />)
                        //     }

                        // </div>;
                    })
            }
        </div>


    </>;
}
