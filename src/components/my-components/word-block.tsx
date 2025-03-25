
import Word from "@/types/word";
import { motion } from "motion/react";

const colors: { [key in "名詞" | "助詞" | "連体詞" | "形容詞" | "副詞" | "動詞"]: string } = {
    "名詞": "text-gray-600",
    "助詞": "text-gray-800",
    "連体詞": "text-gray-500",
    "形容詞": "text-gray-700",
    "副詞": "text-gray-500",
    "動詞": "text-gray-900",
}


export default function WordBlock({ word }: { word: Word }) {
    const color = word.pos in colors ? colors[word.pos as keyof typeof colors] : "text-slate-600";
    return <>
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={"flex flex-col items-center text-xl " + color}>
            <p>
                {word.surface_form}
            </p>
            <p className="text-xs">
                {word.pos}
            </p>
        </motion.div>

    </>;
}
