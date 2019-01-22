
Page({
  data: {
    id: '',
    title: '',
    source: '',
    time: '',
    image: '',
    readCount: '',
    newsContent: []
  },

  getNewsContent() {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {

        let newsDate = res.data.result.date.substring(0, 10);
        let hour = res.data.result.date.substring(11, 13);
        let minute = res.data.result.date.substring(14, 16);
        let content = res.data.result.content;
        this.setData({
          title: res.data.result.title,
          source: `${res.data.result.source}`,
          time: `${newsDate} ${hour}:${minute}`,
          readCount: `阅读 ${res.data.result.readCount}`,
          newsContent: content
        })
      
      }
    })
  },

  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.getNewsContent();
  }
})
