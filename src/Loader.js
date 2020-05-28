import React from "react";
import "./App.css";
import Upload from "./Upload";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function SiteLoader() {
  return (
    <div className="Loader">
      <div>
        <Loader
          type="Oval"
          color="#00BFFF"
          height={200}
          width={200}
          timeout={15000}
          visible={true}
        />
        <span>File is being converted</span>
      </div>
    </div>
  );
}

export default SiteLoader;
