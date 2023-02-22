import axios from "axios";

export default async function handler(request, response) {
    if (request.method == "POST") {
        try {
            const pokemon1Res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + request.body.pokemon1)
            const pokemon2Res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + request.body.pokemon2)

            const baseStat1 = pokemon1Res["data"]["stats"][1]["base_stat"]
            const baseStat2 = pokemon2Res["data"]["stats"][1]["base_stat"]

            let winnerPokemon = ""
            
            if (baseStat1 >= baseStat2) {
                winnerPokemon = request.body.pokemon1
            } else {
                winnerPokemon = request.body.pokemon2
            }
            
            response.status(200)

            return response.send({ winner: winnerPokemon })

        } catch (error) {
            response.status(400)
            return response.send("There has been an error! Please reload the page and try again.")
        }
    }
}