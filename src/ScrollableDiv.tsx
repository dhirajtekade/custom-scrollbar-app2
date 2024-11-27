import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Styled components
const ScrollWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ScrollContent = styled.div`
  width: 300px;
  height: 200px;
  overflow: hidden; /* Hide the default scrollbar */
  padding-right: 15px; /* Add space for the external scrollbar */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
`;

const WrapperContent = styled.div`
  border-radius: 12px;
  padding: 10px;
  background-color: #f9f9f9;
`;

const ScrollBar = styled.div`
  position: absolute;
  top: 0;
  right: -15px; /* Place the scrollbar outside the content */
  width: 10px;
  height: 100%;
  background-color: #ddd;
  cursor: pointer;
`;

const ScrollThumb = styled.div<{ height: number; top: number }>`
  position: relative;
  width: 100%;
  background-color: #aaa;
  border-radius: 5px;
  height: ${(props) => props.height}px;
  margin-top: ${(props) => props.top}px;
`;

interface ScrollableDivProps {
  children: React.ReactNode;
}

const ScrollableDiv: React.FC<ScrollableDivProps> = ({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState(50); // Initial thumb height
  const [thumbTop, setThumbTop] = useState(0); // Initial thumb position

  useEffect(() => {
    const adjustThumbHeight = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const visibleHeight = contentRef.current.clientHeight;
        const newThumbHeight = (visibleHeight / contentHeight) * 200; // Adjust based on container height
        setThumbHeight(newThumbHeight);
      }
    };

    adjustThumbHeight();
    window.addEventListener("resize", adjustThumbHeight);

    return () => {
      window.removeEventListener("resize", adjustThumbHeight);
    };
  }, []);

  const handleScroll = () => {
    if (contentRef.current) {
      const scrollRatio =
        contentRef.current.scrollTop /
        (contentRef.current.scrollHeight - contentRef.current.clientHeight);
      setThumbTop(scrollRatio * (200 - thumbHeight));
    }
  };

  const handleThumbDrag = (event: React.MouseEvent) => {
    const startY = event.clientY;
    const startThumbTop = thumbTop;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (contentRef.current) {
        const deltaY = moveEvent.clientY - startY;
        const newThumbTop = Math.min(
          Math.max(0, startThumbTop + deltaY),
          200 - thumbHeight
        );
        setThumbTop(newThumbTop);

        const scrollRatio =
          newThumbTop / (200 - thumbHeight); // 200 is the scrollbar height
        contentRef.current.scrollTop =
          scrollRatio *
          (contentRef.current.scrollHeight - contentRef.current.clientHeight);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    event.preventDefault();
  };

  return (
    <ScrollWrapper>
      <ScrollContent ref={contentRef} onScroll={handleScroll}>
        <WrapperContent>{children}</WrapperContent>
      </ScrollContent>
      <ScrollBar>
        <ScrollThumb
          height={thumbHeight}
          top={thumbTop}
          onMouseDown={handleThumbDrag}
        />
      </ScrollBar>
    </ScrollWrapper>
  );
};

export default ScrollableDiv;
