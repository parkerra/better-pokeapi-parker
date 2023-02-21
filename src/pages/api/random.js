import axios from "axios";

export default async function handler(request, response) {
    if (request.method == "GET") {
        try {
            const results = await axios.get("https://pokeapi.co/api/v2/pokemon/" + Math.floor((Math.random() * (1008 - 1 + 1) + 1)))

            let allTypes = []
            for (let i = 0; i < results["data"]["types"].length; i++) {
                allTypes.push(results["data"]["types"][i]["type"]["name"])
            }

            const pokemon = {
                name: results["data"]["name"],
                sprite: results["data"]["sprites"]["front_default"],
                types: allTypes
            }

            return response.send(pokemon)

        } catch (error) {
            return response.send("There has been an error! Please reload the page and try again.")
        }
    }
}