
"use client";

import "../../app/globals.css";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { withBasePath } from "@/lib/paths";

const ResumeDocumentViewer = dynamic(
  () => import("./ResumeDocumentViewer"),
  {
    loading: () => (
      <div className="resume-document-viewer__message">
        Preparing preview…
      </div>
    ),
    ssr: false,
  },
);

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({
  isOpen,
  onClose,
}: ResumeModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const pdfUrl = withBasePath(
    "/assets/Vighneshwara_Vishwanatha_Hebbar_Resume_10_2026.pdf",
  );

  useEffect(() => {
    if (!isOpen) {
      setIsFullscreen(false);
      return;
    }

    const scrollY = window.scrollY;

    const originalBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "Escape") {
        onClose();
      }

      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        setIsFullscreen((previous) => !previous);
      }
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    document.documentElement.classList.add("hide-custom-cursor");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyStyles.overflow;
      document.body.style.position = originalBodyStyles.position;
      document.body.style.top = originalBodyStyles.top;
      document.body.style.width = originalBodyStyles.width;

      document.documentElement.classList.remove("hide-custom-cursor");
      window.removeEventListener("keydown", handleKeyDown);

      window.scrollTo(0, scrollY);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <style jsx global>{`
        .hide-custom-cursor,
        .hide-custom-cursor * {
          cursor: auto !important;
        }
      `}</style>

      <div
        className="resume-modal-overlay fixed inset-0 z-99999 flex items-center justify-center overflow-hidden p-0 backdrop-blur-md transition-opacity animate-in fade-in duration-200 md:p-6"
        onClick={onClose}
        aria-modal="true"
        aria-label="Resume preview"
        role="dialog"
      >
        <div
          className={`resume-modal relative flex h-dvh w-screen max-w-none flex-col overflow-hidden border-0 shadow-2xl transition-all duration-300 md:h-[90vh] md:max-h-230 md:max-w-4xl md:rounded-lg md:border ${
            isFullscreen
              ? "fixed inset-0 z-100000 h-dvh w-screen max-w-none rounded-none md:h-dvh"
              : ""
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <header className="resume-modal__header flex shrink-0 items-center justify-between border-b px-3 py-3 md:px-5 md:py-4">
            <div className="flex min-w-0 items-center gap-2 md:gap-3">
              <div className="flex shrink-0 items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>

              <h3 className="resume-modal__title ml-1 truncate font-display text-xs uppercase tracking-widest md:ml-2 md:text-sm">
                Resume Preview
              </h3>
            </div>

            <div className="flex shrink-0 items-center gap-2 md:gap-3">
              <a
                href={pdfUrl}
                download="Vighneshwara_Hebbar_Resume.pdf"
                className="resume-modal__download flex items-center gap-2 rounded border bg-transparent px-2.5 py-2 font-sans text-xs font-medium shadow-sm transition-all duration-200 md:px-4 md:text-sm"
                title="Download PDF"
                aria-label="Download resume PDF"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span className="hidden sm:inline">Download</span>
              </a>

              <button
                type="button"
                onClick={() =>
                  setIsFullscreen((previous) => !previous)
                }
                className="resume-modal__icon-button hidden rounded border p-2 transition-colors md:block"
                title={
                  isFullscreen
                    ? "Exit Fullscreen (F)"
                    : "Toggle Fullscreen (F)"
                }
                aria-label={
                  isFullscreen
                    ? "Exit fullscreen"
                    : "Enter fullscreen"
                }
              >
                {isFullscreen ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 9L4 4m0 0h5M4 4v5m11 2l5 5m0 0h-5m5 0v-5"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="resume-modal__icon-button resume-modal__close-button rounded border p-2 transition-colors"
                title="Close (Esc)"
                aria-label="Close resume preview"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </header>

          <div className="resume-modal__body relative flex min-h-0 flex-1">
            <ResumeDocumentViewer fileUrl={pdfUrl} />
          </div>
        </div>
      </div>
    </>
  );
}
