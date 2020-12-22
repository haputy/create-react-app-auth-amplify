import React, { useRef, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import mapboxgl, { Popup } from "mapbox-gl";
import "./VanillaMap.css";
import InfoPanel from './ModalButton/InfoPanel'

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFwdXR5IiwiYSI6ImNqZGNleTVnYjBpZDIycXM0b2ptdTVpZnIifQ.SQ8jV9GmA78fpzumnn23-Q";




const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);


  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/haputy/ck54mkkl305cs1co5j8gebr34/draft",
      center: [-93.284435, 44.955409],
      zoom: 13,
    });
    map.on('load', function() {
    map.addSource('trails', {type: 'geojson', data: "http://54.146.90.239:8080/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite%3Atrails&maxFeatures=50&outputFormat=application%2Fjson"});
   
    map.addLayer({
      'id': 'trails',
      'type': 'line',
      'source': 'trails',
      'layout': {
      'line-join': 'round',
      'line-cap': 'round'
      },
      'paint': {
        'line-opacity': [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          10.9,
          0,
          11.86,
          0.5,
          22,
          1
        ],
      'line-color': [
        "case",
        [
          "match",
          ["get", "difficulty"],
          [2],
          true,
          false
        ],
        "hsl(239, 83%, 60%)",
        [
          "match",
          ["get", "difficulty"],
          [1],
          true,
          false
        ],
        "hsl(119, 47%, 49%)",
        [
          "match",
          ["get", "skijoring"],
          ["n"],
          true,
          false
        ],
        "hsla(0, 100%, 53%, 0.42)",
        "hsl(0, 90%, 100%)"
      ],
      'line-width': 6,
      
      }
      });

    })

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("click", "trails", (e) => {
      var trailName = e.features[0].properties.trailname;

      var systemName = e.features[0].properties.system;
      var passReq = e.features[0].properties.passreq;
      var passLink = e.features[0].properties.passlink;
      var systemLink  = e.features[0].properties.systemlink;
      var distance = e.features[0].properties.distance;
      var difficulty = e.features[0].properties.difficulty;
      var passPurchaseLink = e.features[0].properties.passpurchase;
      var skinnySki = e.features.[0].properties.skinnyski;

        
        //React Node thing requires first to create a div element to be appended to the dom this element will be called mapCardNode
        var mapCardNode = document.createElement('div');

        //Now we need to tell it what class to be, here I am using the Bootstrap btn
        mapCardNode.className="btn";
        //ReactDOM.render just renders the React Element and appends it to the mapcardnode instance, you can use {variables} from your current component which are being pulled from the map
        ReactDOM.render(
      <InfoPanel trailName={trailName} systemName={systemName} passReq={passReq} passLink={passLink} systemLink={systemLink} distance={distance} difficulty={difficulty} passPurchaseLink={passPurchaseLink} skinnySki={skinnySki} />, mapCardNode
        )
      var coordinates = [e.lngLat.lng, e.lngLat.lat];
      console.log(coordinates)
      new mapboxgl.Popup()
        .setLngLat(coordinates)
          //.setHTML("I am the popup")
          //SetDOMContent is specific to the Mapbox popup api. This sets a child element which has been constructed in previous lines which references the <InfoPanel> child components with its props testnumber (or whatever prop you want it to be.)
        .setDOMContent(mapCardNode)
        .addTo(map);
        

    });


    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
  <div className="map-container" ref={mapContainerRef} />
  
  )
};

export default Map;
