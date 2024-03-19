import { Button, Card, ListGroup } from "react-bootstrap";

const ListCard = ({ item }) => {
  return (
    <>
        <Card style={{ width: "22rem", height: "36rem" }}>
          <Card.Img variant="top" src={item.images[0]} style={{ height: "14rem" }} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <ListGroup>
                <ListGroup.Item><h3>Seller: </h3>{item.createdBy}</ListGroup.Item>
                <ListGroup.Item><h3>Price: </h3>{item.currentPrice}</ListGroup.Item>
            </ListGroup>
            <br />
            <Button variant="primary">View</Button>
          </Card.Body>
        </Card>
    </>
  );
};

export default ListCard;