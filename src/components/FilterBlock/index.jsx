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
import s from "./FilterBlock.module.scss";
import SelectInput from "../SelectInput/SelectInput";
import {
  fetchProducts,
  resetToInitialProducts,
} from "../../redux/slices/productsSlice";

const options = [
  { value: "popular", label: "Popular" },
  { value: "latest", label: "New" },
];

//TODO при скиданні категорій витягувати продукти з редаксу, а не фетчити
const FilterBlock = () => {
  const dispatch = useDispatch();
  const [input, setInput] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const { activeCategory, activeSortBy, categories } = useSelector(
    (state) => state.filter
  );
  const isSelectShow = !focused && input.length === 0;
  React.useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const handleCategory = (value) => {
    dispatch(chooseCategory(value));
    dispatch(fetchProductsByCategory());
  };

  const handleSortBy = (value) => {
    dispatch(chooseSortBy(value));
    dispatch(fetchProducts());
  };

  const handleSearch = React.useCallback(
    (text) => {
      const value = text.toLowerCase();
      dispatch(changeSearchValue(value));

      dispatch(fetchProductsBySearch());
    },
    [dispatch]
  );

  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => setFocused(false);
  React.useEffect(() => {
    if (input.length >= 3) {
      const timeout = setTimeout(() => {
        handleSearch(input);
      }, 300);

      return () => clearTimeout(timeout);
    }

    if (input.length === 0) {
      dispatch(resetToInitialProducts());
    }
  }, [input, handleSearch, dispatch]);
  return (
    <div className={s.filterBlock}>
      <div className={s.search}>
        <input
          type="text"
          placeholder="Search products by name"
          onFocus={onFocus}
          onBlur={onBlur}
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
              defaultValue={activeCategory}
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
              defaultValue={activeSortBy}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FilterBlock;
