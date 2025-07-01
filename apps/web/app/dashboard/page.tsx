"use client";

import { useUserStore } from "@repo/store";
import { SearchBar } from "../../components/ui/SearchBar";


export default function Dashboard() {
  return (
    <div className="m-5">
      <div className="max-w-md mx-auto">
        <SearchBar placeholder="Search your mark" />
      </div>
    </div>
  );
}
