import { useContext, useEffect, useState } from "react";
import ListCard from "../components/ListItem.jsx";
import "../styles/listPage.css";
import { GlobalContext } from "../GlobalContext.jsx";
import { Alert, Button } from "react-bootstrap";
import StyleCard from "../components/StyleCard.jsx";
import { format } from "date-fns"; // Import the format function from date-fns library
import { formatDateTime } from "../pages/AuctionPage";
import Loading from "../components/Loading";


export default function ListPage() {
  const [list, setList] = useState([]);
  const { show, setShow, hideAlert, loggedIn } = useContext(GlobalContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeList, setActiveList] = useState([]);
  const [activeButton, setActiveButton] = useState('All');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(`/api/user/${loggedIn}`);
        const result = await response.json();
        setUser(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [loggedIn]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/auctions/");
        let result = await response.json();

        // Sort the auctions based on the end date
        result.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

        setList(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  if (list.length > 0 && list[0].hasOwnProperty("bidHistory")) {
    list.sort((a, b) => b.bidHistory.length - a.bidHistory.length);
  }

  const allItems = list.slice(1);

  const ongoing = list.filter((item) => {
    return item.startDate < Date.now() && Date.now() < item.endDate;
  });

  const upcoming = list.filter((item) => {
    return Date.now() < item.startDate;
  });

  const finished = list.filter((item) => {
    return Date.now() > item.endDate;
  });

  useEffect(() => {
    setActiveList(allItems);
  }, [list]);

  return (
    <>
      <Loading loading={loading} />
      {user ? (
        <Alert show={show} variant="success" className="alert">
          <Alert.Heading>
            Welcome to the exclusive online auction site <em>Peta</em>,{" "}
            {user.username} !
          </Alert.Heading>
          <p>Happy bidding!</p>
          <hr />
          <Button onClick={hideAlert} variant="outline-success">
            Close me
          </Button>
        </Alert>
      ) : null}

      <div className="container pb-4 border-bottom border-dark">
        <div className="d-flex justify-content-center">
          <div className="col-md-4 p-2" key="0">
            <div>
            <h2 className="d-flex justify-content-center fs-1 ms-2 pb-3 text text-danger">
                Beast of the week
              </h2>
              <div className="d-flex justify-content-center">
              {list.length > 0 && list[0].hasOwnProperty("bidHistory") && (
                <ListCard item={list[0]} />
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <div className="btn-group-lg">
          <button
            type="button"
            className={`btn btn btn-outline-dark m-2 ps-5 pe-5 ${activeButton === 'All' ? 'active' : ''}`} 
            data-bs-toggle="button"
            onClick={() => {
              setActiveList(allItems);
              setActiveButton('All');
            }}
          >
            All
          </button>
          <button
            type="button"
            className={`btn btn btn-outline-dark m-2 ps-4 pe-4 ${activeButton === 'Ongoing' ? 'active'  : ''}`}
            data-bs-toggle="button"
            onClick={() => {
              setActiveList(ongoing);
              setActiveButton('Ongoing');
            }}
          >
            Ongoing
          </button>
          <button
            type="button"
            className={`btn btn btn-outline-dark m-2 ps-4 pe-4 ${activeButton === 'Upcoming' ? 'active '  : ''}`}
            data-bs-toggle="button"
            onClick={() => {
              setActiveList(upcoming);
              setActiveButton('Upcoming');
            }}
          >
            Upcoming
          </button>
          <button
            type="button"
            className={`btn btn btn-outline-dark m-2 ps-4 pe-4 ${activeButton === 'Finished' ? 'active' : ''}`}
            data-bs-toggle="button"
            onClick={() => {
              setActiveList(finished);
              setActiveButton('Finished');
            }}
          >
            Finished
          </button>
        </div>
      </div>
      <div className="container" style={{ marginBottom : "15vh"}}>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {activeList.map((item, index) => (
            <StyleCard key={index}>
              <ListCard
                item={item}
                formattedDate={formatDateTime(item.endDate)}
              />
            </StyleCard>
          ))}
        </div>
      </div>
    </>
  );
}
