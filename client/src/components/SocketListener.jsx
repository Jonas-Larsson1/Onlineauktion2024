import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import io from "socket.io-client";
import toast, { Toaster } from 'react-hot-toast';

export default function SocketListener() {

    const { socket, setSocket } = useContext(GlobalContext)
    const { loggedIn } = useContext(GlobalContext)
   
  

    
    useEffect(() => {
        socket?.emit("newUser", loggedIn)
    }, [socket, loggedIn])
    useEffect(() => {
        let newSocket = io("http://localhost:5500")

        setSocket(newSocket)
         
        newSocket.on("newBidAdded", (bidData) => {
            console.log(bidData)
            displayNotification(bidData)
        });
        

        
       if(!loggedIn) {
            newSocket.disconnect();
        }
    }, [loggedIn])

 

   
        
        
        
        
        const displayNotification = ({ username, bidAmount, title }) => {
            
            if(username == undefined){
                return false
            }else {
                toast(`${username} has outbidded you \n On: ${title} \n New highest bid: ${bidAmount} `);
            }
            
        };
  
        
        
        
        
        return <>
  
  <Toaster 
            position="top-center"
            gutter={12}
            containerStyle={{margin:"8px"}}
            toastOptions={{
              success: {
                duration: 15000
              },
              style: {
                fontSize: "16px",
                maxWidth:"500px",
                padding: "16px 24px",
                backgroundColor:"green"
              }
            }}
            />
  
  </>
}