export function FolderCard({folder, onClick}: {
    folder: {
        id: string;
        name: string;
        bookmarksCount: number;
    };
    onClick?: () => void;
}) {
  return (
    <div className="size-40 flex flex-col justify-between p-4 rounded-xl cursor-pointer transition-colors bg-[#E5E7EB] dark:bg-[#2A2A2A] hover:bg-[#D1D5DB] dark:hover:bg-[#3A3A3A]" onClick={onClick}>
      <div className="text-3xl">🎒</div>
      <div>
        <p className="text-lg font-semibold text-[#1F1F1F] dark:text-[#FFFFFFCF]">
          {folder.name}
        </p>
        <p className="text-sm text-[#4B5563] dark:text-[#A1A1AA]">
          {folder.bookmarksCount} {folder.bookmarksCount === 1 ? 'bookmark' : 'bookmarks'}
        </p>
      </div>
    </div>
  );
}
