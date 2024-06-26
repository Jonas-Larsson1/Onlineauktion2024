import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { GlobalContext } from "../GlobalContext";
import ImageGallery from "../components/ImageGallery";
import Bidding from "../components/Bidding";
import AddToWatchList from "../components/AddToWatchList";
import PageNotFound from "./PageNotFound";
import EditButton from "../components/EditButton";
import Loading from "../components/Loading";

export default function AuctionPage() {
  const { loggedIn } = useContext(GlobalContext);
  let { id } = useParams();
  const [auction, setAuction] = useState(null);
  const {isCreator, setIsCreator} = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const today = new Date();
  const unixTimestamp = today.getTime();


  const updateAuction = (updatedAuction) => {
    setAuction({ ...updatedAuction });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/auction/${id}`);
        const result = await response.json();

        // Check if the logged-in user is the creator of the auction
        setIsCreator(result.sellerId === loggedIn);

        if (
          result.bidHistory.length === 0 ||
          Object.keys(result.bidHistory[0]).length === 0
        ) {
          result.bidHistory = [
            {
              time: result.startDate,
              username: "Auction start",
              amount: Number(result.startingPrice),
            },
          ];
        } 
        
        setAuction(result);
        setLoading(false);
      } catch (error) {
        setFetchError(true);
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <Loading loading={loading} />
      {auction ? (
        <div className="m-3">
          <h1 className="mx-2">{auction.title}</h1>
          <Row>
            <Col sm={6}>
              <Card data-bs-theme="dark" style={{ padding: "20px" }}>
                <Card.Body
                  className="d-flex align-items-center justify-content-end"
                  style={{ paddingBottom: "0" }}
                >
                  {isCreator && auction.endDate > unixTimestamp && (
                    <>
                      <div className="d-flex align-items-center">
                        <h3 style={{ margin: "-25px 10px 0 10px" }}>
                          Edit auction
                        </h3>
                      </div>
                      <EditButton itemId={auction._id} />
                    </>
                  )}
                </Card.Body>
                <div style={{ marginBottom: "10px" }}>
                  {auction.images.length === 1 ? (
                    <img
                      src={auction.images[0]}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <ImageGallery auction={auction} />
                  )}
                </div>
                <Card.Title>{auction.title}</Card.Title>
                <Card.Text>{auction.description}</Card.Text>
                <Card
                  className="my-3"
                  border="light"
                  style={{ padding: "1rem" }}
                >
                  Auction duration:{" "}
                  <b>
                    {formatDateTime(auction.startDate)}
                    &nbsp; - &nbsp;
                    {formatDateTime(auction.endDate)}
                  </b>
                  <br />
                </Card>
                <AddToWatchList auction={auction} />
              </Card>
            </Col>
            <Col sm={6}>
              <div>
                <Bidding auction={auction} updateAuction={updateAuction} />
              </div>
            </Col>
          </Row>
        </div>
      ) : fetchError ? (
        <PageNotFound />
      ) : null}
    </>
  );
}

export function formatDateTime(unixTimestamp) {
  const date = new Date(unixTimestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  };

  return date.toLocaleString("en-GB", options);
}
