import "./Message.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faSpinner } from '@fortawesome/free-solid-svg-icons'

export function Message({ data }) {
    return (
        <div className="Message" data-type={data.type}>
            {data.type ? (
                <FontAwesomeIcon icon={faTriangleExclamation} />
            ) : (
                <FontAwesomeIcon icon={faSpinner} spin />
            )}
            <span>{data.info}</span>
        </div>
    );
}