import http from '@/utils/http'

const mediaApi = {
  getMedia() {
    return http.get('/media')
  }
}

export default mediaApi
