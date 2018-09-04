Page({
  data: {
    infoMap: [
      {
        id: 0,
        type: 'gn',
        name: '国内'
      },
      {
        id: 1,
        type: 'gj',
        name: '国际'
      },
      {
        id: 2,
        type: 'cj',
        name: '财经'
      },
      {
        id: 3,
        type: 'yl',
        name: '娱乐'
      },
      {
        id: 4,
        type: 'js',
        name: '军事'
      },
      {
        id: 5,
        type: 'ty',
        name: '体育'
      },
      {
        id: 6,
        type: 'other',
        name: '其他'
      }
    ],
    message: [],
    newsType: 'gn',
    randomIndex: Math.floor((Math.random() * 10) % 3)//随机数字，选择大图片的index
  },

  onLoad() {
    this.setBar()
    this.getNew()
  },

  //发起http请求，读取回来数据
  getNew(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data:{
        type: this.data.newsType
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        this.setNews(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

//对数据进行操作
setNews(result) {
  let message = []
  for(let i=0; i<result.length; i++) {
    message.push({
      id: result[i].id,
      title: result[i].title,
      date: result[i].date.substr(0,10),
      source: result[i].source||'信息来源未知',
      img: result[i].firstImage || "/images/img.png",
    })
  }
  // console.log(message)
  this.setData({
    message: message
  })
},

//设置导航栏颜色和标题
setBar() {
  wx.setNavigationBarColor({
    frontColor: '#000000',
    backgroundColor: '#c1d2f0',
  })
},

//标题点击函数
title(e) {
  let id = e.currentTarget.id
  this.setData({
    newsType: this.data.infoMap[id].type
  })
  this.getNew()
},


//页面跳转函数
  showDetail(e) {
    let id = e.currentTarget.id
    wx.navigateTo({
      url: `/pages/news/news?id=${id}`
    })
    // console.log("id 是" + id)
  },

  bigButton() {
    wx.navigateTo({
      url: `/pages/news/news?id=${this.data.message[this.data.randomIndex].id}`
    })
    // wx.showToast({
    //   title: `${this.data.message[5].id}`,
    // })
  },

  //下拉刷新
  onPullDownRefresh() {
    this.getNew(() => wx.stopPullDownRefresh())
  },
})



