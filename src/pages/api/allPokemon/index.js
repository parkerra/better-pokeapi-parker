import axios from "axios";

export default async function handler(request, response) {
    if (request.method == "GET") {
        try {
            const results = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=1008")
            const pokemonList = results["data"]["results"]
            let allPokemon = []

            for (let i = 0; i < pokemonList.length; i++) {
                allPokemon.push(pokemonList[i]["name"])
            }

            response.status(200)

            return response.send({ allPokemon: allPokemon })

        } catch (error) {
            response.status(400)
            return response.send("There has been an error! Please reload the page and try again.")
        }
    }
}