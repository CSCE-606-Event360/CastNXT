import * as React from 'react';
import PropTypes from 'prop-types';
import { TextField, Box } from "@mui/material";
import { getGridNumericColumnOperators } from "@material-ui/data-grid";

const SUBMIT_FILTER_STROKE_TIME = 500;

const InputNumberInterval = (props) => {
    const { item, applyValue, focusElementRef = null } = props;
  
    const filterTimeout = React.useRef();
    const [filterValueState, setFilterValueState] = React.useState(item.value ? item.value : [0, 1000]);
  
    const [applying, setIsApplying] = React.useState(false);
  
    React.useEffect(() => {
      return () => {
        clearTimeout(filterTimeout.current);
      };
    }, []);
  
    React.useEffect(() => {
      const itemValue = item.value ? item.value: [0, 1000];
      setFilterValueState(itemValue);
    }, [item.value]);
  
    const updateFilterValue = (lowerBound, upperBound) => {
      clearTimeout(filterTimeout.current);
      setFilterValueState([lowerBound, upperBound]);
  
      setIsApplying(true);
      filterTimeout.current = setTimeout(() => {
        setIsApplying(false);
        applyValue({ ...item, value: [lowerBound, upperBound] });
      }, SUBMIT_FILTER_STROKE_TIME);
    };
  
    const handleUpperFilterChange = (event) => {
      const newUpperBound = event.target.value;
      updateFilterValue(filterValueState[0], Number(newUpperBound));
    };
    const handleLowerFilterChange = (event) => {
      const newLowerBound = event.target.value;
      updateFilterValue(Number(newLowerBound), filterValueState[1]);
    };
  
    return (
      <Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'end',
          height: 48,
          pl: '20px',
        }}
      >
        <TextField
          name="lower-bound-input"
          placeholder="From"
          label="From"
          variant="standard"
          value={Number(filterValueState[0])}
          onChange={handleLowerFilterChange}
          type="number"
          inputRef={focusElementRef}
          sx={{ mr: 2 }}
        />
        <TextField
          name="upper-bound-input"
          placeholder="To"
          label="To"
          variant="standard"
          value={Number(filterValueState[1])}
          onChange={handleUpperFilterChange}
          type="number"
          //InputProps={applying ? { endAdornment: <SyncIcon /> } : {}}
        />
      </Box>
    );
}
  
InputNumberInterval.propTypes = {
    applyValue: PropTypes.func.isRequired,
    focusElementRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        current: PropTypes.any.isRequired,
      }),
    ]),
    item: PropTypes.shape({
      /**
       * The column from which we want to filter the rows.
       */
      columnField: PropTypes.string.isRequired,
      /**
       * Must be unique.
       * Only useful when the model contains several items.
       */
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      /**
       * The name of the operator we want to apply.
       * Will become required on `@mui/x-data-grid@6.X`.
       */
      operatorValue: PropTypes.string,
      /**
       * The filtering value.
       * The operator filtering function will decide for each row if the row values is correct compared to this value.
       */
      value: PropTypes.any,
    }).isRequired,
};

const labelMapper = {
  '=': 'Equals to',
  '!=': 'Not Equal to',
  '>': 'Greater than',
  '>=': 'Greater or Equal to',
  '<': 'Lesser than',
  '<=': 'Lesser or Equal to'
}

const getNumberOperators = () =>{
  const operators = getGridNumericColumnOperators();
  operators.forEach(op => op.label = labelMapper[op.label])
  return operators
}

export const extendedNumberOperators = [
    ...getNumberOperators(),
    //This feature is available in mui-v5. Data-grid needs to be migrated.
    /*{
      label: 'Between',
      value: 'between',
      getApplyFilterFn: (filterItem) => {
        if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
          return null;
        }
        if (filterItem.value[0] == null || filterItem.value[1] == null) {
          return null;
        }
        console.log('here');
        return ({ value }) => {
          console.log(value);
          return (
            value !== null &&
            filterItem.value[0] <= value &&
            value <= filterItem.value[1]
          );
        };
      },
      InputComponent: InputNumberInterval,
      //InputComponentProps: { type: 'number' },
    },*/
];