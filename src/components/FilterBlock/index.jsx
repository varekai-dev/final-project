import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookmarkIcon, List2Icon, SearchIcon } from "../../assets/icons";
import {
  changeSearchValue,
  chooseCategory,
  chooseSortBy,
  fetchCategories,
  fetchProductsByCategory,
  fetchProductsBySearch,
} from "../../redux/slices/filterSlice";
import { DebounceInput } from "react-debounce-input";
import s from "./FilterBlock.module.scss";
import SelectInput from "../SelectInput/SelectInput";
import { fetchProducts } from "../../redux/slices/productsSlice";

const options = [
  { value: "popular", label: "Popular" },
  { value: "latest", label: "New" },
];

const FilterBlock = () => {
  const dispatch = useDispatch();
  const [focused, setFocused] = React.useState(false);
  const { activeCategory, activeSortBy, categories, searchValue } = useSelector(
    (state) => state.filter
  );

  const isSelectShow = !focused && searchValue.length === 0;
  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategory = (value) => {
    dispatch(chooseCategory(value));
    dispatch(fetchProductsByCategory());
  };

  const handleSortBy = (value) => {
    dispatch(chooseSortBy(value));
    dispatch(fetchProducts());
  };

  const handleSearch = (text) => {
    const value = text.toLowerCase();
    dispatch(changeSearchValue(value));

    dispatch(fetchProductsBySearch());

    if (value.length === 0) {
      dispatch(fetchProducts());
    }
  };

  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => setFocused(false);

  React.useEffect(() => {
    if (activeCategory === null) {
      dispatch(fetchProducts());
    }
  }, [activeCategory, dispatch]);

  return (
    <div className={s.filterBlock}>
      <div className={s.search}>
        <DebounceInput
          minLength={3}
          debounceTimeout={300}
          type="text"
          placeholder="Search products by name"
          onFocus={onFocus}
          onBlur={onBlur}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <i className={s.searchIcon}>
          <SearchIcon />
        </i>
      </div>
      {isSelectShow && (
        <>
          <div className={s.select}>
            <SelectInput
              options={categories}
              icon={<List2Icon />}
              value={activeCategory}
              onChange={handleCategory}
              placeholder="Choose Category"
            />
          </div>
          <div className={`${s.select} ${s.sort}`}>
            <SelectInput
              options={options}
              icon={<BookmarkIcon />}
              value={activeSortBy}
              placeholder="Sorting"
              onChange={handleSortBy}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FilterBlock;
