import { Button, Form, InputGroup, Row, Col } from "react-bootstrap";

export default function NewBid() {

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="newBid">
          <Form.Label>Enter bid</Form.Label>
          <InputGroup>
            <Form.Control type="number" placeholder="Current bid" />
            <Form.Text className="text-muted">
              You need to bid at least: or higher
            </Form.Text>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button variant="success" type="submit" className="me-2 btn-lg">
            Place bid
          </Button>

          <Button variant="secondary" type="submit" className="btn-sm">
            Watchlist
          </Button>
        </Col>
      </Row>
    </Form>
  );
}