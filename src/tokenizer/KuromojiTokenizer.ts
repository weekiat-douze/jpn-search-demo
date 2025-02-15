import kuromoji from '@aiktb/kuromoji'

let TOKENIZER: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any


export default async function KuromojiTokenizer(): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    return new Promise((resolve, reject) => {
        if (TOKENIZER != null) {
            console.log("hello")
            resolve(TOKENIZER);
        } else {
            kuromoji.builder({ dicPath: "./dict/" }).build((err, tokenizerBuild) => {
                if (!err) {
                    TOKENIZER = tokenizerBuild
                    resolve(tokenizerBuild);
                } else {
                    reject(err);
                }
            })
        }

    })
};
