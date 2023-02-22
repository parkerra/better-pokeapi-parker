import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState, render } from "react"

// let pokemon1Input = ""
// let pokemon2Input = ""

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


function Battle(props) {
    // pokemon1Input = props.pokemon1
    // pokemon2Input = props.pokemon2

    // console.log(pokemon1Input)
    // console.log(pokemon2Input)

    // console.log("before")
    const { data, error, isLoading, isValidating } = useSWR(`/api/battle/`, getFetcher(props.pokemon1, props.pokemon2))
    // const { data, error, isLoading, isValidating } = useSWR(`/api/battle/`, () => {

    // }) //getFetcher(props.pokemon1, props.pokemon2))
    // console.log(isLoading)
    // console.log(isValidating)
    // console.log(error)
    // console.log("after")
    // console.log(data)

    // console.log("before loading")
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <h2>One or more Pokemon names are invalid!</h2>
        </>
    )
    // console.log("after loading")

    // console.log(data)
    let { winner } = data
    // console.log(winner)
    // console.log("THIS LINE IS PRINTING")

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