import { Media } from '@/types/media.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const mediaApi = {
  getMedia() {
    return http.get<SuccessResponse<{ media: Media[] }>>('/media')
  }
}

export default mediaApi
