
import { Search } from "lucide-react"

export function SearchBar({placeholder}: {placeholder: string}) {
    return(
        <div className="relative">
            <Search className="absolute top-2 left-2 text-gray-500" />
            <input
                type="text"
                placeholder={placeholder}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />            
        </div>
    )
}