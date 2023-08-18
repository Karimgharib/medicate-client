import Carousel from "react-bootstrap/Carousel";
import FirstSlide from "../assets/wallpaperflare.com_wallpaper.jpg";
import SecondSlide from "../assets/wallpaperflare.com_wallpaper (1).jpg";

const Landing = () => {
  return (
    <Carousel controls={false} className="landing">
      <Carousel.Item>
        <img className="d-block w-100" src={FirstSlide} alt="First slide" />
        <Carousel.Caption className="caption">
          <h3>We Care About You</h3>
          <p>
            Trust our medical expertise for comprehensive and effective
            healthcare solutions.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={SecondSlide} alt="Second slide" />
        <Carousel.Caption className="caption">
          <h3>Let us check on you</h3>
          <p>
            Discover top-quality medical care that prioritizes your well-being
            and delivers lasting results.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Landing;
