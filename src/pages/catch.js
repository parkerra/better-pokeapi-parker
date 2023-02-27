import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState } from "react"

const getFetcher = (pokemon) => {
    const fetcher = async (url) => {
        const res = await axios.post(url, {
            pokemon: pokemon
        })
        return res.data
    }
    return fetcher
}

export default function App() {
    const [ pokemon, setPokemon ] = useState("pikachu")
    const [ inputPokemon, setInputPokemon ] = useState("")
    // const [ isCaught, setIsCaught ] = useState(false)
    const { data, error, isLoading, isValidating } = useSWR(`/api/catch/`, getFetcher(pokemon), { refreshInterval: 1000, keepPreviousData: false })

    return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>

            <input type="text" value={inputPokemon}
                onChange={(event) => {
                    setInputPokemon(event.target.value)
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        setPokemon(inputPokemon.toLowerCase())
                        setInputPokemon("")
                    }
                }}
            />

            <button type="button" 
                onClick={() => {
                    setPokemon(inputPokemon.toLowerCase())
                    setInputPokemon("")
                }}>
                Search
            </button>

            <h2>Catching: {pokemon}</h2>

            {/* {isValidating ? ( */}
                {/* <h2>Validating</h2> */}
            {/* ) : ( */}
            
            {!data && typeof data !== undefined ? (null) : (
                <>
                    {data["caught"] ? (
                        <h2>{pokemon} has been caught!</h2>
                    ) : (
                        <h2>{pokemon} broke free!</h2>
                    )}
                </>
            )}
        </>
    )
}