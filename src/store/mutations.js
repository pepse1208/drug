function initButtonState (status, obj) {
  obj.buttonState = {
    see_btns: true,
    operate_btns: false,
    other_btns: false,
    reason_btn: false
  }
}
export default {
  /**
   * 在main.js例引入
   * import store from './store/index'
   * 把store挂载到全局
   * Vue.prototype.$store = store;
   */
  initCheckDetailData (state, {data, status}) {
    state.checkDetailData.length = 0
    let len = data.length // 药品数量
    for (let i = 0; i < len; i++) {
      var item = data[i]
      var obj = {}
      obj.drug = item.drug // 药品
      obj.files = [] // 药检单文件
      let fileLen = item.file.length // 药检单文件 数量
      for (var j = 0; j < fileLen; j++) {
        let tmp = item.file[j]
        var subObj = {
          amount: tmp.amount,
          batch: tmp.batch,
          file_name: tmp.file_name,
          product_date: tmp.product_date,
          report_date: tmp.report_date,
          status: tmp.status,
          url: tmp.url,
          uuid: tmp.uuid,
          validity: tmp.validity,
          reason: tmp.reason,
          buttonState: {}
        }
        initButtonState(status, subObj)
        obj.files.push(subObj)
        if (status === '待查收') {
          obj.num = 0
        }
      }
      state.checkDetailData.push(obj)
    }
  },
  /**
   * 这里设置一个统一的方法,大部分用的vuex都是简单的改变一些状态,不需要写过多的mutations
   * 使用方法 例:
   * this.$store.update({"cityName":"北京"})
   *
   *  config需要传入对象
   * @param {*} state
   * @param {*Object} config
   */
  initSideBar (state, data) {
    state.sidebar.length = 0
    let lists = []
    if (data.includes('药检单查询')) {
      lists.push(
        {
          title: '药检单查询',
          // list: [{title: '药检单查询', url: '/pages/drugsearch/main', position: '-5px -2px'}]
          list: [{title: '药检单查询', url: '/pages/drugsearch/main', position: '0 0'}]
        }
      )
    }
    if (data.includes('药检单管理')) {
      let list = []
      if (data.includes('我的药检单')) {
        list.push(
          {title: '我的药检单', url: '/pages/drugmanage/main?is_upload=true', position: '0 -27px'}
          // {title: '我的药检单', url: '/pages/drugmanage/main?is_upload=true', position: '-5px -47px'}
        )
      }
      if (data.includes('药检单云文件柜')) {
        list.push(
          {title: '药检单云文件柜', url: '/pages/drugmanage/main?is_upload=false', position: '0 -54px'}
          // {title: '药检单云文件柜', url: '/pages/drugmanage/main?is_upload=false', position: '-4px -90px'}
        )
      }
      lists.push(
        {
          title: '药检单管理',
          list: list
        }
      )
    }
    if (data.includes('发送药检单')) {
      let list = []
      if (data.includes('申请发送')) {
        list.push(
          {title: '申请发送', url: '/pages/send_step1/main', position: '0 -84px'}
          // {title: '申请发送', url: '/pages/send_step1/main', position: '-5px -135px'}
        )
      }
      if (data.includes('发送申请列表')) {
        list.push(
          {title: '待签章列表', url: '/pages/send_apply_list/main', position: '0 -112px'}
          // {title: '待签章列表', url: '/pages/send_apply_list/main', position: '-5px -179px'}
        )
      }
      if (data.includes('发送记录')) {
        list.push(
          {title: '发送记录', url: '/pages/send_record/main', position: '0 -141px'}
          // {title: '发送记录', url: '/pages/send_record/main', position: '-5px -224px'}
        )
      }
      lists.push(
        {
          title: '发送药检单',
          list: list
        }
      )
    }
    if (data.includes('查收药检单')) {
      lists.push(
        {
          title: '查收药检单',
          list: [{title: '查收药检单', url: '/pages/recv/main', position: '0 -170px'}]
          // list: [{title: '查收药检单', url: '/pages/recv/main', position: '-5px -269px'}]
        }
      )
    }
    if (data.includes('药检单索取记录')) {
      let list = []
      if (data.includes('我索取的药检单')) {
        list.push(
          {title: '我的索取记录', url: '/pages/askfor/main?isMy=true', position: '0 -198px'}
          // {title: '我的索取记录', url: '/pages/askfor/main?isMy=true', position: '-5px -314px'}
        )
      }
      if (data.includes('客户索取我的药检单')) {
        list.push(
          {title: '客户索取记录', url: '/pages/askfor/main?isMy=false', position: '0 -227px'}
          // {title: '客户索取记录', url: '/pages/askfor/main?isMy=false', position: '-5px -359px'}
        )
      }
      lists.push(
        {
          title: '药检单索取记录',
          list: list
        }
      )
    }
    if (data.includes('企业通讯录')) {
      lists.push(
        {
          title: '企业通讯录',
          list: [{title: '企业通讯录', url: '/pages/connect/main', position: '0 -256px'}]
          // list: [{title: '企业通讯录', url: '/pages/connect/main', position: '-5px -404px'}]
        }
      )
    }
    state.sidebar = lists
  },
  update (state, config) {
    Object.keys(config).map((item, key) => {
      state[item] = config[item]
    })
  },
  initSendStepTwoListData (state, data) {
    let len = data.length
    for (let i = 0; i < len; i++) {
      let uuid = data[i].uuid
      let subObj = JSON.parse(JSON.stringify(data[i]))
      let obj = {
        drug: subObj,
        count: 0,
        chooseNum: 0,
        files: {}
      }
      if (state.sendStepTwoListData[uuid] !== undefined) {
        state.searchObj[uuid] = JSON.parse(JSON.stringify(state.sendStepTwoListData[uuid]))
      } else {
        state.sendStepTwoListData[uuid] = JSON.parse(JSON.stringify(obj))
        state.searchObj[uuid] = JSON.parse(JSON.stringify(obj))
      }
    }
  },
  initSendStepTwoDrugData (state, {data}) {
    let uuid = state.sendStepTwoDrugId
    let fileObj = state.sendStepTwoListData[uuid].files
    state.sendStepTwoDrugData = {}
    if (Object.keys(fileObj).length > 0) {
      state.sendStepTwoDrugData = JSON.parse(JSON.stringify(fileObj))
      return
    }
    let len = data.length
    for (let i = 0; i < len; i++) {
      let obj = JSON.parse(JSON.stringify(data[i]))
      obj.is_select = data[i].is_select || false
      state.sendStepTwoDrugData[data[i].uuid] = JSON.parse(JSON.stringify(obj))
    }
  },
  selectDrug (state, {uuid, isSelect}) {
    let obj = state.sendStepTwoDrugData
    let selectObj = state.selectObj
    let subObj = obj[uuid]
    let drugId = state.sendStepTwoDrugId
    if (!selectObj[drugId]) {
      selectObj[drugId] = {}
    }
    if (isSelect) {
      subObj.is_select = false
      delete selectObj[drugId][uuid]
    } else {
      subObj.is_select = true
      selectObj[drugId][uuid] = obj[uuid]
      selectObj[drugId][uuid].amount = ''
    }
  },
  submit (state) {
    console.log(1)
    let drugId = state.sendStepTwoDrugId
    console.log(2)
    console.log(drugId)
    console.log(state.sendStepTwoListData)
    state.sendStepTwoListData[drugId].count = Object.keys(state.selectObj[drugId]).length
    console.log(3)
    console.log(state.sendStepTwoListData)
    state.sendStepTwoListData[drugId].files = JSON.parse(JSON.stringify(state.sendStepTwoDrugData))
    console.log(4)
    console.log(state.sendStepTwoListData)
    console.log(state.searchObj)
    state.searchObj[drugId].count = Object.keys(state.selectObj[drugId]).length
    console.log(5)
    console.log(state.searchObj)
  },
  initSelectedDrug (state) {
    let selectObj = state.selectObj
    let selectedList = state.selectedList
    for (let i in selectObj) {
      Object.assign(selectedList, selectObj[i])
    }
  }
}
