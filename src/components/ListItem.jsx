import { Card, ListGroup } from "react-bootstrap";

const ListCard = ({ item }) => {
  return (
    <>
        <Card style={{ width: "22rem", height: "36rem" }}>
          <Card.Img variant="top" src={item.images[0]} style={{ height: "14rem" }} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text style={{ height: "8rem" }}>{item.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group list-group-flush">
            <ListGroup.Item>Current bid: {item.currentPrice}</ListGroup.Item>
            <ListGroup.Item>Bid ends: {item.endDate}</ListGroup.Item>
          </ListGroup>
          <Card.Body className="text-center">
            <a href="#" class="btn btn-primary w-75">View</a>
          </Card.Body>
        </Card>
    </>
  );
};

export default ListCard;