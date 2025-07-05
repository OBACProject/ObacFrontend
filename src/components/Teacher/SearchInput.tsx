"use client";
import { useEffect, useState } from "react";
import React from "react";

interface SearchProps {
  onSearchKeyword: (keyword: string) => void;
  edit:boolean;
}

export default function SearchInput({ onSearchKeyword,edit }: SearchProps) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <div className="flex gap-5  items-center justify-center">
        <input
          type="text"
          disabled={edit}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-gray-200 rounded-sm border px-4 py-1"
          placeholder="Search..."
          onKeyDown={(e)=>{
            if (e.key == "Enter"){
              onSearchKeyword(query)
            }
          }}
        />
        <button
          className="bg-blue-500 py-1 text-white px-10 rounded-sm"
          disabled={edit}
          onClick={() => {
            onSearchKeyword(query);
          }}
        >
          ค้นหา
        </button>
      </div>
    </div>
  );
}
