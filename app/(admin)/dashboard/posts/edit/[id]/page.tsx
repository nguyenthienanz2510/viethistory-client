'use client'

import postsApi from '@/apis/posts.api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type Props = { params: { id: any } }

const EditPost = ({ params }: Props) => {
  const { data: postDetail } = useQuery({
    queryKey: [`post-${params.id}`],
    queryFn: () => {
      return postsApi.getPostById(params.id as number)
    },
    staleTime: 5 * 60 * 1000
  })
  return (
    <>
      <h2>{postDetail?.data.data.post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: postDetail?.data.data.post.content as string }} />;
    </>
  )
}

export default EditPost
