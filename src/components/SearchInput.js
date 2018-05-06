import React, { Component } from "react"
import Select from "react-select/lib/Select"

import "../styles/styleSearchInput.css"
import { baseStyle, botton } from "../styles/baseStyle"

class SearchInput extends Component {
  render() {
    const { selectedOption, options, handleChange, onInputChange } = this.props
    return (
      <div
        style={{
          ...style.searchWrapper,
          ...baseStyle.flexContainer,
          ...baseStyle.flexRow
        }}
      >
        <div style={baseStyle.flexItem}>
          <Select
            name="search-artist"
            value={selectedOption}
            options={options}
            onChange={handleChange}
            onInputChange={onInputChange}
            placeholder={"Search"}
          />
        </div>
        <div>
          <button
            style={botton}
            onClick={() =>
              alert("TODO - Not sure how this should interact with the input")}
          >
            SEARCH
          </button>
        </div>
      </div>
    )
  }
}

const style = {
  searchWrapper: {
    paddingTop: 20,
    paddingBottom: 50
  }
}

export default SearchInput
