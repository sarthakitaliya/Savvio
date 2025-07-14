import { useEffect, useState } from "react";

export function SettingsPanel() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get(["floatingButtonEnabled"], (result) => {
      if (result.floatingButtonEnabled !== undefined) {
        setEnabled(result.floatingButtonEnabled);
      }
    });
  }, []);

  const handleToggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    chrome.storage.sync.set({ floatingButtonEnabled: newValue });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Settings</h2>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleToggle}
          className="accent-blue-600"
        />
        <span>Enable Floating Bookmark Button</span>
      </label>
    </div>
  );
}