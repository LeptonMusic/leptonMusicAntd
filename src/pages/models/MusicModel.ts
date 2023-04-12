import { useState, useCallback } from 'react'

export default () => {
  const [count, setCount] = useState(0)

  const [musicName, setName] = useState('')
  const [url, setUrl] = useState('')

  // 设置头像
  // 设置地址
  const setMusicModel = useCallback((name: string, src: string) => 
    {
      setName((b) => name),
      setUrl((c) => src)
    }
  , [])

  return {
    musicName,
    url,
    setMusicModel,
  }
}