import React, { useState } from 'react';
import {
  SearchbarWrapper,
  Form,
  Button,
  Input,
  ButtonLabel,
} from './Searchbar.style';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  return (
    <SearchbarWrapper>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </Form>
    </SearchbarWrapper>
  );
}

export default Searchbar;
