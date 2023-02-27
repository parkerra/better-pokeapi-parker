import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState, render } from "react"

function getFetcher(pokemon1, pokemon2) {
    const fetcher = async (url) => {
        const res = await axios.post(url, {
            pokemon1: pokemon1,
            pokemon2: pokemon2
        })
        return res.data
    }
    return fetcher
}

/*
const fetcher = async (url, pokemon1, pokemon2) => {
    const res = await axios.post(url, {
        pokemon1: pokemon1,
        pokemon2: pokemon2
    })
    return res.data
}
*/


function Battle(props) {
    const { data, error, isLoading, isValidating } = useSWR(`/api/battle/`, getFetcher(props.pokemon1, props.pokemon2))
    
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <h2>One or more Pokemon names are invalid!</h2>
        </>
    )

    let { winner } = data

    return (
        <>
            <h2>Battle: {props.pokemon1} vs. {props.pokemon2}</h2>
            {isLoading ? <h2>LMAO</h2> : <h2>is not loading</h2>}
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Winner: {winner}</h2>
                </>
            )}
        </>
    )
}

export default function App() {
    const [ pokemon1, setPokemon1 ] = useState("pikachu")
    const [ inputPokemon1, setInputPokemon1 ] = useState("")
    const [ pokemon2, setPokemon2 ] = useState("lucario")
    const [ inputPokemon2, setInputPokemon2 ] = useState("")
    // const { data, error, isLoading, isValidating } = useSWR(`/api/battle/`, getFetcher(props.pokemon1, props.pokemon2))
    
    return (
        <>
            {console.log("proof console log works")}
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
                    }
                }}
            />

            <button type="button" 
                onClick={() => {
                    setPokemon1(inputPokemon1.toLowerCase())
                    setInputPokemon1("")
                    setPokemon2(inputPokemon2.toLowerCase())
                    setInputPokemon2("")
                }}>
                Search
            </button>

            {console.log("about to run battle")}

            { Battle({ pokemon1: pokemon1, pokemon2: pokemon2 }) }
        </>
    )
}