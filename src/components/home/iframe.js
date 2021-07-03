import React from "react";

export default function Iframe({ url = "", title = "Search Bar" }) {
  return !!url ? (
    <iframe src={url} className="iframe-wrapper" {...{title}}/>
  ) : (
    <div className="iframe-wrapper info">Enter URL in {title}</div>
  );
}
