
import Word from "@/types/word";

export default function WordBlock({ word }: { word: Word }) {
    return <>
        <div className="flex flex-col items-center text-xl">
            <p>
                {word.surface_form}
            </p>
            <p className="text-xs">
                {word.pos}
            </p>
        </div>

    </>;
}
