import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState } from "react"
import SearchBox from "./components/searchBox.js"

const getFetcher = (pokemon) => {
    const fetcher = async (url) => {
        const res = await axios.post(url, {
            pokemon: pokemon
        })
        return res.data
    }
    return fetcher
}

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function App() {
    const [ pokemon, setPokemon ] = useState("pikachu")
    const [ refreshVal, setRefreshVal ] = useState(100000000)
    const [ toggle, setToggle ] = useState(true)
    const allPokemon = useSWR("/api/allPokemon/", fetcher)
    // const results = useSWR(`/api/catch/`, getFetcher(pokemon), { keepPreviousData: false })
    const results = useSWR(`/api/catch/`, getFetcher(pokemon), { refreshInterval: refreshVal, keepPreviousData: false })
    const currPokemon = useSWR("/api/pokemon/" + pokemon, fetcher)

    return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>

            {allPokemon["isValidating"] ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <SearchBox 
                        dataList={allPokemon["data"]["allPokemon"]}
                        placeholder="Search for Pokemon"
                        onSelect={(record) => {
                            setPokemon(record.item.value.toLowerCase())
                        }}
                    />
                </>
            )}

            <h2>Catching: {pokemon}</h2>

            {currPokemon["isValidating"] ? (
                <h2>Validating</h2>
            ) : (
                <img src={currPokemon["data"]["sprite"]} width={150}/>
            )}
            
            {results["isValidating"] ? (
                <h2>Validating</h2>
            ) : (
                <>
                    {results["data"]["caught"] ? (
                        <h2>{pokemon} has been caught!</h2>
                    ) : (
                        <h2>{pokemon} broke free!</h2>
                    )}
                </>
            )}

            <button type="button" 
                onClick={() => {
                    if (toggle) {
                        setRefreshVal(100)
                        setToggle(false)
                    } else {
                        setRefreshVal(10000000)
                        setToggle(true)
                    }
                }}>
                {toggle ? "Update" : "Stop Updating"}
            </button>
        </>
    )
}