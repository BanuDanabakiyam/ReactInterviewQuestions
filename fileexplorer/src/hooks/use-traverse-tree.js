const useTraverseTree = () => {
    function insertNode(tree, folderId, item, isFolder) {
        console.log("1.",tree);
        console.log("2.",folderId)
        if(tree.id === folderId && tree.isFolder) {
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder,
                items: []
            });
            return tree;

        }
        let latestNode = [];
        latestNode = tree.items.map((obj) => {
            return insertNode(obj, folderId, item, isFolder);
        }); 
        return { ...tree, items: latestNode };
    }
    return { insertNode };
}

export default useTraverseTree;