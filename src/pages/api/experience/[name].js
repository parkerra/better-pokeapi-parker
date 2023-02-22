import axios from "axios";

export default async function handler(request, response) {
    if (request.method == "GET") {
        try {
            const results = await axios.get("https://pokeapi.co/api/v2/pokemon-species/" + request.query.name)
            const growthResults = await axios.get(results["data"]["growth_rate"]["url"])
            
            const experience = {experience: growthResults["data"]["levels"][request.query.level - 1]["experience"]}

            response.status(200)

            return response.send(experience)

        } catch (error) {
            response.status(400)
            return response.send("There has been an error! Please reload the page and try again.")
        }
    }
}