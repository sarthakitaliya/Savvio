import { FolderCard } from "./FolderCard";

export function FolderLayout() {
  return (
    <div className="flex items-center justify-center lg:flex-nowrap flex-wrap gap-5 sm:gap-7 mt-20 mb-10 md:mx-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <FolderCard
          folder={{
            id: `folder-${index + 1}`,
            name: `Folder ${index + 1}`,
            bookmarksCount: Math.floor(Math.random() * 20) + 1,
          }}
          key={index}
          onClick={() => console.log(`Clicked on Folder ${index + 1}`)}
        />
      ))}
    </div>
  );
}

{
  /* <div className="text-3xl mb-4">📂</div>
      <p className="text-lg font-semibold text-[#1F1F1F] dark:text-[#FFFFFFCF]">
        No folders yet
      </p>
      <p className="text-sm text-[#4B5563] dark:text-[#A1A1AA]">
        Create a folder to organize your bookmarks
      </p> */
}
