import { useState } from "react";

function Folder({handleInsertNode,explorer}) {
    //console.log(explorer);
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null
    });

    const handleNewFolder = (event, isFolder) => {
        event.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder
        })
    }
    const onAddFolder = (event) => {
        if (event.keyCode === 13 &&  event.target.value) {
            handleInsertNode(explorer.id, event.target.value, showInput.isFolder)
            setShowInput({...showInput, visible: false})
        }
    };


    if(explorer.isFolder){ 
    return <div style={{ marginTop: 5, paddingLeft:10}}>
        <div className="folder" onClick={() => setExpand(!expand)}  >
            <span>📁{explorer.name}</span>
        <div>
            <button onClick={(event) => handleNewFolder(event, true)}>New folder</button>
            <button onClick={(event) => handleNewFolder(event, false)}>file</button>
            </div>    
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25}}>
            {
                showInput.visible && (
                    <div className="inputContainer">
                        <span>{showInput.isFolder? "📁" : "🗂"}</span>
                        <input 
                        type="text"
                        onKeyDown={onAddFolder}
                        onBlur={() => setShowInput({...showInput, visible: false})}
                        className="inputContainer__input"
                        autoFocus
                        />
                    </div>
                )
            }
            {explorer.items.map((exp) => {
                return <Folder
                handleInsertNode={handleInsertNode}
                explorer={exp} key={exp.id}/>
                
            })}
        </div>
    </div>
 } else {
    return <span className="file">🗂{explorer.name}</span>
 }
}

export default Folder;