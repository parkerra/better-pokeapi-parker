import React from "react"
import ReactSearchBox from "react-search-box"
React.useLayoutEffect = React.useEffect

export default function SearchBox(props) {
    let allData = props.dataList
    let data = []

    for (let i = 0; i < allData.length; i++) {
        data.push({
            key: i,
            value: allData[i]
        })
    }

    return (
        <>
            <div class="search-box">
                <ReactSearchBox
                    placeholder={props.placeholder}
                    data={data}
                    onSelect={props.onSelect}
                    clearOnSelect={!props.dontClear}
                />
            </div>
        </>
    );
}