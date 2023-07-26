import { useState } from "react";
import explorer from "./data/folderData";
import Folder from "./components/Folder";
import "./style.css";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  // console.log(explorerData);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    console.log("00", folderId);
    const finalTree = insertNode(explorerData,folderId, item, isFolder );
    setExplorerData(finalTree);
  }

  return (
    <div>
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData}/>
    </div>
  );
}

export default App;
