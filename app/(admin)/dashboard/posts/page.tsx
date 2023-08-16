'use client'

import postsApi from '@/apis/posts.api'
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

type Props = {}

function Posts({}: Props) {
  const { data: postsData } = useQuery({
    queryKey: ['posts'],
    queryFn: () => {
      return postsApi.getPosts()
    },
    staleTime: 5 * 60 * 1000
  })

  return (
    <div>
      <h1 className='mb-10'>Media</h1>
      <div>
        <table className='table-data'>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>TimeStamp</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
          {postsData &&
            postsData.data.data.posts.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.timestamp}</td>
                  <td>{item.updated_at}</td>
                  <td>
                    <Link href={`/dashboard/posts/edit/${item.id}`}>
                      <FontAwesomeIcon icon={faEdit} size='lg' />
                    </Link>
                    <FontAwesomeIcon icon={faEye} size='lg' />
                    <FontAwesomeIcon icon={faTrash} size='lg' />
                  </td>
                </tr>
              )
            })}
        </table>
      </div>
    </div>
  )
}

export default Posts
