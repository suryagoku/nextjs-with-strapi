import { Button } from '@/components/ui/button'

const getStrapiData = async (path: string) => {
  const baseUrl = 'http://localhost:1337/api'
  try {
    const response = await fetch(baseUrl + path, { cache: 'no-store' })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export default async function Home() {
  const strapiData = await getStrapiData('/home-page')
  console.log(strapiData)
  const { title, description } = strapiData.data.attributes
  return (
    <main className="container mx-auto py-6">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p>
    </main>
  )
}
