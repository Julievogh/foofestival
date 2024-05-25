// I recipes har Jonas lavet en fil med alle fetch
// tænker vi kan prøve at gøre det samme i denne fil

//POST
export async function postData() {
    let headersList = {
        Accept: "application/json",
        apikey: apikey,
        prefer: "return=representation",
        "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify();

    let response = await fetch (endpoint, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
    });

    let data = await response.text()
    console.log(data)
}