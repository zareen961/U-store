import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

const filter = createFilterOptions()

const SelectOrAdd = ({ value, setValue, optionsData, isAdd, label }) => {
    return (
        <Autocomplete
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            fullWidth
            autoComplete
            options={optionsData}
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        name: newValue,
                    })
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        name: newValue.inputValue,
                    })
                } else {
                    setValue(newValue)
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params)

                // Suggest the creation of a new value
                if (params.inputValue !== '' && isAdd) {
                    filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                    })
                }

                return filtered
            }}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue
                }
                // Regular option
                return option.name
            }}
            renderOption={(option) => option.name}
            renderInput={(params) => (
                <TextField
                    required={isAdd}
                    {...params}
                    label={label}
                    variant="outlined"
                    color="secondary"
                />
            )}
        />
    )
}

export default SelectOrAdd
