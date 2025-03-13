import {useState} from "react";
import DataFake from "./ConcurrentRenderingData";

const NotConcurrentRendering = () => {
    const data = DataFake();
    const [query, setQuery] = useState("");
    const [filterData, setFilterData] = useState([]);

    const handleChange = (e) => {
        setQuery(e.target.value);
        setFilterData(
            data.filter((item) => item.toLowerCase().includes(event.target.value.toLowerCase()))
        );
    }
    return (
        <div>
            <h2>Concurrent Rendering Demo</h2>
            <input type={'text'} value={query} onChange={handleChange} placeholder={'tìm kiếm ...'}/>

            <ul>
                {
                    filterData.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                }
            </ul>

        </div>
    )
}
export default NotConcurrentRendering;