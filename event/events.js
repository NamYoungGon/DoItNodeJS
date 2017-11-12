const Calc = require('./events_calc')

const calc1 = new Calc()
calc1.emit('stop')

console.log('Calc 에 stop 이벤트 전달')


// process.on('test', () => {
//     console.log('fired test event')
// })

// setTimeout(() => {
//     console.log('after 2 second')
//     process.emit('test', 'sff')
// }, 2000)