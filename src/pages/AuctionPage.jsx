import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { GlobalContext } from "../GlobalContext"; 
import ImageGallery from "../components/ImageGallery";
import Bidding from "../components/Bidding";

export default function AuctionPage() {
  let { id } = useParams();
  // const [auction, setAuction] = useState(null);
  const { auction, setAuction } = useContext(GlobalContext)

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/auctions/${id}`);
      const result = await response.json();
      setAuction(result);
    };

    getData();
  }, [id]);

  return (
    <>
      {auction ? (
        <div>
          <h1>{auction.title}</h1>
          <Row>
            <Col sm={6}>
              <ImageGallery auction={auction} />
            </Col>
            <Col sm={6}>
              <div>
                <p>{auction.description}</p>
                <p>Auction start: {formatDateTime(auction.startDate)}</p>
                <p>Auction end: {formatDateTime(auction.endDate)}</p>
                <Bidding/>
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
    timeZone: "UTC"
  };

  const formattedDate = new Date(dateTimeString).toLocaleDateString(
    "sv-SE",
    options
  );

  return formattedDate;
}
