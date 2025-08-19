import { folderIcons } from "../lib/ColorsAndIcons";

export function IconsButton({  onChange, selectedIcon }: { onChange?: (icon: string) => void, selectedIcon?: string }) {

    return(
        <div className="grid grid-cols-6 gap-2 w-full max-w-md">
          {folderIcons.map((icon, index) => {
            const IconComponent = icon.icon;
            return (
              <button
                key={index}
                className={`flex items-center justify-center p-2 rounded-md transition-colors border border-transparent hover:border-gray-300 dark:hover:border-gray-600 ${selectedIcon === icon.name ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent'}`}
                title={icon.name}
                onClick={() => onChange?.(icon.name)}
              >
                <IconComponent className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            );
          })}
        </div>
    )
}