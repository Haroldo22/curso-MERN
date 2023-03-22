function getFilePath(file){
    const filePath = file.path
    const fileSplit = filePath.split("\\")

    return `${fileSplit[3]}/${fileSplit[4]}`
}

module.exports = {
    getFilePath
}