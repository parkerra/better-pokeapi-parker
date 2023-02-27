import axios from "axios";

export default async function handler(request, response) {
    if (request.method == "POST") {
        try {
            const results = await axios.get("https://pokeapi.co/api/v2/pokemon/" + request.body.pokemon)

            const hpMax = results["data"]["stats"][0]["base_stat"]
            const N = Math.floor((Math.random() * 255) + 1)
            const ball = Math.floor((Math.random() * 255) + 1)
            const hpCurrent = Math.floor((Math.random() * hpMax) + 1)
            const f = (hpMax * 255 * 4) / (hpCurrent * ball)
            
            response.status(200)
            console.log(f >= N)

            return response.send({ caught: f >= N })

        } catch (error) {
            response.status(400)
            return response.send("There has been an error! Please reload the page and try again.")
        }
    }
}