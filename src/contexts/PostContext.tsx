import React, {
  createContext, useContext,
  useState, useCallback, useMemo
} from 'react'
import type { Post } from '../types/post'
import { getPosts } from '../api/posts'

interface PostContextType {
  nameFilter:     string
  posts:          Post[]
  loading:        boolean
  error:          string | null
  selectedPost:   Post | null
  setNameFilter:  (name: string)      => void
  setSelectedPost:(post: Post | null) => void
  fetchPosts:     ()                  => Promise<void>
}

const PostCtx = createContext<PostContextType | undefined>(undefined)

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nameFilter,   setNameFilter]   = useState('')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [posts,        setPosts]        = useState<Post[]>([])
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState<string | null>(null)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setPosts(await getPosts())
    } catch {
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }, [])

  const filteredPosts = useMemo(() => {
    const q = nameFilter.toLowerCase()
    if (!q) return posts 
    return posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.body.toLowerCase().includes(q)
    )
  }, [nameFilter, posts])

  const value = useMemo<PostContextType>(() => ({
    nameFilter,
    posts: filteredPosts,
    loading,
    error,
    selectedPost,
    setNameFilter,
    setSelectedPost, 
    fetchPosts,
  }), [nameFilter, filteredPosts, loading, error, selectedPost, fetchPosts])

  return <PostCtx.Provider value={value}>{children}</PostCtx.Provider>
}

export const usePostContext = (): PostContextType => {
  const ctx = useContext(PostCtx)
  if (!ctx) throw new Error('usePostContext must be used inside <PostProvider>')
  return ctx
}