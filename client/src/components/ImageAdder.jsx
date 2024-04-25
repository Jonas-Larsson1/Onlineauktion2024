export default function ImageAdder ( {auctionData, setAuctionData} ) {

  const onImageInput = (index, value) => {
    const imageInput = auctionData.allImages
    imageInput[index] = value;
    setAuctionData({ ...auctionData, allImages: imageInput });
  };

  const addImageInput = () => {
    setAuctionData(prevState => ({
      ...prevState,
      allImages: [...prevState.allImages, ""]
    }));
  };

  const removeImageInput = (index) => {
    setAuctionData((prevState) => {
      const updatedImages = prevState.allImages.filter((_, i) => i !== index);
      return { ...prevState, allImages: updatedImages };
    });
  };
  
  return <>
  {auctionData.allImages.map((image, index) => (
    <div key={index} className="d-flex align-items-center mb-1">
      <input
        key={index}
        type="text"
        value={image || ''}
        className="form-control mr-2"
        onChange={(e) => onImageInput(index, e.target.value)}
        placeholder="Link to your image"
      />
      {index > 0 ? 
        <button
        className="btn btn-danger"
        onClick={(e) => {
          e.preventDefault()
          removeImageInput(index)
        }}>-</button>
      : <></>}
    </div>
  ))}

    <button className="btn btn-primary mt-2 mb-4" onClick={(e) => {
      e.preventDefault()
      addImageInput()
    }}>Click to add another image</button>
  </>
}