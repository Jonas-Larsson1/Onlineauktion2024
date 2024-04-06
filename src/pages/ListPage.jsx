import { useContext, useEffect, useState } from "react";
import ListCard from "../components/ListItem.jsx"
import "../styles/listPage.css"
import { GlobalContext } from "../GlobalContext.jsx";
import { Alert, Button } from "react-bootstrap";
import StyleCard from "../components/StyleCard.jsx";

// Define the ListPage functional component.
export default function ListPage() {

  const [list, setList] = useState([]);
  const {show, setShow} = useContext(GlobalContext)
  const {hideAlert} = useContext(GlobalContext)
  const [user, setUser] = useState(null)
  const {loggedIn} = useContext(GlobalContext)
  const [activeList, setActiveList] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(`http://localhost:3000/users/${loggedIn}`);
      const result = await response.json();
      setUser(result);
    };

    getUserData();
  }, []); // Empty array = this effect runs only once after the initial render.

  // useEffect hook to fetch data from the server when the component mounts.
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("api/auctions/");
        const result = await response.json();

        // Update the 'list' state variable with the fetched data.
        setList(result);
        setActiveList(list)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    getData();
  }, []); 

  // Sort the list by the length of the bidHistory array of each item if bidHistory exists.
  if (list.length > 0 && list[0].hasOwnProperty("bidHistory")) {
    list.sort((a, b) => b.bidHistory.length - a.bidHistory.length);
  }

    // const newestFirst = list.toSorted((a, b) => {
    //   a.endDate - b.endDate;
    //   return
    // });

    const ongoing = list.filter((item) => {
      return Date.now() < item.endDate;
    });

    const finished = list.filter((item) => {
      return Date.now() > item.endDate;
    });

    
  return (
    <>
      {user ? (
        <Alert show={show} variant="success" className="alert">
          <Alert.Heading>
            Welcome to the exclusive online auction site <em>Peta</em>,{" "}
            {user.username} !
          </Alert.Heading>
          <p>Happy bidding!</p>
          <hr />
          <Button onClick={() => hideAlert()} variant="outline-success">
            Close me
          </Button>
        </Alert>
      ) : (
        ""
      )}

      <div className="container pb-4 border-bottom border-dark">
        <div className="d-flex justify-content-center">
          <div className="col-md-4 p-2" key="0">
            <div>
              <h2 className="fs-1 ms-2 pb-3 text text-danger">
                Beast of the week!
              </h2>
              {list.length > 0 && list[0].hasOwnProperty("bidHistory") && (
                <ListCard item={list[0]} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <div className="btn-group-lg">
          <button type="button" className="btn btn-dark m-2" onClick={() => {
            setActiveList(list)
          }}>
              All
          </button>
          <button type="button" className="btn btn-dark m-2" onClick={() => {
            setActiveList(ongoing)
          }}>
            Ongoing
          </button>
          <button type="button" className="btn btn-dark m-2" onClick={() => {
            setActiveList(finished)
          }}>
            Finished
          </button>
        </div>
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {activeList.map((item, index) => (
            <StyleCard>
              <ListCard item={item} />
            </StyleCard>
          ))}
        </div>
      </div>
    </>
  );
}