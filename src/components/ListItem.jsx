import { Card, ListGroup } from "react-bootstrap";
import { formatDateTime } from "../pages/AuctionPage";


const ListCard = ({ item }) => {
  
  item.bidHistory.sort((a, b) => new Date(b.time) - new Date(a.time))
  
  return (
    <>
        <Card style={{ width: "22rem", height: "36rem" }}>
          <Card.Img variant="top" src={item.images[0]} style={{ height: "13rem" }} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text style={{ height: "8rem" }}>{item.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group list-group-flush">
            <ListGroup.Item><h3>Current bid:</h3> {item.bidHistory[0].amount}€</ListGroup.Item>
            <ListGroup.Item><h3>Bid ends:</h3> {formatDateTime(item.endDate)}</ListGroup.Item>
          </ListGroup>
          <Card.Body className="text-center">
            <a href={`/AuctionPage/${item.id}`} className="btn btn-primary w-75">View</a>
          </Card.Body>
        </Card>
    </>
  );
};

export default ListCard;