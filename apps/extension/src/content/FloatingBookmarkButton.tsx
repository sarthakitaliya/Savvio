import { BookmarkIcon, Folder as FolderIcon, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Folder } from "@prisma/client";
import { folderIcons } from "../components/ColorsAndIcons";
import { Loading } from "./Loding";
import type { CreateBookmarkPayload } from "@repo/types";

const styles = {
  floatingBtn: {
    position: "fixed" as const,
    bottom: 20,
    right: 20,
    width: 42,
    height: 42,
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
    bottom: 70,
    right: 20,
    width: 280,
    maxHeight: 300,
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
    padding: "10px 20px",
    maxWidth: "100%",
    borderTop: "1px solid #333",
    background: "#181818",
    borderRadius: "0 0 18px 18px",
    fontSize: "10px",
    color: "#bdbdbd",
    whiteSpace: "nowrap" as const,
    overflow: "hidden" as const,
    textOverflow: "ellipsis" as const,
  },
};

export default function FloatingBookmarkButton({
  folders,
  notification,
  setNotification,
}: {
  folders: Folder[];
  notification: {
    message: string;
    type: "success" | "error";
  } | null;
  setNotification: React.Dispatch<
    React.SetStateAction<{
      message: string;
      type: "success" | "error";
    } | null>
  >;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [btnHover, setBtnHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);
  const [folderHover, setFolderHover] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const currentUrl = window.location?.href || "No URL available";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
    }
  };

  const handleSaveBookmark = async (folderId: string, folderName: string) => {
    setIsDropdownOpen(false);
    setLoading(true);

    const payload: CreateBookmarkPayload = {
      type: "url",
      url: window.location.href,
      folderId,
      tags: [],
    };

    chrome.runtime.sendMessage(
      { type: "ADD_BOOKMARK", payload },
      (response) => {
        setLoading(false);
        if (chrome.runtime.lastError) {
          console.error("Error adding bookmark:", chrome.runtime.lastError);
          setNotification({
            message: "Failed to save bookmark.",
            type: "error",
          });
          return;
        }
        if (response.success) {
          setNotification({
            message: `Bookmark saved to ${folderName}`,
            type: "success",
          });
        } else if (response.error) {
          setNotification({
            message: response.error,
            type: "error",
          });
        }
      }
    );
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "b" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setIsDropdownOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          style={styles.floatingDropdown}
          onMouseDown={(e) => e.stopPropagation()}
        >
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
            {loading ? (
              <div
                style={{
                  padding: "16px 24px",
                  color: "#999",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Loading />
              </div>
            ) : folders.length > 0 ? (
              folders.map((folder) => {
                const IconComponent =
                  folderIcons.find((f) => f.name === folder.icon)?.icon ||
                  FolderIcon;
                return (
                  <div
                    key={folder.id}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => handleSaveBookmark(folder.id, folder.name)}
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
              })
            ) : (
              <div style={{ padding: "16px 24px", color: "#888" }}>
                No folders available
              </div>
            )}
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
        {loading ? <Loading /> : <BookmarkIcon size={20} />}
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
