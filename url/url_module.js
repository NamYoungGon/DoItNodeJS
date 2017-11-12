const url = require('url')

const urlStr = 'http://book.naver.com/bookdb/book_detail.nhn?bid=11738465'

const curUrl = url.parse(urlStr)
console.log(curUrl)
/*
    Url {
        protocol: 'http:',
        slashes: true,
        auth: null,
        host: 'book.naver.com',
        port: null,
        hostname: 'book.naver.com',
        hash: null,
        search: '?bid=11738465',
        query: 'bid=11738465',
        pathname: '/bookdb/book_detail.nhn',
        path: '/bookdb/book_detail.nhn?bid=11738465',
        href: 'http://book.naver.com/bookdb/book_detail.nhn?bid=11738465' 
    }
*/

const curStr = url.format(curUrl)
console.log(curStr)
/*
    http://book.naver.com/bookdb/book_detail.nhn?bid=11738465
*/

const queryString = require('querystring')
const params = queryString.parse(curUrl.query)
console.log(params)
/*
    { bid: '11738465' }
*/