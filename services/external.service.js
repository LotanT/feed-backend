function execute() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) resolve(parseInt(Math.random() * 100))
            else reject(_getRandomError())
        }, 5000)
    })
}

function _getRandomError() {
    const errors = ['High Temparture', 'Lost internet connection', 'Sorry its late', 'stack overflow']
    const randomIdx = _getRandomInt(0, errors.length)
    return errors[randomIdx]
}

function _getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    execute,
};
