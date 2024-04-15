import { Card, ListGroup } from "react-bootstrap";
import { formatDateTime } from "../pages/AuctionPage";
import { Link } from "react-router-dom";

// Define a functional component ListCard that accepts an item as a prop.
const ListCard = ({ item }) => {
  
  // Sort the bid history of the item in descending order by time.
  if (item.bidHistory.lenght > 0) {
    item.bidHistory.sort((a, b) => new Date(b.time) - new Date(a.time));
  } else {
    item.bidHistory = [{
      amount: item.startingPrice,
    }
    ]
  }

  // Define a function to determine and return a status badge based on the auction's end date.
  const statusBadge = () => {

    // Helper function to check if the current date is past the item's end date.
    const hasSurpassedTime = () => {
      return Date.now() > item.endDate;
    };

    // Conditionally render a badge indicating whether the auction is finished or ongoing.
    const badgeColor = hasSurpassedTime() ? 
    <span className={`position-absolute translate-middle top-0 start-50 p-2 badge bg-danger fs-6`}> Finished </span> 
    : <span className={`position-absolute translate-middle top-0 start-50 p-2 badge bg-success fs-6`}> Ongoing </span>;
  
    return badgeColor;
  }
  
  return (<>
    <Card style={{ width: "22rem", height: "38rem" }}>
      <div>
        <Card.Img variant="top" className="img-fluid rounded" src={item.images[0]} style={{ height: "13rem", objectFit: "cover" }} />
        {statusBadge()}
      </div>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text style={{ height: "8rem", overflow: "hidden", textOverflow: "ellipsis" }}>
          {item.description.length > 125 ? `${item.description.substring(0, 125)}...` : item.description}
        </Card.Text>
        <Card.Text><Link style={{color: "blue", textDecoration: "underline"}} to={`/SearchPage/${item.category}`}>{item.category}</Link></Card.Text>
      </Card.Body>
      <ListGroup className="list-group list-group-flush">
        <ListGroup.Item>
          <h3>Current bid:</h3> {item.bidHistory[0].amount}€
        </ListGroup.Item>
        <ListGroup.Item>
          <h3>Bid ends:</h3> {formatDateTime(item.endDate)}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className="text-center">
        <a href={`/AuctionPage/${item._id}`} className="btn btn-primary w-100 position-absolute start-0 bottom-0">View</a>
      </Card.Body>
    </Card>
  </>);
};

export default ListCard;