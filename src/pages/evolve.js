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
    const [ evolution, setEvolution ] = useState("raichu")
    const allPokemon = useSWR("/api/allPokemon/", fetcher)
    const thisPokemon = useSWR("/api/evolve/" + pokemon, fetcher)
    const currPokemon = useSWR("/api/pokemon/" + pokemon, fetcher)
    const nextPokemon = useSWR("/api/pokemon/" + evolution, fetcher)

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

            <h2>Name: {pokemon}</h2> 

            {currPokemon["isValidating"] ? (
                <h2>Validating</h2>
            ) : (
                <img src={currPokemon["data"]["sprite"]} width={150}/>
            )}

            {thisPokemon["isValidating"] ? (
                <h2>Validating</h2>
            ) : (
                <>
                    {/* <a href={"/pokemon/" + thisPokemon["data"]["evolution"]}> */}
                        <h2>Next Evolution: {
                            thisPokemon["data"]["evolution"] === pokemon ? (
                                "Already in most evolved form!"
                            ) : (
                                thisPokemon["data"]["evolution"] 
                            )}</h2>
                    {/* </a> */}
                </>
            )}

            {nextPokemon["isValidating"] ? (
                    <h2>Validating</h2>
                ) : (
                    <>
                        <button type="button" 
                            onClick={() => {
                                setEvolution(thisPokemon["data"]["evolution"])
                            }}>
                                Update
                        </button> 
                        {nextPokemon["data"]["pokemonName"] !== pokemon ? (
                            <>
                                <img src={nextPokemon["data"]["sprite"]} width={150}/>
                            </>
                        ) : (null)}
                    </>
                )}
        </>
    )
}