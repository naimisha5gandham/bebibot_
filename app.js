require('dotenv').config();

const tmi = require('tmi.js');


const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },

    identity: {
        username: `${process.env.TWITCH_USERNAME}`,
        password: `oauth:${process.env.TWITCH_OAUTH}`
    },
    channels: [`${process.env.TWITCH_CHANNEL}`]
});


client.connect().catch(console.error);


client.on('message', (channel, tags, message, self) => {
    
    if (self) return;

    switch (message.toLowerCase()){
    
    case 'commands':
            client.say(channel, `@${tags.username}, available commands are:
            Commands Help Greetings Hi !Website !Name
           
            For more help just type "Help"
            `);
            break;
            
            
       
            
        case 'greetings':
            client.say(channel, `Hello @${tags.username}, what's up?!`);
            break;
            
            case 'hi':
                client.say(channel, `${tags.username}, hola!`);
                break;
                
               
            case '!name':
                client.say(channel, `Hello @${tags.username}, my name is Bebibot! Type "help" to continue...`);
                break;
                
                
            case 'help':
                client.say(channel, `${tags.username}, Use the following commands to get quick help:
                -> Commands: Get Commands || 
                Help: Get Help || 
                Greetings: Get Greetings || 
                Hi: Get "Hola" || 
                !Website: Get my website || 
                !Name: Get my name || 
                !Upvote first_name second_name: Upvote user first_name second_name ||  Upvote first_name second_name: Upvote user first_name second_name || 
                !Cheer first_name second_name: Cheer first_name second_name || Cheers first_name second_name: Cheer first_name second_name --
    
                For more help just ping me up!
                `);
                break;
                default:
                    
                    let mymessage = message.toString();
                    
                   
                    if ((mymessage.split(' ')[0]).toLowerCase() === '!upvote' || 'upvote') {
                    
                        
                        client.say(channel, `TwitchLit @${(mymessage.split(' ')[1] + '_' + mymessage.split(' ')[2])} TwitchLit  you have been UPVOTED by ${ tags.username }`);
        
        
                    } else if ((mymessage.split(' ')[0]).toLowerCase() === '!cheer' || 'cheers') {
                        console.log(`HSCheers @${(mymessage.split(' ')[1] + '_' + mymessage.split(' ')[2])} HSCheers you have been UPVOTED by ${ tags.username }`);
                    }
                    break;
                }


            });
           