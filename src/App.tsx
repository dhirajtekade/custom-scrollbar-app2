import React from "react";
import ScrollableDiv from "./ScrollableDiv";

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Custom Scrollbar Example</h1>
      <ScrollableDiv>
        <div style={{borderRadius: "12px"}}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Suspendisse potenti. Phasellus consequat nulla vel eros.</p>
        <p>Morbi ut massa nec eros tempor ultricies vel nec nisl.</p>
        <p>Etiam id tincidunt magna. Ut suscipit mollis ligula.</p>
        <p>Aliquam erat volutpat. Donec nec eros ac purus dictum.</p>
        <p>More content to scroll...</p>
        </div>
      </ScrollableDiv>
    </div>
  );
};

export default App;
