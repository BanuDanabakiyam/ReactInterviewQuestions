import { useState } from "react";
import explorer from "./data/folderData";


function App() {
  const [explorerData, setExplorerData] = useState([explorer]);
  console.log(explorerData);

  return (
    <div></div>
  );
}

export default App;
