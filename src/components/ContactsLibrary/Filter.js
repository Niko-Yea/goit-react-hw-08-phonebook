import { useDispatch } from 'react-redux'
import filterAction from '../../redux/filter/filter-actions'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  input: {
    '& .MuiFormLabel-root': {
      color: '#8eacbb',
    },
    '& .MuiInputBase-root': {
      color: '#607d8b',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #8eacbb',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #34515e',
    },
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}))

const Filter = () => {
  const dispatch = useDispatch()
  const onChange = e => dispatch(filterAction.changeFilter(e.target.value))
  const classes = useStyles()

  return (
    <form className={classes.form}>
      <TextField
        color="secondary"
        variant="standard"
        margin="normal"
        required
        fullWidth
        id="filter"
        label="Filter your contacts"
        name="filter"
        onChange={onChange}
        autoFocus
        className={classes.input}
      />
    </form>
  )
}

export default Filter
