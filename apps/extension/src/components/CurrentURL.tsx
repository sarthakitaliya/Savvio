export function CurrentURL() {
  return (
    <div className="flex items-center bg-white dark:bg-[#2A2A2A] p-3 rounded-lg shadow">
      <img
        src="/default-favicon.png"
        alt="Quick Save Icon"
        className="size-7 rounded"
      />
      <div className="ml-5 flex flex-col items-center justify-center truncate">
        <h2 className="text-md font-semibold">
          How to build a Chrome Extension
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer max-w-[200px] truncate">
          https://developer.chrome.com/docs/extensions/mv3/getstarted/
        </p>
      </div>
    </div>
  );
}
