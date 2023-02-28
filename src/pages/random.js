import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function Random() {
    const { data, error, isLoading, isValidating } = useSWR("/api/", fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/" class="title-button"><h1>Better PokeAPI</h1></Link>
            <h2>There has been an error! Reload and try again</h2>
        </>
    )
    let { name, sprite, types } = data


    return (
        <>
            <div class="front-page">
                <Link href="/" class="title-button"><h1>Better PokeAPI</h1></Link>
                {isValidating ? (
                    <h2>Validating</h2>
                ) : (
                    <>
                        <h2>Name: {name}</h2>
                        <img src={sprite} width={150} />
                        <h2>Types: {types.map(type => <span>{type} </span>)}</h2>
                    </>
                )}
            </div>
        </>
    )
}