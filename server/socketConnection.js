export default function socketConnection(io) {
    
        // let bids = []; 
        let users = []

        const addNewUser = (userId, socketId) => {
            !users.some(user => user.userId === userId) && users.push({userId, socketId})
        } 
      
        const removeUser = (socketId) => {
            users = users.filter(user => user.socketId !== socketId)
        }
        // const addNewBid = (bidData, socketId) => {
        
        
        //     bids.push({ bidData, socketId });
           
            
        // };
      
        const getUser = (userId) => {
            return users.find((user) => user.userId === userId)
        }

        // const removeBid = (socketId) =>{
        //   bids = bids.filter(bid => bid.socketId !== socketId);
        // }
      
        io.on("connection", (socket) => {
          console.log("Client connected");
      
            socket.on("newUser", (userId)=> {
                addNewUser(userId, socket.id)
                console.log(users)
            })

         
          // Emit a test event to the client
          io.emit("firstEvent", "Hello, this is a test");
       
          socket.on("newBidNotification", ({recieverId, username, bidAmount, title})=> {
            const reciever = getUser(recieverId)
            io.to(reciever.socketId).emit("newBidAdded", {
                username, 
                bidAmount,
                title
            })
          });

      
          socket.on("disconnect", () => {
           console.log("disconnect")
            removeUser(socket.id)
           
          });
        });
      }
