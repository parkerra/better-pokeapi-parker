import axios from "axios";

export default async function handler(request, response) {
    if (request.method == "GET") {
        try {
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