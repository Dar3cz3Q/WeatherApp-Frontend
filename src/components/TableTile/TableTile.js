import "./TableTile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CodeDefinitions } from "./CodeDefinitions";

const formatDate = (date) => {
    let objectDate = new Date(date);

    let day = objectDate.getDate();
    let month = objectDate.getMonth() + 1;
    let year = objectDate.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    return `${day}/${month}/${year}`;
}

export function TableTile({ data }) {
    return (
        <div className="Tile">
            <div className="Tile--Date">{formatDate(data.date)}</div>
            <div className="Tile--Icon">{<FontAwesomeIcon icon={CodeDefinitions[data.weather_code]} />}</div>
            <div className="Tile--MinMax">{data.temp_max}&deg;C / {data.temp_min}&deg;C</div>
            <div className="Tile--GenEnergy">{data.generated_energy.toFixed(3)} kWh</div>
        </div>
    );
}