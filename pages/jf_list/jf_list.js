import util from '../../utils/util.js'
import http from '../../utils/api'
const app = getApp()
Page({
  data: {
    list:[],
    triggered:false,
    is_data:true,
    tabHeiaght:400,
    page:1,
  },

  onLoad: function (options) {
    this.setData({
      tabHeiaght:wx.getSystemInfoSync().windowHeight-20,
    })
    this.getlist()
  },

  getlist(){  //获取数据
    http.integral_detail({
      data:{
        uid:wx.getStorageSync('uid'),
        page:this.data.page,
        limit:10,
      },
      success:res=>{
        if(res.code==200){
          var list=this.data.list;        
          if(this.data.is_data){     
            this.setData({
              list:list.concat(res.data.integral_list),
            })
          }
          if(this.data.page>res.data.pages || res.data.pages<=1&&res.data.integral_list.length<=10){
            this.setData({
              is_data:false
            })
          }
        }else{
          wx.showToast({
            title:res.msg,
            icon:'none'
          })
        }
      }     
    })
  },
  scrollToLower(e){ //上拉加载
    if(this.data.is_data){
      this.setData({
        page:this.data.page+1
      })
      this.getlist()
    }  
  },
  onRefresh() {  //下拉刷新
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      this.setData({
        triggered: false,
        page:1,
        is_data:true,
        list:[],
      })
      this.getlist();
      this._freshing = false
    }, 2000)
  },
 
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
})