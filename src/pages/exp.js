import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState } from "react"

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

function Exp(props) {
    const { data, error, isLoading, isValidating } = useSWR(`/api/experience/${props.name}?level=${props.level}`, fetcher)

    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <h2>Invalid Pokemon name or invalid level!</h2>
        </>
    )
    let { experience } = data

    return (
        <>
            <h2>Name: {props.name}</h2>
            <h2>Level: {props.level}</h2>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Experience: {experience}</h2>
                </>
            )}
        </>
    )
}

export default function App() {
    const [ pokemon, setPokemon ] = useState("pikachu")
    const [ inputPokemon, setInputPokemon ] = useState("")
    const [ level, setLevel ] = useState(5)
    const [ inputLevel, setInputLevel ] = useState("")

    return (
        <>
            <h1><Link href="/">Better PokeAPI</Link></h1>

            <input type="text" value={inputPokemon}
                onChange={(event) => {
                    setInputPokemon(event.target.value)
                }}
            />

            <input type="text" value={inputLevel}
                onChange={(event) => {
                    setInputLevel(event.target.value)
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        setPokemon(inputPokemon.toLowerCase())
                        setInputPokemon("")
                        setLevel(inputLevel)
                        setInputLevel("")
                    }
                }}
            />

            <button type="button" 
                onClick={() => {
                    setPokemon(inputPokemon.toLowerCase())
                    setInputPokemon("")
                    setLevel(inputLevel)
                    setInputLevel("")
                }}>
                Search
            </button>

            { Exp({ name: pokemon, level: level }) }
        </>
    )
}