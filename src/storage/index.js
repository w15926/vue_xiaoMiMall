// Storage封装
const STORAGE_KEY = 'mall'

export default {
  // 存储值
  setItem(key, value, module_name) {
    if (module_name) {
      let val = this.getItem(module_name)
      val[key] = value
      this.setItem(module_name, val)
    } else {
      let val = this.getStorage()
      val[key] = value
      // val覆盖STORAGE_KEY
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    }
  },
  // 获取值
  getItem(key, module_name) {
    if (module_name) { // {user:{name:'w',age:10}} user为模块名
      let val = this.getItem(module_name)
      if (val) return val[key] // key就是模块名里对应的值
    }
    return this.getStorage()[key]
  },
  // 获取所有数据
  getStorage() {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
  },
  // 清空值
  clear(key, module_name) {
    let val = this.getStorage()

    if (module_name) {
      if (!val[module_name]) return
      delete val[module_name][key]
    } else {
      delete val[key]
    }

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }
}