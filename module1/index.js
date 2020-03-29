const superagent = require('superagent');

// config file to hold the base URL (or API key where applicable)
const config = require('./config.json');

// function to GET search result and return a list of objects
const searchThis = async keyword => {
    const url = `${config.searchURL}${keyword}?format=json`;

    try {
        const response = await superagent.get(url);

        return response.body.Results;
    }
    catch (error) {
        return error;
    }
};

// fetch and return a list of everything
const fetchThis = async () => {
    const url = config.fetchURL;

    try {
        const response = await superagent.get(url);

        return response.body.Results;
    }
    catch (error) {
        return error;
    }
}

// helper function: take a list of objects and turn it to a list of manufacterer's names
const turnToStrList = async objList => {
    const newList = [];

    let trim = (objList.lenght < 8) ? (objList.lenght) : 8;

    for (let i = 0; i < trim; i++) {
        if (objList[i] === undefined) {

        } else {
            newList.push(objList[i].Mfr_Name);
        }
    }

    return newList;
};

// my fetch function: match and return VIN decipher URL
const getVIN_URL = (text, objList) => {
    for (let i in objList) {

        const splits = text.keyword.split(" ");
        const short = splits[0];

        if (objList[i].ManufacturerName.includes(short)) {

            return objList[i].URL;
        }
    }

    return 'no match found'
}


//////////////////////////////////////////////////////////////////////////////////////////

// export these functions so they can be used
module.exports = {
    searchThis,
    fetchThis,
    turnToStrList,
    getVIN_URL
}
