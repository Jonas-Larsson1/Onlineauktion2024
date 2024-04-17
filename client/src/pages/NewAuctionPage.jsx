import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const NewAuctionPage = () => {
  const [auctionData, setAuctionData] = useState({
    startDate: null,
    endDate: null,
    dropdownOpen: false,
    title: "",
    customCategory: "",
    data: null,
    mainTitle: "",
    description: "",
    allImages: ["", "", ""],
    startPrice: "",
    reservedPrice: "",
    showAlert: false,
    unixStartDate: Math.floor(new Date().getTime() / 1000),
    unixEndDate: Math.floor(new Date().getTime() / 1000),
    warning: "",
    disabled: true,
    startDateChanged: false
  });

  const { loggedIn } = useContext(GlobalContext);
  const [startDateChanged, setStartDateChanged] = useState(false);
  const navigate = useNavigate();

  const onImageInput = (index, value) => {
    const imageInput = [...auctionData.allImages];
    imageInput[index] = value;
    setAuctionData({ ...auctionData, allImages: imageInput });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/auctions");
      const result = await response.json();
      setAuctionData({ ...auctionData, data: result });
    };
    getData();
  }, []);

  async function postNewAuction(e) {
    e.preventDefault();

    const {
      allImages,
      mainTitle,
      description,
      unixStartDate,
      unixEndDate,
      startPrice,
      reservedPrice,
      title,
    } = auctionData;

    if (
      allImages[0].length >= 1 &&
      mainTitle.length > 2 &&
      description.length > 3 &&
      unixStartDate != null &&
      unixEndDate != null &&
      startPrice.length > 0 &&
      reservedPrice.length > 0 &&
      title[0].length >= 1
    ) {
      const res = await fetch("/api/auctions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sellerId: loggedIn,
          images: allImages,
          title: mainTitle,
          description: description,
          startDate: unixStartDate,
          endDate: unixEndDate,
          startingPrice: startPrice,
          reservePrice: reservedPrice,
          category: [title],
        }),
      });
      if (res.ok) {
        console.log(res);
        navigate("/"); // navigates to home page
      } else {
        setAuctionData({
          ...auctionData,
          warning: "Something went wrong",
          showAlert: true,
        });
      }
    } else if (allImages[0].length < 1) {
      setAuctionData({
        ...auctionData,
        warning: "You need at least one image",
        showAlert: true,
      });
    } else if (mainTitle.length < 2) {
      setAuctionData({
        ...auctionData,
        warning: "You need at least two characters as title",
        showAlert: true,
      });
    } else if (description.length < 1) {
      setAuctionData({
        ...auctionData,
        warning: "You need at least three characters in description",
        showAlert: true,
      });
    } else if (unixStartDate === null) {
      setAuctionData({
        ...auctionData,
        warning: "You need to put start date of auction",
        showAlert: true,
      });
    } else if (unixEndDate === null) {
      setAuctionData({
        ...auctionData,
        warning: "You need to put end date of auction",
        showAlert: true,
      });
    } else if (startPrice.length < 1) {
      setAuctionData({
        ...auctionData,
        warning: "You need to put a starting price",
        showAlert: true,
      });
    } else if (reservedPrice.length < 1) {
      setAuctionData({
        ...auctionData,
        warning: "You need to put a reserved price",
        showAlert: true,
      });
    } else {
      setAuctionData({
        ...auctionData,
        warning: "You need to choose a category",
        showAlert: true,
      });
    }
  }

  const existingCategories = [];

  let filtered = auctionData.data
    ? auctionData.data.map((item) =>
        item.category.map((i) =>
          existingCategories.includes(i) ? null : existingCategories.push(i)
        )
      )
    : null;

  const handleStartDateChange = (date) => {
    setAuctionData({
      ...auctionData,
      unixStartDate: Math.floor(date.getTime() / 1000),
      startDateChanged: true
    });
  };

  const handleEndDateChange = (date) => {
    setAuctionData({
      ...auctionData,
      unixEndDate: Math.floor(date.getTime() / 1000),
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setAuctionData({
        ...auctionData,
        title: auctionData.customCategory,
        dropdownOpen: false,
        customCategory: "",
        disabled: !auctionData.disabled,
      });
    }
  };

  return (
    <>
      {auctionData.showAlert && (
        <Alert
          className="warning-alert"
          variant="danger"
          onClose={() => setAuctionData({ ...auctionData, showAlert: false })}
          dismissible
        >
          <Alert.Heading>{auctionData.warning}</Alert.Heading>
        </Alert>
      )}

      <form className="w-100 d-flex justify-content-center align-items-center m-3">
        <div className="d-flex flex-column" style={{ width: "30%" }}>
          <div className="d-flex flex-column">
            {auctionData.allImages.map((image, index) => (
              <input
                key={index}
                type="text"
                value={image}
                className="form-control mb-2"
                onChange={(e) => onImageInput(index, e.target.value)}
                placeholder="Link to your image"
              />
            ))}

            <input
              type="text"
              value={auctionData.mainTitle}
              onChange={(e) =>
                setAuctionData({ ...auctionData, mainTitle: e.target.value })
              }
              className="form-control mb-2"
              placeholder="Title"
              aria-label="Title"
            />

            <input
              type="text"
              value={auctionData.description}
              onChange={(e) =>
                setAuctionData({ ...auctionData, description: e.target.value })
              }
              className="form-control mb-2"
              placeholder="Description"
              aria-label="Description"
            />
          </div>
          <div className="row">
            <div className="col">
              <div className="d-flex flex-column">
                <label>Start Date:</label>
                <DatePicker
                  selected={new Date(auctionData.unixStartDate * 1000)}
                  onChange={handleStartDateChange}
                  selectsStart
                  minDate={new Date()}
                  className="form-control custom-date-picker"
                  showTimeSelect
                  //timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                />
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-column">
                <label>End Date:</label>
                <DatePicker
                  selected={new Date(auctionData.unixEndDate * 1000)}
                  onChange={handleEndDateChange}
                  selectsEnd
                  minDate={auctionData.unixStartDate}
                  disabled={!auctionData.unixStartDate} // End date is disabled when startDate is null
                  className="form-control custom-date-picker"
                  showTimeSelect
                  //timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="input-group mt-2">
                <span className="input-group-text">€</span>
                <input
                  type="text"
                  value={auctionData.startPrice}
                  onChange={(e) =>
                    setAuctionData({
                      ...auctionData,
                      startPrice: e.target.value,
                    })
                  }
                  className="form-control"
                  placeholder="Start Price"
                  aria-label="Start Price"
                />
              </div>
            </div>
            <div className="col">
              <div className="input-group mt-2">
                <span className="input-group-text">€</span>
                <input
                  type="text"
                  value={auctionData.reservedPrice}
                  onChange={(e) =>
                    setAuctionData({
                      ...auctionData,
                      reservedPrice: e.target.value,
                    })
                  }
                  className="form-control"
                  placeholder="Reserved Price"
                  aria-label="Reserved Price"
                />
              </div>
            </div>
          </div>
          <div className="dropdown mt-2 w-100 d-flex justify-content-center">
            <button
              className="btn btn-secondary dropdown-toggle w-75"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() =>
                setAuctionData({
                  ...auctionData,
                  dropdownOpen: !auctionData.dropdownOpen,
                })
              }
            >
              {auctionData.title == "" ? "Categories" : auctionData.title}
            </button>
          </div>
          {auctionData.dropdownOpen ? (
            <div className="list-group w-75 align-self-center">
              {existingCategories.map((cat, index) => (
                <a
                  key={index}
                  className="list-group-item list-group-item-action text-center"
                  href="#"
                  onClick={() =>
                    setAuctionData({
                      ...auctionData,
                      title: cat,
                      dropdownOpen: false,
                      disabled: !auctionData.disabled,
                    })
                  }
                >
                  {cat}
                </a>
              ))}
              <input
                type="text"
                placeholder="Add custom category"
                value={auctionData.customCategory}
                onChange={(e) =>
                  setAuctionData({
                    ...auctionData,
                    customCategory: e.target.value,
                  })
                }
                onKeyDown={handleKeyPress}
              />
            </div>
          ) : null}
          <button
            className="btn btn-primary mt-3 w-75 align-self-center"
            onClick={postNewAuction}
            disabled={auctionData.disabled}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default NewAuctionPage;