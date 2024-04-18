import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import io from "socket.io-client";
import toast, { Toaster } from 'react-hot-toast';

export default function SocketListener() {

    


    const displayNotification = ({ username, bidAmount, title }) => {

        if(username == undefined){
          return false
        }else {
          toast(`New bid from ${username} \n On: ${title} \n Amount: ${bidAmount} `);
        }
       
      };

    useEffect(() => {
      const newSocket = io("http://localhost:5500");
  
      newSocket.on("newBidAdded", (bidData) => {
        console.log(bidData)
        displayNotification(bidData)
      });
      
     
  
      return () => {
        newSocket.disconnect();
      };
    }, []);
    
  

  


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