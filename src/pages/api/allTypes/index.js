import axios from "axios";

export default async function handler(request, response) {
    if (request.method == "GET") {
        try {
            const results = await axios.get("https://pokeapi.co/api/v2/type/?limit=18")
            const typeList  = results["data"]["results"]
            let allTypes = []

            for (let i = 0; i < typeList.length; i++) {
                allTypes.push(typeList[i]["name"])
            }

            response.status(200)

            return response.send({ allTypes: allTypes })

        } catch (error) {
            response.status(400)
            return response.send("There has been an error! Please reload the page and try again.")
        }
    }
}