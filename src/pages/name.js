import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState } from "react"

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

function Name(props) {
    let { data, error, isLoading, isValidating } = useSWR("/api/pokemon/" + props.pokemon, fetcher)

    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <h2>Invalid Pokemon name!</h2>
        </>
    )

    let { pokemonName, sprite, types } = data

    return (
        <>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Name: {pokemonName}</h2>
                    <img src={sprite} />
                    <h2>Types: {types.map(type => <span>{type} </span>)}</h2>
                </>
            )}
        </>
    )
}

export default function App() {
    const [ pokemon, setPokemon ] = useState("pikachu")
    const [ textInput, setTextInput ] = useState("")

    return (
        <>
            <h1><Link href="/">Better PokeAPI</Link></h1>

            <input type="text" value={textInput}
                onChange={(event) => {
                    setTextInput(event.target.value)
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        setPokemon(textInput.toLowerCase())
                        setTextInput("")
                    }
                }}
            />

            <button type="button" 
                onClick={() => {
                    setPokemon(textInput.toLowerCase())
                    setTextInput("")
                }}>
                Search
            </button>

            { Name({ pokemon: pokemon }) }
        </>
    )
}