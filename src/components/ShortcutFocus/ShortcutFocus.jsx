import { useRef, useState } from "react";

const ValidateInput = () => {
    const inputRef = useRef(null);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (!inputRef.current?.value || inputRef.current.value.length < 10) {
            setError("Số điện thoại không hợp lệ!");
            inputRef.current?.focus(); // Focus vào input nếu có lỗi
        } else {
            setError("");
            alert("Số điện thoại hợp lệ!");
        }
    };

    return (
        <div>
            <input ref={inputRef} placeholder="Nhập số điện thoại" />
            <button onClick={handleSubmit}>Gửi</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default ValidateInput;
