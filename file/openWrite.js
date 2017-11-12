const fs = require('fs')

fs.open('./output.txt', 'w', (err, fd) => {
    if (err) {
        console.log('파일 오픈 시 에러 발생')
        console.dir(err)
        return false
    }

    const buf = new Buffer('안녕!\n')
    fs.write(fd, buf, 0, buf.length, null, (err, written, buffer) => {
        if (err) {
            console.log('파일 쓰기 시 에러 발생')
            console.dir(err)
            return false
        }

        console.log('파일 쓰기 완료')

        fs.close(fd, () => {
            console.log('파일 닫기 완료')
        })
    })
})