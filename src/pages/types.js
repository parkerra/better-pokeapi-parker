import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState } from "react"

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

// export default function Types() {
function Types(props) {
    const type = "normal"

    const { data, error, isLoading, isValidating } = useSWR(`/api/types/${props.type}`, fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <h2>Invalid Pokemon type!</h2>
        </>
    )
    let { pokemon } = data


    return (
        <>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Type: {props.type}</h2>
                    <ul>{pokemon.map(poke => <li>{poke}</li>)}</ul>
                </>
            )}
        </>
    )
}

export default function App() {
    const [ type, setType ] = useState("normal")
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
                        setType(textInput.toLowerCase())
                        setTextInput("")
                    }
                }}
            />

            <button type="button" 
                onClick={() => {
                    setType(textInput.toLowerCase())
                    setTextInput("")
                }}>
                Search
            </button>

            { Types({ type: type }) }
        </>
    )
}