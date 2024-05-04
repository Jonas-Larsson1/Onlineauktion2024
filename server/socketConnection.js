export default function socketConnection(io) {
    
       
        let users = []

        const addNewUser = (userId, socketId) => {
            !users.some(user => user.userId === userId) && users.push({userId, socketId})
        } 
      
        const removeUser = (socketId) => {
            users = users.filter(user => user.socketId !== socketId)
        }
   
      
        const getUser = (userId) => {
            return users.find((user) => user.userId === userId)
        }

     
      
        io.on("connection", (socket) => {
          console.log("Client connected");
      
            socket.on("newUser", (userId)=> { // listens to when "newUser event on client "
                addNewUser(userId, socket.id)
                console.log(users)
            })
            

         
          // Emit a test event to the client
          io.emit("firstEvent", "Hello, this is a test");
       
          socket.on("newBidNotification", ({recieverId, username, bidAmount, title, senderId})=> {
            const reciever = getUser(recieverId)
            const sender = getUser(senderId)
           
            if(!reciever){ // Handles event where there is not reciever online
                io.to(sender.socketId).emit("userNotOnline", "User is not online")
        }else if(recieverId === senderId){
            return false
        }
        else{
           
            io.to(reciever.socketId).emit("newBidAdded", {
                username, 
                bidAmount,
                title
            })
        }
          });

      
          socket.on("disconnect", () => {
           console.log("disconnect")
            removeUser(socket.id)
           
          });
        });
      }
