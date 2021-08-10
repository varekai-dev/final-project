import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterBlock from '../../components/FilterBlock';
import LoadMore from '../../components/LoadMore';
import Notification from '../../components/Notification';
import ProductsList from '../../components/ProductsList/ProductsList';
import { fetchProducts } from '../../redux/slices/productsSlice';

import s from './HomeScreen.module.scss';

const HomeScreen = () => {
	const { activeCategory } = (state) => state.filter;
	const { productsList: products, limit } = useSelector((state) => state.products);
	const searchValue = useSelector((state) => state.filter.searchValue);
	const isProductsExistBySearch = searchValue.length > 0 && products.length === 0;
	const dispatch = useDispatch();
	const showLoadMore = products.length > 0 && products.length % limit === 0;
	const noItemsInCategory = activeCategory !== null && products.length === 0 && searchValue.length === 0;
	React.useEffect(() => {
		if (products.length === 0 && searchValue.length === 0) {
			dispatch(fetchProducts());
		}
	}, [dispatch, products, searchValue]);
	return (
		<div className="container">
			<div className={s.homeScreen}>
				<Notification />
				<FilterBlock />
				<ProductsList products={products} />
				{showLoadMore && <LoadMore />}
				{isProductsExistBySearch && (
					<div className={s.noResult}>
						<h2>No Results Found</h2>
						<p>We did not find any article that matches this search Make sure that the search text is entered correctly Try using other search criteria</p>
					</div>
				)}
				{noItemsInCategory && (
					<div className={s.noResult}>
						<h2>No items in this category yet</h2>
					</div>
				)}
			</div>
		</div>
	);
};

export default HomeScreen;
