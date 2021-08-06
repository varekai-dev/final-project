import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoreProducts } from '../../redux/slices/productsSlice';
import Button from '../Button';

import s from './LoadMore.module.scss';

const LoadMore = () => {
	const limit = useSelector((state) => state.products.limit);
	const [itemsNumber, setItemsNumber] = React.useState(limit);
	const dispatch = useDispatch();
	const handleLoadMore = () => {
		setItemsNumber(itemsNumber + limit);
		dispatch(fetchMoreProducts(itemsNumber));
	};
	return (
		<Button color="blue" className={s.loadMore} onClick={handleLoadMore}>
			Load more ...
		</Button>
	);
};

export default LoadMore;
