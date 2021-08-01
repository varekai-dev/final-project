import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronIcon, SearchIcon } from "../../assets/icons";
import { fetchCategories } from "../../redux/slices/filterSlice";

import s from "./FilterBlock.module.scss";

const sortBy = ["Popular", "New"];

const FilterBlock = () => {
  const dispatch = useDispatch();
  const categoeries = useSelector((state) => state.filter.categories);
  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className={s.filterBlock}>
      <div className={s.search}>
        <input type="text" placeholder="Search products by name" />
        <i className={s.searchIcon}>
          <SearchIcon />
        </i>
      </div>
      <div className={s.select}>
        <select name="slct">
          <option selected disabled>
            Choose Category
          </option>
          {categoeries.map((categorie) => (
            <option value={categorie.name} key={categorie.id}>
              {categorie.name}
            </option>
          ))}
        </select>
        <ChevronIcon />
      </div>
      <div className={`${s.select} ${s.sort}`}>
        <select name="slct">
          <option selected disabled>
            Sorting
          </option>
          {sortBy.map((sort, index) => (
            <option value={index + 1} key={index}>
              {sort}
            </option>
          ))}
        </select>
        <ChevronIcon />
      </div>
    </div>
  );
};

export default FilterBlock;
