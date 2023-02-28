import axios from "axios";

export default async function handler(request, response) {
    if (request.method == "GET") {
        try {
            const results = await axios.get("https://pokeapi.co/api/v2/pokemon-species/" + request.query.name)
            const evolutionTree = await axios.get(results["data"]["evolution_chain"]["url"])

            let evolution = ""
            let evolutionChain = evolutionTree["data"]["chain"]

            while (true) {
                if (evolutionChain["species"]["name"] == request.query.name) {
                    try {
                        evolution = evolutionChain["evolves_to"][0]["species"]["name"]
                    } catch {
                        evolution = request.query.name
                    }

                    break

                } else {
                    evolutionChain = evolutionChain["evolves_to"][0]
                }
            }

            response.status(200)

            return response.send({ evolution: evolution })

        } catch (error) {
            response.status(400)
            return response.send("There has been an error! Please reload the page and try again.")
        }
    }
}
            /*
            while (true) {
                let toBreak = false
                console.log("AMONGUS")
                console.log(evolutionChain)

                for (let i = 0; i < evolutionChain.length; i++) {
                    if (evolutionChain[i]["species"]["name"] === request.query.name) {
                        if (evolutionChain[i]["species"]["name"]["evolves_to"].length === 0) {
                            evolution = request.query.name
                            toBreak = true
                            break
                        } else {
                            evolution = evolutionChain[0]["evolves_to"]["species"]["name"]
                            break
                        }
                    }
                }

                if (toBreak) {
                    break
                }

                evolutionChain = evolutionChain[0]["evolves_to"]
            }
            */