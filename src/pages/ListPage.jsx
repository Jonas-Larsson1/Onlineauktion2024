import { useEffect, useState } from "react"

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

  return (
    <>
      <div className="container">
        <div className="row">
          {list.map((item, index) => (
            <div className="col-md-4" key={index}>
              <ListCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}