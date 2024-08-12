import "./App.css";
import { BlogPost } from "./components/Blog.jsx";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchIpAddress, setSearchIpAddress] = useState("");
  const [inputIpAddress, setInputIpAddress] = useState("");
  // console.log(inputIpAddress.ip);

  const searchData = async () => {
    try {
      const dataIpAddress = await axios.get(
        `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_ZrYIdOYkMwz8QDRMWYC1h9kCFcMNl&ipAddress=${inputIpAddress}`
      );
      setInputIpAddress(dataIpAddress.data);
      console.log(dataIpAddress.data);
    } catch (error) {
      console.log("Error fetching the IP data");
    }
  };

  useEffect(() => {
    searchData();
  }, [inputIpAddress]);

  return (
    <div className="App">
      <div className="app-backgroung">
        <div className="app-wrapper">
          <h1 className="app-title">IP Address Tracker</h1>
          <div className="app-input">
            <input
              className="app-input-text"
              type="text"
              placeholder="Search for any IP address or domain"
              value={searchIpAddress}
              onChange={(event) => {
                setSearchIpAddress(event.target.value);
              }}
            />

            <button
              onClick={() => {
                setInputIpAddress(searchIpAddress);
              }}
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>

          {/* prop */}
          <div className="app-blogpost">
            {inputIpAddress && (
              <>
                <BlogPost title="IP ADDRESS" content={inputIpAddress.ip} />
                <hr />
                <BlogPost
                  title="LOCATION"
                  content={
                    <>
                      {inputIpAddress.location.city}, <br />
                      {inputIpAddress.location.region} {inputIpAddress.as.asn}
                    </>
                  }
                />
                <hr />
                <BlogPost
                  title="TIMEZONE"
                  content={`UTC ${inputIpAddress.location.timezone}`}
                />
                <hr />
                <BlogPost title="ISP" content={inputIpAddress.isp} />
              </>
            )}
          </div>
        </div>
      </div>

      {inputIpAddress && (
        <>
          <MapContainer
            className="map"
            center={[inputIpAddress.location.lat, inputIpAddress.location.lng]}
            zoom={13}
            scrollWheelZoom={true}
            // zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                inputIpAddress.location.lat,
                inputIpAddress.location.lng,
              ]}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </>
      )}
    </div>
  );
}

export default App;
