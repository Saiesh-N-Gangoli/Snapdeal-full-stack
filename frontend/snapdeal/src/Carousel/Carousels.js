import React from 'react'
import { Carousel } from 'react-bootstrap'

export default function Carousels() {
  return (
    <div>
              <div className="something">
          <Carousel className="ImageCar">
            <Carousel.Item>
            <a href="http://localhost:3000/procategory/10">
              <img
                className="d-block"
                src={
                  "https://n2.sdlcdn.com/imgs/k/s/i/ethnicwear-ef4d9.jpg&quot"
                }
                alt="First slide"
              />
              </a>
            </Carousel.Item>

            <Carousel.Item>
              <a href="http://localhost:3000/procategory/8">
              <img
                className="d-block"
                src={
                  "https://n1.sdlcdn.com/imgs/k/s/i/sport_shoe-6f9df.jpg&quot"
                }
                alt="Second slide"
                
              />
              </a>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block"
                src={"https://n3.sdlcdn.com/imgs/k/s/i/cookware-bc6ef.jpg&quot"}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src={
                  "https://n4.sdlcdn.com/imgs/k/s/i/bedsheets0512-a7f6e.jpg&quot"
                }
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
            <a href="http://localhost:3000/procategory/1">
              <img
                className="d-block"
                src={
                  "https://n3.sdlcdn.com/imgs/k/s/i/winter_wear-51422.jpg&quot"
                }
                alt="Third slide"
              />
          </a>
            </Carousel.Item>
            <Carousel.Item>

              <img
                className="d-block"
                src={"https://n3.sdlcdn.com/imgs/k/s/i/utility-86032.jpg&quot"}
                alt="Third slide"
              />

            </Carousel.Item>
          </Carousel>
        </div>
    </div>
  )
}
