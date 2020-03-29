// the custom mod1 module
// install by using: npm install ../mod1 (this is the relative file path)
const mod1 = require('module1');
const inquirer = require('inquirer');

// search function
async function search(text) {

    // obj list from search API
    const objList = await mod1.searchThis(text);

    // list of manufacturers 
    const strList = await mod1.turnToStrList(objList);
   
    // string selected from the manu
    const selected = await option(strList);

    // obj list from fetch
    const objList2 = await mod1.fetchThis();

    // get url from obj that matches the selected option
    const vinURL = mod1.getVIN_URL(selected, objList2);

    // print out the result
    console.log(`\nFollow this link to see the pdf file:\n\n${vinURL}\n\n`);

}

// optionPrompt function shows a list and returns the selected item 
const option = async strList => {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'keyword',
            message: 'select item that you want to fetch',
            choices: strList,
            filter: function (val) {
                return val;
            }
        }
    ])
    // .then(answers => {
    //     console.log(`fetch + helperfunction = ${answers.keyword}`);
    // });

};



/////////////////////////////////////////////////////////////////////////////


// export the play function so that it can be used in the cli.js
module.exports = {
   
    search
};
