
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type ResumeDocumentViewerProps = {
  fileUrl: string;
};

type StageSize = {
  height: number;
  width: number;
};

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.25;

export default function ResumeDocumentViewer({
  fileUrl,
}: ResumeDocumentViewerProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageAspectRatio, setPageAspectRatio] = useState<number | null>(
    null,
  );
  const [stageSize, setStageSize] = useState<StageSize>({
    height: 0,
    width: 0,
  });
  const [zoom, setZoom] = useState(1);
  const [devicePixelRatio, setDevicePixelRatio] = useState(2);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateStageSize = () => {
      setStageSize({
        height: stage.clientHeight,
        width: stage.clientWidth,
      });
    };

    updateStageSize();

    const observer = new ResizeObserver(updateStageSize);
    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Use a sharper canvas render while avoiding excessive memory use.
    const updatePixelRatio = () => {
      setDevicePixelRatio(
        Math.min(3, Math.max(2, window.devicePixelRatio || 1)),
      );
    };

    updatePixelRatio();

    window.addEventListener("resize", updatePixelRatio);

    return () => {
      window.removeEventListener("resize", updatePixelRatio);
    };
  }, []);

  useEffect(() => {
    setNumPages(0);
    setPageNumber(1);
    setPageAspectRatio(null);
    setZoom(1);
  }, [fileUrl]);

  const handlePageChange = useCallback((nextPage: number) => {
    setPageNumber(nextPage);
    setPageAspectRatio(null);
  }, []);

  const canGoBack = pageNumber > 1;
  const canGoForward = numPages > 0 && pageNumber < numPages;

  // Fit the page to the available viewport initially.
  // Zoom changes the requested PDF render width, not CSS scaling.
  const availableWidth = Math.max(1, stageSize.width - 32);
  const availableHeight = Math.max(1, stageSize.height - 32);

  const fitWidth =
    pageAspectRatio && stageSize.height > 0
      ? Math.min(
          availableWidth,
          availableHeight / pageAspectRatio,
        )
      : availableWidth;

  const pageWidth = Math.max(
    1,
    Math.floor(fitWidth * zoom),
  );

  const zoomIn = () => {
    setZoom((current) =>
      Math.min(MAX_ZOOM, current + ZOOM_STEP),
    );
  };

  const zoomOut = () => {
    setZoom((current) =>
      Math.max(MIN_ZOOM, current - ZOOM_STEP),
    );
  };

  const resetZoom = () => setZoom(1);

  return (
    <div className="resume-document-viewer">
      <div
        className="resume-document-viewer__toolbar"
        role="toolbar"
        aria-label="Resume viewing controls"
      >
        <div className="resume-document-viewer__zoom-controls">
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
            title="Zoom out"
          >
            −
          </button>

          <button
            type="button"
            onClick={resetZoom}
            className="resume-document-viewer__zoom-value"
            aria-label="Reset zoom to fit"
            title="Reset zoom"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
            title="Zoom in"
          >
            +
          </button>
        </div>

        {/* <div className="resume-document-viewer__page-controls">
          <button
            type="button"
            disabled={!canGoBack}
            onClick={() => handlePageChange(pageNumber - 1)}
            aria-label="Previous page"
          >
            ‹
          </button>

          <span>
            {pageNumber} / {numPages || "—"}
          </span>

          <button
            type="button"
            disabled={!canGoForward}
            onClick={() => handlePageChange(pageNumber + 1)}
            aria-label="Next page"
          >
            ›
          </button>
        </div> */}
      </div>

      <div
        className="resume-document-viewer__stage"
        ref={stageRef}
      >
        <Document
          file={fileUrl}
          loading={
            <div className="resume-document-viewer__message">
              Loading resume…
            </div>
          }
          error={
            <div className="resume-document-viewer__message">
              <p>Unable to load the preview.</p>
              <a href={fileUrl} target="_blank" rel="noreferrer">
                Open the resume
              </a>
            </div>
          }
          noData={
            <div className="resume-document-viewer__message">
              No resume file available.
            </div>
          }
          onLoadSuccess={({ numPages: totalPages }) => {
            setNumPages(totalPages);
            setPageNumber((current) =>
              Math.min(current, totalPages),
            );
          }}
          onLoadError={(error) => {
            console.error("Failed to load resume PDF:", error);
          }}
        >
          {stageSize.width > 0 && stageSize.height > 0 && (
            <Page
              key={`${pageNumber}-${pageWidth}-${devicePixelRatio}`}
              pageNumber={pageNumber}
              width={pageWidth}
              devicePixelRatio={devicePixelRatio}
              renderTextLayer
              renderAnnotationLayer
              renderForms
              loading={
                <div className="resume-document-viewer__message">
                  Rendering page…
                </div>
              }
              error={
                <div className="resume-document-viewer__message">
                  Unable to render this page.
                </div>
              }
              onLoadSuccess={({ originalHeight, originalWidth }) => {
                setPageAspectRatio(originalHeight / originalWidth);
              }}
            />
          )}
        </Document>
      </div>
    </div>
  );
}
