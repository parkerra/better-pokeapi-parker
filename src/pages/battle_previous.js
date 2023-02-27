import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState, useEffect, render } from "react"
// import * as ReactDOM from "react-dom"

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

console.log("TYPE OF FETCHER")
console.log(typeof getFetcher("pikachu", "lucario"))

// const root = ReactDOM.createRoot(document.getElementById("root"))

export default function App() {
    const [ pokemon1, setPokemon1 ] = useState("pikachu")
    const [ inputPokemon1, setInputPokemon1 ] = useState("")
    const [ pokemon2, setPokemon2 ] = useState("lucario")
    const [ inputPokemon2, setInputPokemon2 ] = useState("")
    const [ winner, setWinner ] = useState("")
    const { data, error, isLoading, isValidating } = useSWR(`/api/battle/`, getFetcher(pokemon1, pokemon2))
    // const [, updateState] = React.useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);
    // const { data, error, isLoading, isValidating } = useSWR(`/api/battle/`, getFetcher(props.pokemon1, props.pokemon2))
    console.log("app rendered")
    
    return (
    // root.render(
        <>
            {console.log("return rendered")}
            <h1><Link href="/">Better PokeAPI</Link></h1>

            <input type="text" value={inputPokemon1}
                onChange={(event) => {
                    setInputPokemon1(event.target.value)
                    {setWinner(data["winner"])}
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
            {console.log(data)}

            {/* if (isLoading) return <div>Loading</div> */}
            {/* {!data ? <h2>One or more Pokemon names are invalid!</h2> : null } */}

            <h2>Battle: {pokemon1} vs. {pokemon2}</h2>
            {/* {window.location.reload()} */}
            {/* {location.reload()} */}

            {isLoading ? <h2>it is loading</h2> : <h2>it is NOT loading</h2>}
            {isValidating ? <h2>it is validating</h2> : <h2>it is NOT validating</h2>}
            {typeof data === undefined ? <h2>data is undefined</h2> : <h2>data IS defined</h2>}
            {(typeof data !== undefined || !data) ? (
                    <h2>data is NOT defined</h2>
                ) : (
                    <>
                        {winner !== data["winner"] ? setWinner(data["winner"]) : null}
                        <h2>Winner: {winner}</h2>
                    </>
                )
            }
            {/* {data ? <h2>data is defined</h2> : <h2>data is NOT defined</h2>} */}

            {/* { Battle({ pokemon1: pokemon1, pokemon2: pokemon2 }) } */}
        </>
    )
}