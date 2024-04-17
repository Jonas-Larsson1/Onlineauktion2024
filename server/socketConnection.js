export default function socketConnection(io) {
    
        let bids = []; // Using 'bids' instead of 'users' for clarity
      
        const addNewBid = (bidData, socketId) => {
          // Check if a bid with the same username and amount already exists
          // Make sure 'username' and 'amount' are defined or passed as parameters
          !bids.some((bid) => bid.username === bidData.username && bid.amount === bidData.amount) &&
            bids.push({ bidData, socketId });
        };
      
        const removeBid = (socketId) =>{
          bids = bids.filter(bid => bid.socketId !== socketId);
        }
      
        io.on("connection", (socket) => {
          console.log("Client connected");
      
          // Emit a test event to the client
          socket.emit("firstEvent", "Hello, this is a test");
      
          socket.on("newBidNotification", (bidData) => {
            addNewBid(bidData, socket.id);
          });
      
          socket.on("disconnect", () => {
            removeBid(socket.id);
            console.log("Client disconnected");
          });
        });
      }
