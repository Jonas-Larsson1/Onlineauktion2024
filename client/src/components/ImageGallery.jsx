import { Carousel, Image } from "react-bootstrap"

export default function ImageGallery(props) {
  const { images } = props.auction

  //  console.log(images)
  return <>
    <Carousel className="ImageGalleryCarousel">
      {images.map((image, index) => {
        return (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center" >
              <Image src={image} className="img-fluid rounded" style={{height: "400px", objectFit: "cover"}}/>
            </div>
          </Carousel.Item>
        )
      })}
    </Carousel>
  </>
}