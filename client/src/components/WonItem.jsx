import { Card, ListGroup } from "react-bootstrap";
import { formatDateTime } from "../pages/AuctionPage";
import { Link } from "react-router-dom";


export default function WonItem ({ item }) {
  
  return <>
    <Card style={{ width: "22rem", height: "28rem" }}>
      <div>
        <Card.Img variant="top" className="img-fluid rounded" src={item.images[0]} style={{ height: "13rem", objectFit: "cover" }} />
      </div>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>

      </Card.Body>
      <ListGroup className="list-group list-group-flush">
        <ListGroup.Item>
          <h3>Your winning bid was:</h3> {item.bidHistory.amount}€
        </ListGroup.Item>
        <ListGroup.Item>
          <h3>Auction ended on</h3> {formatDateTime(item.endDate)}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className="text-center">
        <a href={`/AuctionPage/${item._id}`} className="btn btn-primary w-100 position-absolute start-0 bottom-0">View</a>
      </Card.Body>
    </Card>
  </>
};
