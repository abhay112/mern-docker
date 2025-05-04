const fs = require('fs');
const path = require('path');

// Function to build the tree structure recursively, excluding 'node_modules'
function getTreeStructure(dirPath) {
  // Skip 'node_modules' directory
  if (path.basename(dirPath) === 'node_modules' || path.basename(dirPath) === '.next') {
    return null;
  }

  const stats = fs.statSync(dirPath);
  if (stats.isFile()) {
    return path.basename(dirPath); // Return the file name if it's a file
  }

  if (stats.isDirectory()) {
    const children = fs.readdirSync(dirPath);
    const tree = {};

    children.forEach((child) => {
      const childPath = path.join(dirPath, child);
      const childTree = getTreeStructure(childPath); // Recursively call for subdirectories and files
      if (childTree) {
        tree[child] = childTree; // Only include non-null trees
      }
    });

    return tree; // Return the directory structure as an object
  }

  return null;
}

// Example usage
const directoryPath = './'; // Set the root directory path you want to explore
const tree = getTreeStructure(directoryPath);

console.log(JSON.stringify(tree, null, 2));