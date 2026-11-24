import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__spinner-container">
        <i className="circle-preloader"></i>
      </div>
      <p className="preloader__text">Searching for news...</p>
    </div>
  );
}

export default Preloader;
