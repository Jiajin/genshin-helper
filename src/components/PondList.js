import React from "react";

import "./PondList.css";

import FishSpots from "../data/FishSpots";
import Fish from "../data/Fish";
const PondList = () => {
  //const uniqueRegions = [...new Set(FishSpots.map((x) => x.Region))];
  const uniqueRegions = ["Mondstadt", "Liyue", "Inazuma"];
  console.log(Fish);
  return uniqueRegions.map((region) => {
    let regionData = FishSpots.filter((x) => x.Region === region);
    console.log(regionData);
    return regionData.map((fishSpot) => (
      // <tr className="pond-container eighty-width">
      //   <td>
      //     <div className="pond__name">{fishSpot.Name}</div>
      //   </td>
      //   <td>
      //     <img className="pond__image" src={fishSpot.Image}></img>
      //   </td>
      //   <td>
      //     <div className="parent pond__fishes">
      //       {fishSpot.Fishes.map((fishId) => (
      //         <img
      //           className="pond__fish"
      //           alt={Fish[fishId - 1].Name}
      //           title={Fish[fishId - 1].Name}
      //           src={Fish[fishId - 1].Image}
      //         />
      //       ))}
      //     </div>
      //   </td>
      // </tr>
      <div className="pond-container eighty-width">
        <div className="pond__name">{fishSpot.Name}</div>
        <img className="pond__image" src={fishSpot.Image}></img>
        <div className="parent pond__fishes">
          {fishSpot.Fishes.map((fishId) => (
            <img
              className="pond__fish"
              alt={Fish[fishId - 1].Name}
              title={Fish[fishId - 1].Name}
              src={Fish[fishId - 1].Image}
            />
          ))}
        </div>
      </div>
    ));
  });
};

export default PondList;
