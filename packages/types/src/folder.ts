import type { Bookmark } from "./bookmark";

export interface Folder {
  id: string;
  name: string;
  color?: string | null;
  icon?: string | null;
  _count: {
    bookmarks: number;
  };    
  createdAt: string;

  userId: string;
  parentId?: string | null;

  children?: Folder[];
  bookmarks?: Bookmark[];
}

export interface CreateFolderPayload {
  name: string;
  parentId?: string | null;
  color?: string;
  icon?: string;
}

export interface UpdateFolderPayload extends CreateFolderPayload {
  id: string;
}

export interface DeleteFolderPayload {
  id: string;
}
