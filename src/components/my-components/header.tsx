import { BotMessageSquare, Github } from "lucide-react";




export default function Header() {
    return <>
        <div className="flex flex-col w-9/10 m-auto mt-14 gap-3">
            <div className="flex justify-between">
                <h1 className="text-3xl font-notosans font-semibold">Japanese Search Demo</h1>
                <a href="/" className="hover:text-slate-500">
                    <div className="flex gap-1">
                        <BotMessageSquare />
                        <p>Blog Post</p>
                    </div>
                </a>

            </div>
            <a href="/" className="hover:text-slate-500">
                <div className="flex gap-1">
                    <Github />
                    <p className="font-ibmplexmono">jpn-search-demo</p>
                </div>
            </a>

        </div>

    </>
}
