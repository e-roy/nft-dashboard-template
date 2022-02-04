import { useNavigate } from "react-router-dom";
import "./style.css";
import bannerImg from "../../assets/Covalent-Background_5.jpg";

const Banner = ({ head, subhead, img, color }) => {
  const navigate = useNavigate();
  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${img ? img : bannerImg})` }}
    >
      <div
        className="banner-section"
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="banner-logo"></div>
        <div className="banner-header">
          <h3 style={{ color: color ? "white" : "#FF4C8B" }}>{subhead}</h3>
          <div className="banner-title">
            <h1>{head}</h1>
            <div className="tag" style={{ backgroundColor: color }}>
              Beta
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Banner.defaultProps = {
  head: "Head",
  subhead: "SubHead",
  img: bannerImg,
};

export default Banner;
