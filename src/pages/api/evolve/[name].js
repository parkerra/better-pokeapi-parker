import axios from "axios";

export default async function handler(request, response) {
    if (request.method == "GET") {
        try {
            const results = await axios.get("https://pokeapi.co/api/v2/pokemon-species/" + request.query.name)
            // console.log(results["data"]["evolution_chain"]["url"])
            const evolutionTree = await axios.get(results["data"]["evolution_chain"]["url"])
            /*
            console.log(evolutionTree["data"])
            console.log("FIRST")
            console.log(evolutionTree["data"]["chain"]["species"]["name"])
            console.log("SECOND")
            console.log(evolutionTree["data"]["chain"]["evolves_to"][0]["species"]["name"])
            console.log("THIRD")
            console.log(evolutionTree["data"]["chain"]["evolves_to"][0]["evolves_to"][0]["species"]["name"])
            */
            // console.log(evolutionTree["data"]["chain"]["evolves_to"][0]["species"]["name"])

            //NEXT TIME check if current pokemon and check if evolved from

            //figure this out, currently infinite loop

            let evolution = ""
            let evolutionChain = evolutionTree["data"]["chain"]

            while (true) {
                console.log(evolution)
                if (evolutionChain["species"]["name"] == request.query.name) {
                    // evolution = request.query.name
                    break
                } else {
                    try {
                        evolutionChain = evolutionChain["evolves_to"][0]
                        evolution = request.query.name
                    } catch {
                        return evolution
                    }
                }
            }

            console.log("after " + evolution)

            const pokemon = {
                pokemon: allPokemon
            }

            return response.send(pokemon)

        } catch (error) {
            return response.send("There has been an error! Please reload the page and try again.")
        }
    }
}