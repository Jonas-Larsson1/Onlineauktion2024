import { useContext, useEffect, useState } from "react";
import ListCard from "../components/ListItem.jsx"
import "../styles/listPage.css"
import { GlobalContext } from "../GlobalContext.jsx";
import { Alert, Button } from "react-bootstrap";
import StyleCard from "../components/StyleCard.jsx";

export default function ListPage() {
  const [list, setList] = useState([]);
  const {show, setShow} = useContext(GlobalContext)
  const {hideAlert} = useContext(GlobalContext)
  const [user, setUser] = useState(null)
  const {loggedIn} = useContext(GlobalContext)

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(`http://localhost:3000/users/${loggedIn}`);
      const result = await response.json();
      setUser(result);
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("api/auctions/");
        const result = await response.json();
        setList(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
      
    getData();
  }, []);

  if (list.length > 0 && list[0].hasOwnProperty("bidHistory")) {
    list.sort((a, b) => b.bidHistory.length - a.bidHistory.length);
  }
  
  return (<>
    {user ? 
      <Alert show={show} variant="success" className="alert">
        <Alert.Heading>Welcome to the exclusive online auction site <em>Peta</em>, {user.username} !</Alert.Heading>
        <p>
          Happy bidding!
        </p>
        <hr />
        <Button onClick={() => hideAlert()} variant="outline-success">
            Close me
          </Button>
      </Alert>
      : "" }

    <div className="container pb-4 border-bottom border-dark">
      <div className="d-flex justify-content-center">
          <div className="col-md-4 p-2" key="0">
          <div>
            <h2 className="fs-1 ms-2 pb-3 text text-danger">Beast of the week!</h2>
            {list.length > 0 && list[0].hasOwnProperty("bidHistory") && <ListCard item={list[0]} />}
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {list.slice(1).map((item, index) => (
            <StyleCard>
              <ListCard item={item} />
            </StyleCard>
        ))}
      </div>
    </div>
  </>);
}