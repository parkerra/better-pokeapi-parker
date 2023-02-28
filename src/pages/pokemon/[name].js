import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import React, { useState } from "react"
import { useParams } from "react-router-dom";
import { useRouter } from 'next/router'

/*
export default async function handler(request, response) {
    if (request.method == "GET") {
        try {
            console.log(request.query)
            const results = await axios.get("https://pokeapi.co/api/v2/pokemon/" + request.query.name)

            let allTypes = []
            for (let i = 0; i < results["data"]["types"].length; i++) {
                allTypes.push(results["data"]["types"][i]["type"]["name"])
            }

            const pokemon = {
                pokemonName: results["data"]["name"],
                sprite: results["data"]["sprites"]["front_default"],
                types: allTypes
            }

            response.status(200)

            return response.send(pokemon)

        } catch (error) {
            response.status(400)
            return response.send("There has been an error! Please reload the page and try again.")
        }
    }
}
*/

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function App(props) {
    // const [ pokemon, setPokemon ] = useState("pikachu")
    const {id } = useParams()
    console.log(id)
    console.log(props)
    console.log(["name"])
    const router = useRouter()
    console.log(router)
    const {pid} = router.query
    console.log(router.query)
    const thisPokemon = useSWR("/api/pokemon/" + "pikachu", fetcher)

    return (
        <>
            <h1><Link href="/">Better PokeAPI</Link></h1>

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