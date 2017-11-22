const test1 = (req, res) => {
    const context = {}
    res.render('test1_success')
    // req.app.render('test1_success', context, (err, html) => {
    //     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' })
    //     res.end(html)
    // })
}
    
module.exports.test1 = test1