const wsServer=require('ws').Server;
const server=new wsServer({port:5001});

server.on('connection',(ws)=>{
    console.log('Connection established..');    
    ws.on('message',(message)=>{    
        let data=JSON.parse(message);       
        if(data.type=='message'){               
            server.clients.forEach((client)=>{                 
                if(client!=ws){                                    
                    client.send(`${data.name}:${data.data}`); 
                }                     
            })   
        }      
    })

    ws.on('close',()=>{
        console.log('Connection closed');
        
    })
})
