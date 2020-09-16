export default (params) => {
    uni.showLoading({
        title: '加载中'
    })
    return new Promise((resolve, reject) => {
        wx.request({
            // 解构传递过来的参数
            ...params,
            /**
             * 成功函数
             * @param res   参数
             */
            success(res) {
                resolve(res.data)
            },
            /**
             * 失败函数
             * @param err   参数
             */
            fail(err) {
                reject(err)
            },
            complete() {
                uni.hideLoading()
            }
        })
    })
}
