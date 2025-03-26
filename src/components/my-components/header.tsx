import { BotMessageSquare, Github } from "lucide-react";




export default function Header() {
    return <>
        <div className="flex flex-col w-9/10 m-auto mt-14 mb-24 gap-3">
            <div className="flex justify-between items-center">
                <h1 className=" text-lg sm:text-3xl font-notosans font-semibold">Japanese Search Demo</h1>
                <a href="/jpn-search-demo/" className="hover:text-slate-500">
                    <div className="flex gap-1">
                        <BotMessageSquare />
                        <p>Blog Post</p>
                    </div>
                </a>

            </div>
            <a href="https://github.com/weekiat-douze/jpn-search-demo" className="hover:text-slate-500 w-fit">
                <div className="flex gap-1">
                    <Github />
                    <p className="font-ibmplexmono">jpn-search-demo</p>
                </div>
            </a>

        </div>

    </>
}
