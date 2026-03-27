const CLIENT_ID = "a4f6f6fa90fd45a7b868ff7a24c70b12"
const CLIENT_SECRET = "5568ef062d334548a85960e4037fb3b0"

export const getToken = async () => {
    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
        },
        body: "grant_type=client_credentials"
    })
    const data = await res.json()
    return data.access_token
}

export const searchTracks = async (query) => {
    const token = await getToken()

    const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`,
        { 
            headers: {
                Authorization: `Bearer ${token}`
            }
    }
    )

    const data = await res.json()
    return data.tracks.items
}
