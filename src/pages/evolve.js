import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState } from "react"

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

function Evolve(props) {
    const { data, error, isLoading, isValidating } = useSWR(`/api/evolve/${props.evolution}`, fetcher)

    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <h2>Invalid Pokemon name!</h2>
        </>
    )

    let { evolution } = data

    return (
        <>
            <h2>Name: {props.evolution}</h2>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Next Evolution: {evolution}</h2>
                </>
            )}
        </>
    )
}

export default function App() {
    const [ evolution, setEvolution ] = useState("pikachu")
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
                        setEvolution(textInput.toLowerCase())
                        setTextInput("")
                    }
                }}
            />

            <button type="button" 
                onClick={() => {
                    setEvolution(textInput.toLowerCase())
                    setTextInput("")
                }}>
                Search
            </button>

            { Evolve({ evolution: evolution }) }
        </>
    )
}