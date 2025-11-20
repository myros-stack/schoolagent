"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export function UploadPanel() {
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) {
    if (!acceptedFiles.length) return;
    setStatus("uploading");
    setMessage(null);

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error ?? "Upload failed");
      }

      setStatus("success");
      setMessage("PDF uploaded. The agent is parsing it now.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Upload failed");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop
  });

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer rounded-3xl border-2 border-dashed border-slate-300 bg-white p-6 text-center transition hover:border-primary-400"
    >
      <input {...getInputProps()} />
      <p className="text-sm font-semibold text-slate-700">
        {isDragActive ? "Drop the PDF here" : "Upload class newsletters or permission slips (PDF)"}
      </p>
      <p className="mt-2 text-xs text-slate-500">Supabase Storage keeps files encrypted at rest.</p>
      {status !== "idle" && (
        <p
          className={`mt-4 text-sm ${
            status === "error" ? "text-red-600" : "text-primary-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

