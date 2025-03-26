import Word from "@/types/word";
import StopWords from 'stopwords-ja';

const CustomStopWords = StopWords.filter(word => {
    return word != "私";
})

export function searchPreprocessing(sentences: Word[][]) {
    const sentences_p1 = sentences.map(sentence => {
        return stopWordRemoval(sentence);
    })
    // const sentences_p2 = sentences_p1.map(sentence => {
    //     return stemming(sentence);
    // })
    const generalIndex = generalIndexing(sentences_p1);
    const readingIndex = readingIndexing(sentences_p1);
    return { generalIndex, readingIndex }
}

// function stemming(sentence: Word[]) {
//     return sentence.map(word => {
//         return word.basic_form
//     });
// }

export function stopWordRemoval(sentence: Word[]): Word[] {
    return sentence.filter(word => {
        return (word.pos != "句点" && word.pos != "空白" && word.pos != "記号") && !CustomStopWords.includes(word.basic_form);
    })
}

function generalIndexing(sentences: Word[][]) {
    const map: Map<string, number[]> = new Map();
    for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i];
        for (const word of sentence) {
            const base_word = word.basic_form;
            if (map.has(base_word)) {
                const list = map.get(base_word);
                if (list?.indexOf(i) === -1) {
                    list.push(i);
                }
            } else {
                map.set(base_word, [i]);
            }

        }
    }
    return map;
}
function readingIndexing(sentences: Word[][]) {
    const map: Map<string, number[]> = new Map();
    for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i];
        for (const word of sentence) {
            const reading = word.reading;
            if (map.has(reading)) {
                const list = map.get(reading);
                if (list?.indexOf(i) === -1) {
                    list.push(i);
                }
            } else {
                map.set(reading, [i]);
            }

        }
    }
    return map;
}

export function searchText(generalIndex: Map<string, number[]>, readingIndex: Map<string, number[]>, searchWords: Word[]) {

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

        if (allHiragana && readingIndex.has(word.reading)) { // For Hiragana Search

            const indexArr = readingIndex.get(word.reading);
            if (indexArr) {
                for (let i = 0; i < indexArr.length; i++) {
                    set.add(indexArr[i])
                }
            }
        }
        if ((allKatakana || word.basic_form == "*") && readingIndex.has(word.surface_form)) { // For Katakana Search

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
    return set;
}

export function widerSearchText(generalIndex: Map<string, number[]>, readingIndex: Map<string, number[]>, searchWords: Word[]) {
    const removedSearchWords = stopWordRemoval(searchWords);
    let set = new Set<number>();

    for (const key of generalIndex.keys()) {
        if (keySearchWords(key, removedSearchWords)) {
            const indexArr = generalIndex.get(key);
            const tempSet = new Set<number>(indexArr);
            set = new Set<number>([...set, ...tempSet])
        }
    }
    for (const key of readingIndex.keys()) {
        if (keySearchWords(key, removedSearchWords)) {
            const indexArr = readingIndex.get(key);
            const tempSet = new Set<number>(indexArr);
            set = new Set<number>([...set, ...tempSet])
        }
    }
    return set;
}

function keySearchWords(key: string, searchWords: Word[]) {
    for (let i = 0; i < searchWords.length; i++) {
        const word = searchWords[i];

        const allHiragana = word.basic_form.split("").reduce((isHiragana, char) => {
            return isHiragana && (/^[\u3040-\u309F]$/.test(char))
        }, true);
        const allKatakana = word.basic_form.split("").reduce((isHiragana, char) => {
            return isHiragana && (/^[\u30A0-\u30FF]$/.test(char))
        }, true);

        if (key.includes(word.basic_form)) {
            return true;
        }
        if ((allKatakana || word.basic_form == "*") && key.includes(word.surface_form)) {
            return true
        }
        if (allHiragana && key.includes(word.reading)) {
            return true
        }
    }
}
