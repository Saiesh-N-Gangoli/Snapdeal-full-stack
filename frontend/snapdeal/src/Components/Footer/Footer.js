import "./Footer.css";
import apple from "../Images/apple.png";
import playstore from "../Images/playstore.png";

function Footer() {
  const appleurl =
    "https://apps.apple.com/in/app/snapdeal-online-shopping-app/id721124909?ls=1&utm_campaign=ios&utm_source=mobileAppLp";
  const playstoreurl =
    "https://play.google.com/store/apps/details?id=com.snapdeal.main&utm_source=mobileAppLp&utm_campaign=android";
  return (
    <div className="MainContainer">
      <div className="ImgContainer">
        <img src={"https://i2.sdlcdn.com/img/appScreenshot@1x.png"} alt="" />
      </div>
      <div className="ImgContent">
        <h1>Download Snapdeal </h1>
        <h1>App Now</h1>
        <div className="smallContent">
          <p>Fast, Simple & Delightful</p>
          <p>All it takes is 30 seconds to Download.</p>
          <div className="downloadapp">
            <a href={appleurl}>
              <img className="first-image" src={apple} alt="" />
            </a>
            <a href={playstoreurl}>
              <img className="second-image" src={playstore} alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="sideImg">
        <img src={"https://i2.sdlcdn.com/img/leaves1x.png"} alt="" />
      </div>
    </div>
  );
}

export default Footer;
