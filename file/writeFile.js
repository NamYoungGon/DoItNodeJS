const fs = require('fs')

fs.writeFile('./output.txt', 'Hello', (err) => {
    if (err) {
        console.log('error')
        console.dir(err)
        return false
    }

    console.log('output.txt 파일 작성 완료')
})