import {useState, useTransition} from "react";
import DataFake from "./ConcurrentRenderingData";

const ConcurrentRendering = () => {
    const data = DataFake();
    const [query, setQuery] = useState("");
    const [filterData, setFilterData] = useState([]);
    const [isPending, startTransition] = useTransition();

    const handleChange = (e) => {
        setQuery(e.target.value);
        startTransition(() => {
            setFilterData(
                data.filter((item) => item.toLowerCase().includes(event.target.value.toLowerCase()))
            );
        })

    }
    return (
        <div>
            <h2>Concurrent Rendering Demo</h2>
            <input type={'text'} value={query} onChange={handleChange} placeholder={'tìm kiếm ...'}/>
            {isPending && <p>Đang tìm kiếm </p>}
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
export default ConcurrentRendering;