import "./Footer.css";
import card from "../Images/amex.png";
import master from "../Images/mastercard.png";
import visa from "../Images/visa.png";
import cash from "../Images/cash.png";
import fb from "../Images/fb.png";
import insta from "../Images/insta.png";
import gmail from "../Images/gmail.png";
import tele from "../Images/tele.png";
import what from "../Images/what.png";
import swal from 'sweetalert';

function BelowFooter() {
  return (
    <div>
      <div className="below-footer">
        <div className="FirstSmall">
          <h4>POLICY INFO</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Sale</li>
            <li>Terms of Use</li>
            <li>Report Abuse & Takedown Policy</li>
            <li>Know Your BIS Standard</li>
            <li>Products Under Cumpulsory BIS Certification</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="FirstSmall">
          <h4>COMPANY</h4>
          <ul>
            <li>Impact@Snapdeal</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Sitemap</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="FirstSmall">
          <h4>SNAPDEAL BUSINESS</h4>
          <ul>
            <li>Shopping App</li>
            <li>Sell on Snapdeal</li>
            <li>Media Enquiries</li>
          </ul>
        </div>
        <div className="FirstSmall">
          <h4>POPULAR LINKS</h4>
          <ul>
            <li>Lehenga</li>
            <li>Kid's Clothing</li>
            <li>Sarees</li>
            <li>Winter Wear</li>
          </ul>
        </div>
        <div className="inside-footer">
          <h4>SUBSCRIBE</h4>
          <input type="text" name="" id="" placeholder="Your email address" />
          <button onClick={()=> swal({title: "Success", text: "Thanl You, Subscribed Successfully", icon: "success"})}>SUBSCRIBE</button>
          <div className="content-p">
            <p>Register now to get updates on promotions</p>
            <p>
              and coupons.{" "}
              <span>
                <a href={"www.gmail.com"}>Or Download App</a>
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="container container-stretch">
        <div>
          <h6>Payment</h6>
          <img src={card} alt="" />
          <img src={master} alt="" />
          <img src={visa} alt="" />
          <img src={cash} alt="" />
        </div>
        <div className="mycon">
            <h6>Contact Us</h6>
            <img src={fb} alt="" />
            <img src={insta} alt="" />
            <img src={gmail} alt="" />
            <img src={tele} alt="" />
            <img src={what} alt="" />
        </div>
      </div>
      <div
        class="text-center p-4 mt-6 footer-contact color-white"
        style={{ "background-color": "#e40046", color: "white" }}
      >
        &copy; 2023 Copyright:{" "}
        <a class="text-reset fw-bold color-white" href="https://snapdeal.com/">
          Snapdeal India Pvt Ltd. All rights reserved.
        </a>
      </div>
    </div>
  );
}

export default BelowFooter;
