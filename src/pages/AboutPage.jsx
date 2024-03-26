import { Col, Row } from "react-bootstrap";

export default function AboutPage() {
  return (
    <>
      <div className="m-3">
        <Row>
          <h1 className="display-6">PETA Auctions was founded in 1674</h1>
          <Col sm={7}>
            <div className="">
              <p className="">
                PETA Auctions was founded in 1674, on the initiative of Baron
                Claes Petasson, who was Governor of Stockholm at that time. As
                such, we are the oldest auction house in the world still
                operating today. We have sold animals in styles now known as
                Baroque, Rococo and Gustavian while they were contemporary. Our
                list of distinguished customers over the centuries features
                names such as King Karl XI, King Gustav III, our Swedish
                national bard Carl Michael Bellman, and authors August
                Strindberg and Selma Lagerlöf.
              </p>
              <p className="">
                Today, PETA Auctions is a leading Nordic marketplace for animal
                sales from a variety of ages and epochs. Stockholms Auktionsverk
                has auction houses in Stockholm, Gothenburg, Malmö and
                Helsingborg, as well is in Finland and Germany.
              </p>
              <p className="">
                PETA Auctions is a “stock exchange trading floor” for Swedish
                and international animals. Our business is built on confidence,
                knowledge, tradition, and personal contacts. Our staff are
                highly educated experts in a range of specialist areas,
                different cultures and historical periods in the animal kingdom.
                Since May 2021, PETA Auctions is owned by Auctionet. Our network
                of Swedish and international customers, dealers, and collectors
                is large and constantly growing.
              </p>{" "}
            </div>
          </Col>
          <Col sm={5}>
            <img
              className="rounded float-right h-75 w-75"
              src="/src/assets/guy.jpg"
              alt=""
            />
            <p>Baron Claes Petasson year 1674 on opening night</p>
          </Col>
        </Row>
      </div>
    </>
  );
}
