let output = '안녕!'
const buffer1 = new Buffer(10)
const len = buffer1.write(output, 'utf8')
console.log('버퍼에 쓰인 문자열 길이 : ' + len)
console.log('첫번째 버퍼에 쓰인 문자열 : ' + buffer1.toString())

console.log('버퍼 객체 여부 : ' + Buffer.isBuffer(buffer1))

const byteLen = Buffer.byteLength(buffer1)
console.log('byteLen : ' + byteLen)

const str1 = buffer1.toString('utf8', 0, 6)
console.log('str1 : ' + str1)

const buffer2 = Buffer.from('Hello', 'utf8')
console.log('두번째 버퍼의 길이 : ' + Buffer.byteLength(buffer2))

const str2 = buffer2.toString('utf8', 0, Buffer.byteLength(buffer2))
console.log('str2 : ' + str2)

/*
    버퍼에 쓰인 문자열 길이 : 7
    첫번째 버퍼에 쓰인 문자열 : 안녕!
    버퍼 객체 여부 : true
    byteLen : 10
    str1 : 안녕
    두번째 버퍼의 길이 : 5
    str2 : Hello
*/