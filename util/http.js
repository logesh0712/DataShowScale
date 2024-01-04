import axios from 'axios';

const BACKEND_URL = 'http://127.0.0.1:5001/cloudfunctions-27c66/us-central1'

export async function getProfilesListFromDb()
{
    //console.log("I am at http");

    //const url = BACKEND_URL + '/profiles';
    const url = "https://cloudfunctions-27c66-default-rtdb.firebaseio.com/profile.json";
    
    //console.log("url:" + url);

    const response = await axios.get(url);

    const profiles = [];

    //console.log("I am here2");

    for(const key in response.data)
    {
        const profileObj = response.data[key];
        profileObj['id'] = key;
        
        profiles.push(profileObj);
    }

    return profiles; 

}
