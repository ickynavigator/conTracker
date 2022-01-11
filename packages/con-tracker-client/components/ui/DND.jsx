import React, { useEffect, useRef, useState } from "react";

function DragnDrop({ children, handleFileDrop }) {
  const dropRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  function handleDragIn(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  }

  function handleDragOut(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter - 1);
    setDragging(false);
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      setDragCounter(0);
    }
  }

  useEffect(() => {
    const div = dropRef.current;
    // in
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);
    // out
    return () => {
      div.removeEventListener("dragenter", handleDragIn);
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  }, []);

  const styles = {
    "border-style": "dotted",
    "background-color": "white",
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    "z-index": "9999",
    "justify-content": "center",
    "align-items": "center",
  };
  return (
    <div className="position-relative" ref={dropRef}>
      {dragging && (
        <div className="border border-4 border-light" styles={styles}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="fs-3 fw-bold">Drop here :)</div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export default DragnDrop;
