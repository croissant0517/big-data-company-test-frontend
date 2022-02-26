const DropDown = ({ data, setDropDownValue}) => {

    return (
        <div className="select">
            <select defaultValue="01" onChange={(e) => {
                setDropDownValue(e.target.value)
            }} >
                {
                    data.map(eachData => {
                        return (
                            <option key={eachData.id} className="option" value={eachData.id} >{eachData.items[0].site_id}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default DropDown;