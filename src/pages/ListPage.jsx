import { useEffect, useState } from "react";
import ListCard from "../components/ListItem.jsx"
import "../styles/listPage.css"

// Define the ListPage functional component.
export default function ListPage() {

  // Define a state variable 'list' to store the list of items, starting as an empty array.
  const [list, setList] = useState([]);

  // useEffect hook to fetch data from the server when the component mounts.
  useEffect(() => {

    // Function to fetch data from the API.
    const getData = async () => {
      try {
        const response = await fetch("api/auctions/");
        const result = await response.json();

        // Update the 'list' state variable with the fetched data.
        setList(result);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    // Call the getData function to fetch data.
    getData();
  }, []); // Empty dependency array means this effect runs only once after the initial render.

  // Sort the list by the length of the bidHistory array of each item if bidHistory exists.
  if (list.length > 0 && list[0].hasOwnProperty("bidHistory")) {
    list.sort((a, b) => b.bidHistory.length - a.bidHistory.length);
  }
  
  // Render the component UI.
  return (
    <>
      <div className="container pb-4 border-bottom border-dark">
        <div className="d-flex justify-content-center">
          <div className="col-md-4 p-2" key="0">
            <div>
              <h2 className="fs-1 ms-2 pb-3 text text-danger">Beast of the week!</h2>
              {/* Conditionally render the first item in the list as the 'Beast of the week' if the list is not empty and the item has a bidHistory. */}
              {list.length > 0 && list[0].hasOwnProperty("bidHistory") && <ListCard item={list[0]} />}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {/* Map through the list (excluding the first item) and render a ListCard for each item. */}
          {list.slice(1).map((item, index) => (
            <div className="col-md-4" key={index + 1}>
              <ListCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}