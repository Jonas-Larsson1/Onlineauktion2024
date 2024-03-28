import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { GlobalContext } from "../GlobalContext";
import ImageGallery from "../components/ImageGallery";
import Bidding from "../components/Bidding";

export default function AuctionPage() {
  let { id } = useParams();
  // const [auction, setAuction] = useState(null);
  const { auction, setAuction } = useContext(GlobalContext);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/auctions/${id}`);
      const result = await response.json();
      setAuction(result);
    };

    getData();
  }, []);

  return (
    <>
      {auction ? (
        <div className="m-3">
          <h1>{auction.title}</h1>
          <Row>
            <Col sm={6}>
              <Card data-bs-theme="dark">
                <Card.Body>
                  <ImageGallery auction={auction} />
                  <Card.Title>{auction.title}</Card.Title>
                  <Card.Text>{auction.description}</Card.Text>
                  <Card border="light" style={{ padding: "1rem" }}>
                    Auction duration:{" "}
                    <b>
                      {formatDateTime(auction.startDate)}
                      &nbsp; - &nbsp;
                      {formatDateTime(auction.endDate)}
                    </b>
                    <br />
                  </Card>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6}>
              <div>
                <Bidding />
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <p>404: Auction not found</p>
      )}
    </>
  );
}

export function formatDateTime(dateTimeString) {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "UTC",
  };

  const formattedDate = new Date(dateTimeString).toLocaleDateString(
    "sv-SE",
    options
  );

  return formattedDate;
}
