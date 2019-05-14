const wsServer=require('ws').Server;
const server=new wsServer({port:5001});
let names=[];let c=0;
server.on('connection',(ws)=>{
    console.log('Connection established..');    
    ws.on('message',(message)=>{
         
        console.log(message);
        let data=JSON.parse(message);
        if(data.type=='name'){
            names.push(data.data);
        }
        else if(data.type=='message'){               
            server.clients.forEach((client)=>{                 
                if(client!=ws){                                    
                    client.send(`${data.name}:${data.data}`); 
                }                     
            })   
        }
        console.log(names);
        
    })

    ws.on('close',()=>{
        console.log('Connection closed');
        
    })
})
