import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterBlock from '../../components/FilterBlock';
import LoadMore from '../../components/LoadMore';
import ProductsList from '../../components/ProductsList/ProductsList';
import { setActivePopup } from '../../redux/slices/popupSlice';
import { fetchProducts } from '../../redux/slices/productsSlice';

import s from './HomeScreen.module.scss';

const HomeScreen = () => {
	const products = useSelector((state) => state.products.productsList);
	const searchValue = useSelector((state) => state.filter.searchValue);
	const isProductsExistBySearch = searchValue.length > 0 && products.length === 0;
	const dispatch = useDispatch();

	const showLoadMore = products.length > 0 && products.length % 12 === 0;
	React.useEffect(() => {
		if (products.length === 0) {
			dispatch(fetchProducts());
		}

		dispatch(setActivePopup(''));
	}, [dispatch]);

	return (
		<div className={s.homeScreen}>
			<FilterBlock />
			<ProductsList products={products} />
			{showLoadMore && <LoadMore />}
			{isProductsExistBySearch && (
				<div className={s.noResultBySearch}>
					<h2>No Results Found</h2>
					<p>We did not find any article that matches this search Make sure that the search text is entered correctly Try using other search criteria</p>
				</div>
			)}
		</div>
	);
};

export default HomeScreen;
