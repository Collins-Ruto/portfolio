"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
// { Quill }

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

interface EditorProps {
  handleQuillChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ handleQuillChange }) => {
  const [content, setContent] = useState<string>("");

  const handleChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div className="ql-container h-48">
      <ReactQuill
        modules={modules}
        formats={formats}
        theme={"snow"}
        bounds=".ql-container"
        value={content}
        onChange={(content) => {
          handleQuillChange(content);
          handleChange(content);
        }}
      />
    </div>
  );
};

export default Editor;
