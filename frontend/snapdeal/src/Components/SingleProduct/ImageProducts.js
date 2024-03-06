import { Carousel } from "react-bootstrap";

function ImageProducts({ imgs = [{ url: " " }] }) {
  console.log(imgs);
 
  return (
    <div className="biggest">
      <Carousel className="ImageCar">
        {imgs.map((c, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={c.url}
              alt={`Slide ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageProducts;
