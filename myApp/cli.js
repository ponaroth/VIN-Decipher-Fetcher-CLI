const yargs = require('yargs');
const app = require('./app.js');

yargs
    .usage('$0: Usage <cmd> [options]')
    .command(
        {
            command: 'search <keyword>',
            desc: 'search for a car manufacturer',
            handler: argv => {
                // console.log('you entered: ', argv.text);
                app.search(argv.keyword);
            }
        }   
    )

    // add a help menu to assist the user in understanding our CLI
    .help('help').argv;


