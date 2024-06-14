import HeroSection from '@/components/custom/HeroSection'
import qs from 'qs'

const homePageQuery = qs.stringify({
  populate: {
    content: {
      populate: {
        image: {
          fields: ['url', 'alternativeText'],
        },
        link: {
          populate: true,
        },
      },
    },
  },
})

const getStrapiData = async (path: string) => {
  const baseUrl = 'http://localhost:1337/api/'
  const url = new URL(path, baseUrl)
  url.search = homePageQuery

  try {
    const response = await fetch(url.href, { cache: 'no-store' })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export default async function Home() {
  const strapiData = await getStrapiData('home-page')
  const { content } = strapiData?.data?.attributes
  return (
    <main className="container mx-auto py-6">
      {/* <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p> */}
      <h1>Home page</h1>
      <HeroSection data={content[0]} />
    </main>
  )
}
