import { useDispatch, useSelector } from 'react-redux';
import filterAction from '../../redux/filter/filter-actions';
import contactsSelector from "../../redux/filter/contactsSelector";
import styles from './styles..module.scss';

const Filter = () => {
  const dispatch = useDispatch();
  const value = useSelector(state => contactsSelector.getFilterState(state));
  const onChange = e => dispatch(filterAction.changeFilter(e.target.value))

  return (
    <form className={styles.form}>
      <label className={styles.label}>
        <input
          placeholder='Find contact by name'
          type='text'
          name='filter'
          value={value}
          onChange={onChange}
        />
      </label>
    </form>
  );
}

export default Filter;

