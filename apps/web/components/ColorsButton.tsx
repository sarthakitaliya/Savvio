import { folderColors } from "../lib/ColorsAndIcons";

export function ColorsButton({
  onChange,
  selectedColor,
}: {
  onChange: (color: string) => void;
  selectedColor: string;
}) {

  return (
    <div className="grid grid-cols-6 gap-2 w-full max-w-md">
      {folderColors.map((color, index) => (
        <button
          key={index}
          className={`w-8 h-8 rounded-full transition-colors border-1 ${
            selectedColor === color.color
              ? "ring-2 dark:ring-white dark:border-white border-gray-300"
              : "border-transparent"
          } hover:opacity-80`}
          style={{ backgroundColor: color.color }}
          title={color.name}
          onClick={() => onChange?.(color.color)}
        />
      ))}
    </div>
  );
}
