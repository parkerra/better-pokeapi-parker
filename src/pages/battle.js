import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState } from "react"
import SearchBox from "./components/searchBox.js"

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

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function App() {
    const [ pokemon1, setPokemon1 ] = useState("pikachu")
    const [ inputPokemon1, setInputPokemon1 ] = useState("Search for First Pokemon")
    const [ pokemon2, setPokemon2 ] = useState("lucario")

    const [ refreshVal, setRefreshVal ] = useState(100000000)
    const [ toggle, setToggle ] = useState(true)

    const allPokemon = useSWR("/api/allPokemon/", fetcher)
    const results = useSWR(`/api/battle/`, getFetcher(pokemon1, pokemon2), { refreshInterval: refreshVal, keepPreviousData: true })
    const currPokemon1 = useSWR("/api/pokemon/" + pokemon1, fetcher)
    const currPokemon2 = useSWR("/api/pokemon/" + pokemon2, fetcher)
    
    return (
        <>
            <h1><Link href="/">Better PokeAPI</Link></h1>

            {allPokemon["isValidating"] ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <SearchBox 
                        dataList={allPokemon["data"]["allPokemon"]}
                        placeholder={inputPokemon1}
                        onSelect={(record) => {
                            setInputPokemon1(record.item.value.toLowerCase())
                        }}
                        dontClear={true}
                    />

                    <SearchBox 
                        dataList={allPokemon["data"]["allPokemon"]}
                        placeholder={"Search for Second Pokemon"}
                        onSelect={(record) => {
                            setPokemon2(record.item.value.toLowerCase())
                            setPokemon1(inputPokemon1.toLowerCase())
                            setInputPokemon1("Search for First Pokemon")
                        }}
                        dontClear={false}
                    />
                </>
            )}

            <h2>Battle: {pokemon1} vs. {pokemon2}</h2>

            {currPokemon1["isValidating"] ? (
                <h2>Validating</h2>
            ) : (
                <img src={currPokemon1["data"]["sprite"]} width={150}/>
            )}

            {currPokemon2["isValidating"] ? (
                <h2>Validating</h2>
            ) : (
                <img src={currPokemon2["data"]["sprite"]} width={150}/>
            )}

            {results["isValidating"] ? (
                    <h2>Winner: Loading...</h2>
                ) : (
                    <>
                        <h2>Winner: {results["data"]["winner"]}</h2>
                    </>
                )
            }

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