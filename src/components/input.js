export default function Input({ onChange, value, name, placeholder, type, readOnly }) {
    return (
        <input
            onChange={(e) => onChange(e)}
            type={type ? type : 'text'}
            value={value ? value : ""}
            name={name}
            class='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-800 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
            placeholder={placeholder}
            readOnly={readOnly}
        />
    )
}
