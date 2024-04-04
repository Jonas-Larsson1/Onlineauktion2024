import { Card, ListGroup } from "react-bootstrap";
import { formatDateTime } from "../pages/AuctionPage";

const ListCard = ({ item }) => {

  item.bidHistory.sort((a, b) => new Date(b.time) - new Date(a.time))

  const statusBadge = () => {
    const hasSurpassedTime = () => {
      return Date.now() > item.endDate;
    };

    const badgeColor = hasSurpassedTime() ? 
    <span className={`position-absolute translate-middle top-0 start-50 p-2 badge bg-danger fs-6`}> Finished </span> 
    : <span className={`position-absolute translate-middle top-0 start-50 p-2 badge bg-success fs-6`}> Ongoing </span>
  
    return badgeColor;
  }
  
  return (<>
    <Card style={{ width: "22rem", height: "36rem" }}>
      <div>
        <Card.Img variant="top" src={item.images[0]} style={{ height: "13rem" }} />
        {statusBadge()}
      </div>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text style={{ height: "8rem", overflow: "hidden", textOverflow: "ellipsis" }}>
          {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
        </Card.Text>
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
        <a href={`/AuctionPage/${item.id}`} className="btn btn-primary w-100">View</a>
      </Card.Body>
    </Card>
  </>);
};

export default ListCard;