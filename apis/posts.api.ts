import { Post } from '@/types/post.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const postsApi = {
  getPosts() {
    return http.get<SuccessResponse<{ posts: Post[] }>>('/posts')
  },

  getPostById(postId: number) {
    return http.get<SuccessResponse<{ post: Post }>>(`/posts/${postId}`)
  }
}

export default postsApi
