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
