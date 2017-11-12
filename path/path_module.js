// const os = require('os')

// console.log('hostname: ' + os.hostname())
// console.log('memory: ' + os.freemem())

const path = require('path')
const directories = ['Users', 'Mars', 'docs']

const dirStr = directories.join('\\')
console.log(dirStr)

const dirStr2 = directories.join(path.sep)
console.log(dirStr2)

console.log(path.join(...directories))

const filepath = path.join('Users/Mars/', 'notepad.exe')
console.log('filepath : ' + filepath)

const dirname = path.dirname(filepath)
console.log('dirname : ' + dirname)

const basename = path.basename(filepath)
console.log('basename : ' + basename)

const extname = path.extname(filepath)
console.log('extname : ' + extname)

/*
    Result

    Users\Mars\docs
    Users\Mars\docs
    Users\Mars\docs
    filepath : Users\Mars\notepad.exe
    dirname : Users\Mars
    basename : notepad.exe
    extname : .exe

*/
