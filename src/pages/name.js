import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState } from "react"
import SearchBox from "./components/searchBox.js"

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function App() {
    const [ pokemon, setPokemon ] = useState("pikachu")
    const allPokemon = useSWR("/api/allPokemon/", fetcher)
    const thisPokemon = useSWR("/api/pokemon/" + pokemon, fetcher)

    return (
        <>
            <h1><Link href="/">Better PokeAPI</Link></h1>

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
            
            {thisPokemon["isValidating"] ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Name: {thisPokemon["data"]["pokemonName"]}</h2>
                    <img src={thisPokemon["data"]["sprite"]} width={150}/>
                    <h2>Types: {thisPokemon["data"]["types"].map(type => <span>{type} </span>)}</h2>
                </>
            )}
        </>
    )
}