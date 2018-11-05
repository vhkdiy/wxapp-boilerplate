const showToast = (title) => {
    wx.showToast({
        title: title || '网络异常，请重试',
        icon: 'none',
        duration: 2500
    })
}

function request(url, data, method = 'GET') {
    wx.showLoading({
        title: '加载中...',
    })

    return new Promise((resolve, reject) => {
        wx.request({
            url,
            method,
            header: {
                'Content-Type': 'application/json'
            },
            data,
            success(res) {
                wx.hideLoading()
                if (res.statusCode === 200) {
                    if (res.data.code !== 0) {
                        showToast(res.data.msg)
                        reject(res)
                    } else {
                        resolve(res)
                    }
                } else {
                    showToast()
                    reject(res)
                }
            },
            fail(err) {
                wx.hideLoading()
                showToast()
                reject(err)
                console.log('failed')
            }
        })
    })
}

function getUserInfo() {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: (res) => {
                            resolve(res)
                        }
                    })
                } else {
                    reject(res)
                }
            }
        })
    })
}

module.exports = {
    request,
    getUserInfo
}
