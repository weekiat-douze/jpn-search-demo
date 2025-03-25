import Word from "@/types/word";
import { AnimatePresence, motion } from "motion/react";

export default function FilterList({ sentences, filter, searchWord }: { sentences: Word[][], filter: Set<number>, searchWord: Word[] }) {

    return <>
        <motion.div
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            exit={{ y: 500 }}
            className='flex flex-col md:text-xl gap-4 items-center w-9/10 m-auto'>
            <AnimatePresence mode="popLayout">


                {
                    sentences.filter((_, i) => {
                        return searchWord.length === 0 || filter.has(i);
                    }).map((sentence) => {
                        const joinedSentence = sentence.reduce((joined, word) => {
                            return joined + word.surface_form;
                        }, "");
                        return <motion.div
                            layout
                            key={joinedSentence}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        // transition={{ type: "spring" }}
                        >
                            <p className='text-slate-600'>{joinedSentence}</p>
                        </motion.div>
                    })
                }
            </AnimatePresence>
        </motion.div>


    </>;
}
