import { useContext, useEffect, useState } from "react"
import StyleCard from "./StyleCard"
import { GlobalContext } from "../GlobalContext"

export default function Notification(props){

    const { loggedIn } = useContext(GlobalContext)
 

       const { notifications } = props

        console.log(notifications)
        
        

  
      

       

      
        return<>
                
            {notifications ? notifications.map((notification, index) => {
              
                return(
                   

                        <StyleCard key={index}> 
                        <h4 className="fst-italic fw-bold" >
                        <div>{notification.message}</div>
                        <small>{notification.date}</small>
                        <span></span>
                        
                        </h4>
                        </StyleCard>
                    )
                 
            }): ""}


        </>
   


}