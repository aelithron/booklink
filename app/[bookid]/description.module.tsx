"use client"
import { faCaretSquareDown, faCaretSquareUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useState } from "react";

export default function DescriptionModule({ desc }: { desc: string }): ReactNode {
  const [descOpen, setDescOpen] = useState<boolean>(false);
  return (
    <div className="flex gap-1 p-2 text-md">
      <ParseDesc text={desc} open={descOpen} />
      <button onClick={() => setDescOpen(!descOpen)} className="hover:text-sky-500 justify-end items-start">
        <FontAwesomeIcon icon={descOpen ? faCaretSquareUp : faCaretSquareDown} />
      </button>
    </div>
  );
}
function ParseDesc({ text, open }: { text: string, open: boolean }): ReactNode {
  if (text === "") return <p className="italic">No description available</p>
  if (open) {
    return <p>{text}</p>;
  } else {
    return <p>{truncateDesc(text)}</p>;
  }
}
function truncateDesc(text: string): string {
  const maxLength = 150;
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}