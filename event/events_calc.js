const EventEmitter = require('events').EventEmitter

// prototype 객체 쉽게 상속할수 있게 지원
const util = require('util')

const Calc = function () {
    this.on('stop', () => {
        console.log('fired Calc stop event')
    })
}

util.inherits(Calc, EventEmitter)

Calc.prototype.add = (a, b) => {
    return a + b
}

module.exports = Calc