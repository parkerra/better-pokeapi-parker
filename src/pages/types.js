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
    const [ type, setType ] = useState("normal")
    const allTypes = useSWR("/api/allTypes/", fetcher)
    const thisType = useSWR(`/api/types/${type}`, fetcher)

    return (
        <>
            <div class="front-page">
                <h1><Link href="/" class="title-button">Better PokeAPI</Link></h1>

                {allTypes["isValidating"] ? (
                    <h2>Validating</h2>
                ) : (
                    <>
                        <SearchBox 
                            dataList={allTypes["data"]["allTypes"]}
                            placeholder="Search for Type"
                            onSelect={(record) => {
                                setType(record.item.value.toLowerCase())
                            }}
                        />
                    </>
                )}
                
                {thisType["isValidating"] ? (
                    <h2>Validating</h2>
                ) : (
                    <>
                        <h2>Type: {type}</h2>
                        <ul>{thisType["data"]["pokemon"].map(poke => <li>{poke}</li>)}</ul>
                    </>
                )}
            </div>
        </>
    )
}