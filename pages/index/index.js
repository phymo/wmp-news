const typeMap = {
  "国内": 'gn',
  "国际": 'gj',
  "财经": 'cj',
  "娱乐": 'yl',
  "军事": 'js',
  "体育": 'ty',
  "其他": 'other'
}

const typeMap2 = {
  'gn':"国内",
  'gj':"国际",
  'cj':"财经",
  'yl':"娱乐",
  'js':"军事",
  'ty':"体育",
  'other':"其他"
}

Page({
  data: {
    navList: [
      {
        typeCN: '国内',
        type: 'gn',
        style: '1px solid white',
        id: 0
      },
      {
        typeCN: '国际',
        type: 'gj',
        style: '',
        id: 1
      }, {
        typeCN: '财经',
        type: 'cj',
        style: '',
        id: 2
      },
      {
        typeCN: '娱乐',
        type: 'yl',
        style: '',
        id: 3
      }, {
        typeCN: '军事',
        type: 'js',
        style: '',
        id: 4
      }, {
        typeCN: '体育',
        type: 'ty',
        style: '',
        id: 5
      }, {
        typeCN: '其他',
        type: 'other',
        style: '',
        id: 6
      }
    ],
    topNewsImage: '',
    topNewsTitle: '',
    topNewsSource: '',
    topNewsTime: '',
    topNewsId: '',
    newsList:[],
    type: 'gn',
  },


  getNewsList(cb) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.type
      },
      success: res => {

        let result = res.data.result;
        //设置头部
        let firstResult = result[0];
        let newsDate = firstResult.date.substring(0, 10);
        let hour = firstResult.date.substring(11, 13);
        let minute = firstResult.date.substring(14, 16);
        this.setData({
          topNewsImage: firstResult.firstImage||'../../images/0.jpg',
          topNewsTitle: firstResult.title,
          topNewsSource: firstResult.source || '未知来源',
          topNewsTime: `${newsDate} ${hour}:${minute}`,
          topNewsId: firstResult.id
        })
        //设置新闻列表
        let newsList = [];
        for(let i = 1; i < result.length; i++) {
          let news = result[i];
          let newsDate = news.date.substring(0, 10);
          let hour = news.date.substring(11, 13);
          let minute = news.date.substring(14, 16);
          newsList.push({
            newsImage: news.firstImage || '../../images/0.jpg',
            newsTitle: news.title,
            newsSource: news.source ||'未知来源',
            newsTime: `${newsDate} ${hour}:${minute}`,
            newsId:  news.id
          });
        }
        this.setData({
          newsList: newsList
        })
      },
      fail: error=>{
        console,log(error);
        wx.showToast({
          title: '加载失败',
        })
      },
      complete: () => {
        cb && cb();
      }
    })
  },

  onNewsPage(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/news/news?id=${id}`,
    })
  },

  onLoad() {
    this.getNewsList();
  },

  onPullDownRefresh: function() {
    this.getNewsList(() => {
      wx.stopPullDownRefresh();
    })
  },

  onChooseType(e) {
    let newsType = e.currentTarget.dataset.type;
    this.setData({
      type: typeMap[newsType],

    })
    this.getNewsList();
  }

})