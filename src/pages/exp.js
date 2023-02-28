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
    const [ inputPokemon, setInputPokemon ] = useState("Search for Pokemon")
    const [ level, setLevel ] = useState(5)
    const [ inputLevel, setInputLevel ] = useState("")

    const allPokemon = useSWR("/api/allPokemon/", fetcher)
    const thisPokemon = useSWR(`/api/experience/${pokemon}?level=${level}`, fetcher)
    const currPokemon = useSWR("/api/pokemon/" + pokemon, fetcher)

    return (
        <>
            <h1><Link href="/">Better PokeAPI</Link></h1>

            {allPokemon["isValidating"] ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <SearchBox 
                        dataList={allPokemon["data"]["allPokemon"]}
                        placeholder={inputPokemon}
                        onSelect={(record) => {
                            setInputPokemon(record.item.value.toLowerCase())
                        }}
                        dontClear={true}
                    />
                </>
            )}

            <h4>Search Level: </h4>
            
            <input type="text" value={inputLevel}
                onChange={(event) => {
                    setInputLevel(event.target.value)
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        setPokemon(inputPokemon.toLowerCase())
                        setInputPokemon("Search for Pokemon")
                        setLevel(inputLevel)
                        setInputLevel("")
                    }
                }}
            />

            <button type="button" 
                onClick={() => {
                    setPokemon(inputPokemon.toLowerCase())
                    setInputPokemon("Search for Pokemon")
                    setLevel(inputLevel)
                    setInputLevel("")
                }}>
                Search
            </button>

            <h2>Name: {pokemon}</h2>
            <h2>Level: {level}</h2>
            
            {thisPokemon["isValidating"] ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Experience: {thisPokemon["data"]["experience"]}</h2>
                </>
            )}

            {currPokemon["isValidating"] ? (
                <h2>Validating</h2>
            ) : (
                <img src={currPokemon["data"]["sprite"]} width={150}/>
            )}
        </>
    )
}