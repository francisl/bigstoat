
function extractPath(root, separator, array, index) {
    if (index === 0){
        return `${root}${array[index]}`;
    }
    return root + array.slice(0, index+1).reduce((previousValue, currentValue, currentIndex, array) => {
        return `${previousValue}${separator}${currentValue}`;
    });
}

function BreadcrumbBuilder (path, separator){
    var combinedPath = [];
    const pwd = path.requestDir;
    var splitedPath;
    if (pwd.startsWith(separator)){
        splitedPath = pwd.slice(1).split(separator);
        combinedPath.push({
            path: path.root,
            currentDir: false,
            type: 'root',
            icon: 'root',
            name: '/'
        });
    } else {
        splitedPath = pwd.split(separator);
    }

    var stepPath = path.root;
    splitedPath.forEach((pItem, index, array) => {
        combinedPath.push({
            path: extractPath(path.root, separator, array, index),
            currentDir: array.length-1 === index,
            icon: undefined,
            type: array.length-1 === index ? 'currentDir' : '',
            name : pItem
        });
    });
    return combinedPath;
}

export default BreadcrumbBuilder;
