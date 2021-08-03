import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchMoreProducts } from '../../redux/slices/productsSlice';
import Button from '../Button';

import s from './LoadMore.module.scss';

const LoadMore = () => {
	const [itemsNumber, setItemsNumber] = React.useState(12);
	const dispatch = useDispatch();

	const handleLoadMore = () => {
		setItemsNumber(itemsNumber + 12);
		dispatch(fetchMoreProducts(itemsNumber));
	};
	return (
		<Button color="blue" className={s.loadMore} onClick={handleLoadMore}>
			Load more ...
		</Button>
	);
};

export default LoadMore;
