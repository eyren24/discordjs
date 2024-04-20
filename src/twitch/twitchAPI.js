module.exports = async (channel) => {
    const clientId = 'p4sh2qt085jo2wfp29niiu0jzciy06';
    const clientSecret = 'hzucno0b62h7jgkm5u8ewjbost5v3o';
    const accessToken = await getAccessToken(clientId, clientSecret);
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${channel}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-ID': clientId,
        },
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.error('Errore durante la richiesta:', response.statusText);
    }

}

async function getAccessToken(clientId, clientSecret) {
    const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {
        method: 'POST',
    });

    if (response.ok) {
        const data = await response.json();
        return data.access_token;
    } else {
        console.error('Errore durante la richiesta di access token:', response.statusText);
        throw new Error('Impossibile ottenere l\'access token');
    }
}