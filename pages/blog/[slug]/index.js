
import { useRouter } from 'next/router'
export default function Blog() {
  const router = useRouter()
  const { slug } = router.query
  return (
    <div>
      <h1>Blog</h1>
      <h1>{slug}</h1>
    </div>
  )
}
