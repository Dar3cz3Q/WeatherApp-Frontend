import "./Forecast.css"
import React, { useState, useEffect } from "react";
import Axios from "axios"

import { InputField } from "../../components/InputField/InputField"
import { Button } from "../../components/Button/Button"
import { TableTile } from "../../components/TableTile/TableTile"
import { Message } from "../../components/Message/Message"
import { Map } from "../../components/Map/Map"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'

const API_URL = process.env.REACT_APP_API_URL;
const API_PORT = process.env.REACT_APP_API_PORT;
const API_PROTOCOL = process.env.REACT_APP_API_PROTOCOL;

Axios.defaults.baseURL = "" + API_PROTOCOL + "://" + API_URL + ":" + API_PORT + "";

const mapIcon = <FontAwesomeIcon icon={faMap} />;

function getCurrentCoordinates(setLatitude, setLongitude, setInfoData, setCurrentCoordinatesState) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setCurrentCoordinatesState(true);
        }, (error) => {
            console.error(error);
            setInfoData({ info: error.message, type: 1 });
        });
    } else {
        setInfoData({ info: "Geolocation is not available in your browser. Coordinates must be entered manually", type: 1 });
    }
}

export function Forecast() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [currentCoordinatesState, setCurrentCoordinatesState] = useState(false);

    const [forecastData, setForecastData] = useState(0);
    const [infoData, setInfoData] = useState({ info: "Checking permissions...", type: 0 });

    const [mapState, setMapState] = useState(false);

    const changeMapVisibility = () => {
        setMapState(!mapState);
    }

    const getForecastData = async () => {
        setForecastData(0);
        setMapState(false);
        setInfoData({ info: "Loading...", type: 0 });
        try {
            let result = await Axios.get(
                "/forecast", {
                params: {
                    latitude: latitude,
                    longitude: longitude,
                }
            }
            );
            setForecastData(result.data);
            setInfoData(0);
        } catch (error) {
            console.error(error);

            if (error.response) {
                // Server responded with an error
                setInfoData({ info: error.response.data.error, type: 1 });
            } else if (error.request) {
                // No response from server
                setInfoData({ info: "Internal server error", type: 1 });
            } else {
                // Error while setting up the request
                setInfoData({ info: "Application error", type: 1 });
            }
        }
    }

    useEffect(() => {
        getCurrentCoordinates(setLatitude, setLongitude, setInfoData, setCurrentCoordinatesState);
        if (currentCoordinatesState) {
            getForecastData();
        }
        // eslint-disable-next-line
    }, [currentCoordinatesState]);

    return (
        <div className="Forecast">
            <div className="Forecast--Input">
                <InputField name="Latitude" value={latitude} onValueChange={setLatitude} limit={[-90, 90]}></InputField>
                <InputField name="Longitude" value={longitude} onValueChange={setLongitude} limit={[-180, 180]}></InputField>
                <div>
                    <Button type="submit" icon={mapIcon} callback={changeMapVisibility}></Button>
                    <Button type="submit" text="Show forecast" callback={getForecastData}></Button>
                </div>
            </div>
            <div className="Forecast--Table">
                {forecastData && !mapState ?
                    (
                        Object.entries(forecastData).map(([key, value]) => (
                            <TableTile key={key} data={value}></TableTile>
                        ))
                    ) : (
                        <Message data={infoData}></Message>
                    )
                }
                {mapState ? <Map position={[latitude, longitude]} setLatitude={setLatitude} setLongitude={setLongitude}></Map> : ""}
            </div>
        </div >
    );
}