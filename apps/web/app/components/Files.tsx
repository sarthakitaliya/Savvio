export interface FilesProp {
    name: String
}


export const Files = (props: FilesProp) => {
    return <div className="hover:border-1 hover:border-white h-24 rounded-xl w-44 bg-[#191919] overflow-hidden">
                <div className="h-1/3 bg-[#202020]"></div>
                <div className="h-2/3 flex items-center text-xl justify-start p-5">{props.name}</div>
    </div>
}