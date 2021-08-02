import React from 'react';
import Popup from '../Popup';
import { useLocation } from 'react-router-dom';
import s from './ProductPopup.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct } from '../../redux/slices/singleProductSlice';

const ProductPopup = () => {
	const dispatch = useDispatch();
	const singleProduct = useSelector((state) => state.singleProduct.product);

	const address = useLocation();
	console.log(address);
	React.useEffect(() => {
		if (!singleProduct) {
			dispatch(fetchSingleProduct());
		}
	}, [dispatch, singleProduct]);
	return (
		<Popup>
			<div className={s.product}></div>
		</Popup>
	);
};

export default ProductPopup;
