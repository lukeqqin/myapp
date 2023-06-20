// 防抖函数
const debounce = function (foo, delay) {
    let timer;
    return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            // 暂时理解不了（this，arguments）指向改变的问题
            foo.call(this, arguments)
            // 不输入延迟 则默认 1000 ms
        }, delay || 1000)
    }
};
export {
    debounce
}
