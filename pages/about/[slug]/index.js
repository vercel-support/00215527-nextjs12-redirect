
import { useRouter } from 'next/router'
export default function About() {
  const router = useRouter()
  const { slug } = router.query
  return (
    <div>
      <h1>About</h1>
      <h1>{slug}</h1>
    </div>
  )
}
