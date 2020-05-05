import React from "react";
import axios from "axios";

const d = () => {
  var xhr = new XMLHttpRequest();
  var url =
    "http://openapi.tago.go.kr/openapi/service/TrainInfoService/getStrtpntAlocFndTrainInfo"; /*URL*/
  var queryParams =
    "?" +
    encodeURIComponent("ServiceKey") +
    "=" +
    encodeURIComponent(
      "7wZBl12jJ2YDrzKT03mkhLh7ioxHTglyo7EvgWZAuBv2pPBzApWgdbIzC9ynzuCknTWpemNbioarZ6rYzMGVEw=="
    ); /*Service Key*/
  queryParams +=
    "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10"); /**/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("depPlaceId") +
    "=" +
    encodeURIComponent("NAT010000"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("arrPlaceId") +
    "=" +
    encodeURIComponent("NAT011668"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("depPlandTime") +
    "=" +
    encodeURIComponent("20200101"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("trainGradeCode") +
    "=" +
    encodeURIComponent("00"); /**/
  xhr.open("GET", url + queryParams);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      alert(
        "Status: " +
          this.status +
          "nHeaders: " +
          JSON.stringify(this.getAllResponseHeaders()) +
          "nBody: " +
          this.responseText
      );
    }
  };

  xhr.send("");
};

function App() {
  return (
    <div className="App">
      Dsd
      <button onClick={() => console.log(d())}></button>
    </div>
  );
}

export default App;
