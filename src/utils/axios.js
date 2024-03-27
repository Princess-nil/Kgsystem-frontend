import axios from 'axios'

// 引入cores
const source = axios.CancelToken.source()
const ajax = axios.create({
  cancelToken:source.token
})

export {ajax,source}