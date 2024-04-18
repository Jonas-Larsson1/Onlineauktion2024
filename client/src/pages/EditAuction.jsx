import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import StyleCard from "../components/StyleCard";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const EditAuction = () => {
    const { id } = useParams();
    const { loggedIn } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [auctionData, setAuctionData] = useState({
        dropdownOpen: false,
        title: "",
        customCategory: "",
        data: null,
        mainTitle: "",
        description: "",
        allImages: ["", "", ""],
        showAlert: false,
        warning: "",
        disabled: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch auction data
                const response = await fetch(`/api/auction/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch auction data");
                }
                const data = await response.json();

                // Fetch categories
                const categoriesResponse = await fetch("/api/auctions");
                if (!categoriesResponse.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const categoriesData = await categoriesResponse.json();
                const existingCategories = categoriesData.reduce((acc, curr) => {
                    curr.category.forEach((cat) => {
                        if (!acc.includes(cat)) {
                            acc.push(cat);
                        }
                    });
                    return acc;
                }, []);

                // Set auction data and categories
                setAuctionData({
                    ...auctionData,
                    allImages: data.images || ["", "", ""],
                    mainTitle: data.title || "",
                    description: data.description || "",
                    title: data.category[0] || "",
                    data: existingCategories
                });
            } catch (error) {
                console.error("Error fetching auction data:", error);
                setAuctionData({
                    ...auctionData,
                    showAlert: true,
                    warning: "Failed to fetch auction data"
                });
            }
        };
        fetchData();
    }, [id]);

    const onImageInput = (index, value) => {
        const imageInput = [...auctionData.allImages];
        imageInput[index] = value;
        setAuctionData({ ...auctionData, allImages: imageInput });
    };

    const updateAuction = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/auction/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: auctionData.mainTitle,
                    description: auctionData.description,
                    images: auctionData.allImages,
                    category: [auctionData.title]
                })
            });
            if (!response.ok) {
                throw new Error("Failed to update auction data");
            }

            alert("Auction updated")
            navigate(`/AuctionPage/${id}`);

        } catch (error) {
            console.error("Error updating auction data:", error);
            setAuctionData({
                ...auctionData,
                showAlert: true,
                warning: "Failed to update auction data"
            });
        }
    };

    const deleteAuction = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/auction/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Failed to delete auction");
            }

            alert("Auction deleted")
            navigate("/");

        } catch (error) {
            console.error("Error deleting auction:", error);
            setAuctionData({
                ...auctionData,
                showAlert: true,
                warning: "Failed to delete auction"
            });
        }
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
            <div style={{ height: '100vh' }}>
                <BackButton to={`/AuctionPage/${id}`} />

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

                <div className="d-flex justify-content-center mb-5" style={{ width: '100%' }}>
                    <div className="w-25">
                        <StyleCard><h4 className="fst-italic fw-bold">Edit your auction</h4></StyleCard>
                    </div>
                </div>

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
                                {auctionData.title === "" ? "Categories" : auctionData.title}
                            </button>
                        </div>
                        {auctionData.dropdownOpen ? (
                            <div className="list-group w-75 align-self-center" style={{ maxHeight: "200px", overflowY: "auto" }}>
                                {auctionData.data && auctionData.data.map((cat, index) => (
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
                            onClick={updateAuction}
                        >
                            Update auction
                        </button>

                        <button
                            className="btn btn-danger mt-3 w-75 align-self-center"
                            onClick={deleteAuction}
                        >
                            Delete auction
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditAuction;
