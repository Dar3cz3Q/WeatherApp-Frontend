import "./Button.css"

export function Button({ type, text, icon, callback }) {

    return (
        <button
            className="SubmitButton"
            type={type}
            onClick={callback}
        >
            {icon}
            {text}
        </button>
    );
}