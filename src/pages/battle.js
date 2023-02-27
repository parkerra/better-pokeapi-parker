import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState } from "react"

const getFetcher = (pokemon1, pokemon2) => {
    const fetcher = async (url) => {
        const res = await axios.post(url, {
            pokemon1: pokemon1,
            pokemon2: pokemon2
        })
        return res.data
    }
    return fetcher
}

export default function App() {
    const [ pokemon1, setPokemon1 ] = useState("pikachu")
    const [ inputPokemon1, setInputPokemon1 ] = useState("")
    const [ pokemon2, setPokemon2 ] = useState("lucario")
    const [ inputPokemon2, setInputPokemon2 ] = useState("")
    const { data, error, isLoading, isValidating } = useSWR(`/api/battle/`, getFetcher(pokemon1, pokemon2), { refreshInterval: 1000, keepPreviousData: false })
    
    return (
        <>
            <h1><Link href="/">Better PokeAPI</Link></h1>

            <input type="text" value={inputPokemon1}
                onChange={(event) => {
                    setInputPokemon1(event.target.value)
                }}
            />

            <input type="text" value={inputPokemon2}
                onChange={(event) => {
                    setInputPokemon2(event.target.value)
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        setPokemon1(inputPokemon1.toLowerCase())
                        setInputPokemon1("")
                        setPokemon2(inputPokemon2.toLowerCase())
                        setInputPokemon2("")
                        // setSearched(true)
                    }
                }}
            />

            <button type="button" 
                onClick={() => {
                    setPokemon1(inputPokemon1.toLowerCase())
                    setInputPokemon1("")
                    setPokemon2(inputPokemon2.toLowerCase())
                    setInputPokemon2("")
                    // setSearched(true)
                }}>
                Search
            </button>

            <h2>Battle: {pokemon1} vs. {pokemon2}</h2>

            {!data && typeof data !== undefined ? (
                    <h2>Winner: Loading...</h2>
                ) : (
                    <h2>Winner: {data["winner"]}</h2>
                )
            }
        </>
    )
}