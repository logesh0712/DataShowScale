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


export async function getProfilesListFromDb2({ pageParam = "" })
{
    console.log("In getProfilesListFromDb2. pageParam:", JSON.stringify(pageParam));
    var direction = pageParam.direction;
    var id = pageParam.id;

    console.log("direction: "+ direction + " id:"+id);

    if (direction == "prev")
    {
        var d = {
            "Education": "mbbs2",
            "city": "coimbatore2",
            "country": "india2",
            "dob": "12/12/1992",
            "fullName": "ZZZZ",
            "gender": 1,
            "hatty": "milidhane",
            "height": 165,
            "id": "-NnFF70987u0kDGHHNku",
            "isVerified": 1,
            "occupation": "doctor",
            "seemai": "porangadu"
          };
        
        var dArr = [];
        dArr.push(d);
        return dArr;
    }

    const url = "https://profile-c6mrbve4kq-uc.a.run.app?from="+pageParam;
 
    console.log("In getProfilesListFromDb2. url:", url);

    const response = 
        await axios.get(url); 

    const profiles = [];

    console.log("In getProfilesListFromDb2. Response: "+ response);
    
    var count = 0;
    for(const key in response.data)
    {
        count++;
        const profileObj = response.data[key]; 
        profileObj['id'] = key;
        
        profiles.push(profileObj);

        //var cur = JSON.parse(profileObj);
        console.log("Id: "+JSON.stringify(profileObj));
        //console.log("Id: "+cur['fullName']);
    }

    console.log("In getProfilesListFromDb2. Total response count: "+ count);

    return profiles; 

}
//var globalVariable = 0;

export async function getProfilesListFromDb3({ pageParam = {} })
{
    const data=[
        {
            'id':1,
            'name':'A'
        },
        {
            'id':2,
            'name':'B'
        },
        {
            'id':3,
            'name':'C'
        },
        {
            'id':4,
            'name':'D'
        },
        {
            'id':5,
            'name':'E'
        }
    ];

    if (pageParam==null || pageParam.id == undefined)
    {
        console.log("In getProfilesListFromDb3. Initial call");
        var jsonVal = {
            "results" : [data[0]],
            "previousInput" : data[0].id,
            "nextInput" : data[0].id
        };
        return jsonVal;
    }

    console.log("In getProfilesListFromDb3. Id: ", pageParam.id, pageParam.direction);

    if (pageParam.id == 1 && pageParam.direction == "prev")
    {
        var globalVariable = 0;
        console.log("End call. callNumber", globalVariable);
        return ({
            "results" : [{
                'id':10,
                'name':'10'
            }],
            "previousInput" : 10, // sending same value.
            "nextInput" : 10 
        });
    }

    if (pageParam.id == 10 && pageParam.direction == "prev")
    {
        // Send empty data;
        var globalVariable = 0;
        console.log("End call. callNumber", globalVariable);
        return ({
            "results" : [],
            "previousInput" : 10, // sending same value.
            "nextInput" : 10 
        });
    }

    if (pageParam.id == 5)
    {
        var globalVariable = 0;
        console.log("End call. callNumber", globalVariable);
        return ({
            "results" : [],
            "previousInput" : 5,
            "nextInput" : null
        });
    }

    return ({
            "results" : [data[pageParam.id]],
            "previousInput" : data[pageParam.id].id,
            "nextInput" : data[pageParam.id].id
        });
}