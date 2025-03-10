import Head from 'next/head'
import Link from 'next/link'

export default function Home() {

  return (
    <>
      <Head>
        <title>Better PokeAPI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div class="front-page">
          <Link href="/" class="title-button"><h1>Better PokeAPI</h1></Link>
          <Link href="/random" class="front-buttons">Get Random Pokemon</Link>
          <Link href="/name" class="front-buttons">Get Pokemon by Name</Link>
          <Link href="/types" class="front-buttons">Get Pokemon by Type</Link>
          <Link href="/evolve" class="front-buttons">Get Pokemon's Next Evolution stage</Link>
          <Link href="/exp" class="front-buttons">Get Pokemon's Experience</Link>
          <Link href="/battle" class="front-buttons">Battle Two Pokemon</Link>
          <Link href="/catch" class="front-buttons">Try to Catch a Pokemon</Link>
      </div>
    </>
  )
}
