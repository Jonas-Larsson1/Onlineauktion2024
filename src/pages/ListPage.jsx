import { useEffect, useState } from "react";
import ListCard from "../components/ListItem.jsx"
import "../styles/listPage.css"

export default function ListPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("api/auctions/");
        const result = await response.json();
        setList(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
      
    getData();
  }, []);

  if (list.length > 0 && list[0].hasOwnProperty("bidHistory")) {
    list.sort((a, b) => b.bidHistory.length - a.bidHistory.length);
  }
  
  return (<>
    <div className="container pb-4 border-bottom border-dark">
      <div className="d-flex justify-content-center">
          <div className="col-md-4 p-2" key="0">
          <div>
            <h2 className="fs-1 ms-2 pb-3 text text-danger">Beast of the week!</h2>
            {list.length > 0 && list[0].hasOwnProperty("bidHistory") && <ListCard item={list[0]} />}
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {list.slice(1).map((item, index) => (
          <div className="col-md-4" key={index + 1}>
            <ListCard item={item} />
          </div>
        ))}
      </div>
    </div>
  </>);
}