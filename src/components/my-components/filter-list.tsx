import Word from "@/types/word";


export default function FilterList({ sentences, filter }: { sentences: Word[][], filter: Set<number> }) {


    return <>
        <div className='flex flex-col md:text-xl gap-4 items-start'>

            {
                filter.size === 0 ? sentences.map((sentence, i) => {
                    const joinedSentence = sentence.reduce((joined, word) => {
                        return joined + word.surface_form;
                    }, "");
                    return <p key={i} className='text-slate-600'>{joinedSentence}</p>

                })
                    : sentences.filter((sentence, i) => {
                        return filter.has(i);
                    }).map((sentence, i) => {
                        const joinedSentence = sentence.reduce((joined, word) => {
                            return joined + word.surface_form;
                        }, "");
                        return <p key={i} className='text-slate-600'>{joinedSentence}</p>
                    })
            }
        </div>


    </>;
}
