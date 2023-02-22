import axios from "axios";

export default async function handler(request, response) {
    if (request.method == "GET") {
        try {
            const results = await axios.get("https://pokeapi.co/api/v2/type/" + request.query.type)
            console.log(results["data"]["pokemon"][0]["pokemon"]["name"])

            let allPokemon = []
            for (let i = 0; i < results["data"]["pokemon"].length; i++) {
                allPokemon.push(results["data"]["pokemon"][i]["pokemon"]["name"])
            }

            const pokemon = {
                pokemon: allPokemon
            }

            response.status(200)
            return response.send(pokemon)

        } catch (error) {
            response.status(400)
            return response.send("There has been an error! Please reload the page and try again.")
        }
    }
}