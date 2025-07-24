"use client"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function CopyButton({ id }: { id: number }) {
  function copyLink() {
    navigator.clipboard.writeText(`${window.location.origin}/${id}`);
    alert("Copied link to clipboard!");
  }
  return <button onClick={() => copyLink()} className="px-2 py-1 bg-slate-500 border-slate-700 border-2 rounded-xl">
    <FontAwesomeIcon icon={faCopy} /> Copy Link
  </button>
}