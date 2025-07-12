export function CurrentURL({
  tabInfo,
}: {
  tabInfo: { title: string; url: string; favIconUrl?: string };
}) {
  return (
    <div className="flex items-center bg-white dark:bg-[#2A2A2A] p-3 rounded-lg shadow">
      <img
        src={tabInfo.favIconUrl}
        alt="Quick Save Icon"
        className="size-7 rounded"
      />
      <div className="ml-5 flex flex-col truncate">
        <h2 className="text-md font-semibold truncate">
          {tabInfo.title || "Untitled Page"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer max-w-[200px] truncate">
          {tabInfo.url || "No URL available"}
        </p>
      </div>
    </div>
  );
}
