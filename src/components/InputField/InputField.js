import "./InputField.css"

export function InputField({ name, value, onValueChange, limit }) {
    return (
        <div className="Input--Field">
            <label htmlFor={name}>{name}:</label>
            <input
                type="number"
                id={name}
                name={name}
                value={value}
                min={limit[0]}
                max={limit[1]}
                step="0.000001"
                onChange={e => {
                    onValueChange(e.target.value)
                }}
            />
        </div>
    );
}