export type BookmarkType = "url" | "notes";

export interface UrlBookmarkPayload {
  type: "url";
  url: string;
  title?: string;
  folderId: string;
  tags?: string[];
}

export interface NoteBookmarkPayload {
  type: "notes";
  title: string;
  notes: string;
  folderId: string;
  tags?: string[];
}

export type CreateBookmarkPayload = UrlBookmarkPayload | NoteBookmarkPayload;

export interface UpdateBookmarkPayload {
  id: string;
  type?: BookmarkType;
  title?: string;
  url?: string | null;
  notes?: string | null;
  folderId?: string | null;
  tags?: string[];
}

export interface DeleteBookmarkPayload {
  id: string;
}

export interface Tag {
  id: string;
  name: string;
  userId: string;
}

export interface Bookmark {
  id: string;
  type: BookmarkType;
  title: string;
  url: string | null;
  notes: string | null;
  folderId: string;
  userId: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}