import { useAppSelector } from "./hooks";
import { desktopItems } from "./data/items";
import { useAppDispatch } from "./hooks.ts";

// used for moving the app windows
import { useState, useEffect, useCallback } from "react";
import {
  moveWindow,
  focusWindow,
  type WindowState,
} from "./features/windows/windowsSlice";

import DocumentWindow from "./features/documents/DocumentWind";
import Icon from "./components/Icon";
import "./App.css";

import { closeWindow } from "./features/windows/windowsSlice";
import hireBlocksImage from "./assets/hire-blocks.png";

function App() {
  // used for getting the windows state from the redux store
  const windows = useAppSelector((state) => state.windows.byId);

  // used for ispatching actions like focusWindow, moveWindow, closeWindow etc.
  const dispatch = useAppDispatch();

  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [windowStart, setWindowStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, window: WindowState) => {
    e.preventDefault();
    setIsDragging(window.id);
    setDragStart({ x: e.clientX, y: e.clientY });
    setWindowStart({ x: window.x, y: window.y });
    setDragOffset({ x: 0, y: 0 });
    dispatch(focusWindow({ id: window.id }));
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      // Just update local state, no Redux dispatch
      setDragOffset({ x: deltaX, y: deltaY });
    },
    [isDragging, dragStart.x, dragStart.y]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    // Only NOW update Redux with final position
    const newX = windowStart.x + dragOffset.x;
    const newY = windowStart.y + dragOffset.y;
    dispatch(moveWindow({ id: isDragging, x: newX, y: newY }));

    setIsDragging(null);
    setDragOffset({ x: 0, y: 0 });
  }, [
    isDragging,
    windowStart.x,
    windowStart.y,
    dragOffset.x,
    dragOffset.y,
    dispatch,
  ]);

  // Add event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="desktop">
      <div className="desktop-items">
        {desktopItems.map((item) => (
          <div key={item.id} className="desktop-item">
            <Icon id={item.id} name={item.name} icon={item.icon} />
            <span className="desktop-item-name">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Using redux really messed the performance here and made the moving really laggy.  */}
      {/* So we're using local state for the dragging and resizing. */}
      {/* not sure how this holds up in production. */}
      {Object.values(windows).map((window) => (
        <div
          key={window.id}
          className="window"
          style={{
            left:
              isDragging === window.id
                ? windowStart.x + dragOffset.x
                : window.x,
            top:
              isDragging === window.id
                ? windowStart.y + dragOffset.y
                : window.y,
            width: window.width,
            height: window.height,
            zIndex: window.z,
          }}
        >
          <div
            className="window-header"
            onMouseDown={(e) => handleMouseDown(e, window)}
          >
            <span>{window.itemId}</span>
            <button onClick={() => dispatch(closeWindow({ id: window.id }))}>
              ×
            </button>
          </div>
          <div className="window-content">
            <DocumentWindow id={window.itemId} />
          </div>
        </div>
      ))}

      <img
        src={hireBlocksImage}
        alt="Hire blocks"
        className="hire-blocks-image"
      />
    </div>
  );
}

export default App;
