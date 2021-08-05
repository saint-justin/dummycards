import React from "react";
import Entry from "./Components/Entry.js"
import CardDisplay from "./Components/CardDisplay.js"
import "./App.scss"

const app = () => (
  <>
    <div id='left'>
      <Entry name='Width' placeholder='825' />
      <Entry name='Height' placeholder='1125' />
      <Entry name='Upload CSV' type='file' />
      <button>Re-calculate</button>
    </div>
    <div id='right'>
      I am the right side.
      <CardDisplay />
    </div>
  </>
);

export default app;