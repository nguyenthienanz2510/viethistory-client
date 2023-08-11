'use client'

import mediaApi from '@/apis/media.api'
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'

type Props = {}

function Media({}: Props) {
  const { data: mediaData } = useQuery({
    queryKey: ['media'],
    queryFn: () => {
      return mediaApi.getMedia()
    },
    staleTime: 5 * 60 * 1000
  })

  console.log(mediaData)

  return (
    <div>
      <h1 className='mb-10'>Media</h1>
      <div>
        <table className='table-data'>
          <tr>
            <th>Index</th>
            <th>Preview</th>
            <th>Link</th>
            <th>Action</th>
          </tr>
          {mediaData &&
            mediaData.data.data.media.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className='relative h-10 w-28'>
                      <Image src={item.url} alt={item.title || ''} layout='fill' objectFit='contain' />
                    </div>
                  </td>
                  <td>
                    <a href={item.url} title={item.title || ''} target='_blank'>
                      {item.url}
                    </a>
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} size='lg' />
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

export default Media
