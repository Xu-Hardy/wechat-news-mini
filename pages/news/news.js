Page({

  data: {
    title: '',
    source: '',
    date: '',
    readCount: '',
    detail: []
  },

  //接受index页面传递的参数
  onLoad(options) {
    console.log(options.id)
    let id = options.id
    console.log(id)
    this.getMsg(id)
  },

  //http请求，从api解析JSON
  getMsg(id) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: id,
      },
      success: res => {
        let result = res.data.result;
        console.log(result) 
        this.setMsg(result)
      }
    })
  },

//设置标题信息
  setMsg(result) {
    let title = result.title
    let source = `${result.source}` || "信息来源未知"
    let date = result.date.substr(0,10)
    let readCount = `浏览量：${result.readCount}`
    let content = result.content

    // console.log(content)
    let detail = []
    
    for (let i = 0; i < content.length; i++) {
      detail.push(
        {
          tag: content[i].type,
          src: content[i].src || "/images/img.png",
          text: content[i].text,
          id: content[i].id,
        }
      )
    }

// console.log(detail)

    this.setData({
      title: title,
      source: source,
      date: date,
      readCount:readCount,
      detail: detail,
    })
  }
})