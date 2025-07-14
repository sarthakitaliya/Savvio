import { useFolderStore } from "@repo/store";
import { Folder as FolderIcon, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Folder } from "@prisma/client";
import { folderIcons } from "../components/ColorsAndIcons";

const styles = {
  floatingBtn: {
    position: "fixed" as const,
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    background: "linear-gradient(to bottom right, #3b82f6, #9333ea)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px 0 rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    zIndex: 1000001,
    color: "#fff",
    border: "none",
    outline: "none",
  },
  floatingBtnHover: {
    transform: "scale(1.1)",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px 0 rgba(0, 0, 0, 0.04)",
  },
  floatingDropdown: {
    position: "fixed" as const,
    bottom: 90,
    right: 20,
    width: 320,
    background: "#202020",
    borderRadius: 18,
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    border: "1.5px solid #333",
    zIndex: 1000000,
    display: "flex",
    flexDirection: "column" as const,
    animation: "slide-in-from-bottom 0.25s cubic-bezier(.4,0,.2,1)",
  },
  floatingDropdownHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 20px 12px 20px",
    borderBottom: "1px solid #333",
  },
  floatingDropdownTitle: {
    fontSize: "1.08rem",
    fontWeight: 600,
    color: "#fff",
  },
  floatingDropdownClose: {
    background: "none",
    border: "none",
    color: "#a1a1aa",
    fontSize: "1.3rem",
    cursor: "pointer",
    padding: 0,
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.2s",
  },
  floatingDropdownCloseHover: {
    color: "#fff",
  },
  floatingDropdownList: {
    padding: "8px 0",
    maxHeight: 320,
    overflowY: "auto" as const,
    overflowX: "hidden" as const,
  },
  floatingDropdownFolder: {
    display: "flex",
    alignItems: "center",
    padding: "12px 24px",
    borderRadius: 10,
    cursor: "pointer",
    transition: "background 0.18s, transform 0.18s",
    fontSize: "1rem",
    color: "#f3f4f6",
    fontWeight: 500,
    gap: 14,
  },
  floatingDropdownFolderHover: {
    background: "#333",
    transform: "scale(1.03)",
  },
  floatingDropdownFolderIcon: {
    fontSize: "1.25rem",
    filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.08))",
  },
  floatingDropdownUrl: {
    padding: "14px 24px",
    borderTop: "1px solid #333",
    background: "#181818",
    borderRadius: "0 0 18px 18px",
    fontSize: "0.85rem",
    color: "#bdbdbd",
    wordBreak: "break-all" as const,
    lineHeight: 1.5,
  },
};

export default function FloatingBookmarkButton({
  folders,
}: {
  folders: Folder[];
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [btnHover, setBtnHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);
  const [folderHover, setFolderHover] = useState<string | null>(null);
  const currentUrl = window.location?.href || "No URL available";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Auto-dismiss notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFolderClick = (folderId: string, folderName: string) => {
    setNotification({ message: `Saved to ${folderName}!`, type: "success" });
    console.log(`Bookmark saved to folder ID: ${folderId}`);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Dropdown */}
      {isDropdownOpen && (
        <div ref={dropdownRef} style={styles.floatingDropdown}>
          {/* Header */}
          <div style={styles.floatingDropdownHeader}>
            <span style={styles.floatingDropdownTitle}>Save to folder</span>
            <button
              onClick={() => setIsDropdownOpen(false)}
              style={{
                ...styles.floatingDropdownClose,
                ...(closeHover ? styles.floatingDropdownCloseHover : {}),
              }}
              aria-label="Close dropdown"
              onMouseEnter={() => setCloseHover(true)}
              onMouseLeave={() => setCloseHover(false)}
            >
              <X size={18} />
            </button>
          </div>
          {/* Folders */}
          <div style={styles.floatingDropdownList}>
            {folders.map((folder) => {
              const IconComponent =
                folderIcons.find((f) => f.name === folder.icon)?.icon || FolderIcon;
              return (
                <div
                  key={folder.id}
                  onClick={() => handleFolderClick(folder.id, folder.name)}
                  style={{
                    ...styles.floatingDropdownFolder,
                    ...(folderHover === folder.id
                      ? styles.floatingDropdownFolderHover
                      : {}),
                  }}
                  onMouseEnter={() => setFolderHover(folder.id)}
                  onMouseLeave={() => setFolderHover(null)}
                >
                  <span style={styles.floatingDropdownFolderIcon}>
                    <IconComponent size={20} />
                  </span>
                  <span>{folder.name}</span>
                </div>
              );
            })}
          </div>

          {/* Current URL */}
          <div style={styles.floatingDropdownUrl}>{currentUrl}</div>
        </div>
      )}
      {/* Floating Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        style={{
          ...styles.floatingBtn,
          ...(btnHover ? styles.floatingBtnHover : {}),
        }}
        aria-label="Open Save Bookmark Dropdown"
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </button>
      {/* Notification */}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            padding: "12px 20px",
            borderRadius: 12,
            fontWeight: 500,
            fontSize: 14,
            color: "#fff",
            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px 0 rgba(0,0,0,0.05)",
            zIndex: 1000001,
            background: notification.type === "success" ? "#22c55e" : "#ef4444",
            transition: "all 0.3s",
            animation: "slide-in-from-right 0.3s",
          }}
        >
          {notification.message}
        </div>
      )}
    </>
  );
}
