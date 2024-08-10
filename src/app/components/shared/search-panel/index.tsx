import { FormEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../store';
import { setSearchValue } from '../../../../store/filter/filter.slice';

import './style.scss';

const INPUT_PLACEHOLDER = 'Введите поисковый запрос';
const SEARCH_BUTTON_TEXT = 'Искать';

export const SearchPanel = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setSearchValue(value));
  };

  return (
    <form className="search-panel" onSubmit={handleSearch}>
      <TextField
        placeholder={INPUT_PLACEHOLDER}
        fullWidth
        variant="outlined"
        className="search-panel__input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit" variant="contained">
        {SEARCH_BUTTON_TEXT}
      </Button>
    </form>
  );
};
