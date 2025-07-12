export function BookmarkForm({ activeTab }: { activeTab: "url" | "note" }) {
  return (
    <div className="mt-4">
      <form action="">
        <label htmlFor="title" className="block text-sm font-medium mt-2 mb-1">
          Title(optional)
        </label>
        <input
          type="text"
          id="title"
          className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full placeholder-gray-400 dark:placeholder-gray-500 mb-2"
          placeholder="Enter title"
        />
        {activeTab === "url" && (
          <div>
            <label htmlFor="url" className="text-sm font-medium mb-1">
              URL
            </label>
            <input
              type="text"
              id="url"
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Enter URL"
            />
          </div>
        )}
        {activeTab === "note" && (
          <div>
            <label htmlFor="note" className="block text-sm font-medium mb-1">
              Note
            </label>
            <textarea
              id="note"
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Enter note"
            />
          </div>
        )}
        <label htmlFor="folder" className="block text-sm font-medium mt-2 mb-1">
          Folder
        </label>
        <select
          id="folder"
          className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full"
        >
          <option value="">Select a folder</option>
          <option value="folder1">Folder 1</option>
          <option value="folder2">Folder 2</option>
          <option value="folder3">Folder 3</option>
        </select>
        <label htmlFor="tags" className="block text-sm font-medium mt-2 mb-1">
          Tags (optional)
        </label>
        <input
          type="text"
          id="tags"
          className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full placeholder-gray-500"
          placeholder="Enter tags separated by commas"
        />
        <button
          type="submit"
          className="mt-4 font-semibold bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
}
