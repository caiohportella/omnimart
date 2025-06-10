'use client'

import { useState, useEffect } from 'react'
import Image, { type ImageProps } from 'next/image'
import { FALLBACK_IMAGE_URL } from '@/lib/constants'

export function FallbackImage(props: ImageProps) {
  const { src, ...rest } = props
  const [imageSrc, setImageSrc] = useState(src)

// Garante que a imagem é atualizada quando o src muda
  useEffect(() => {
    setImageSrc(src)
  }, [src])

  return (
    <Image
      {...rest}
      src={imageSrc}
      onError={() => {
        setImageSrc(FALLBACK_IMAGE_URL)
      }}
    />
  )
}