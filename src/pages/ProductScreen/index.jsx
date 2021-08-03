import React from 'react';
import HomeScreen from '../HomeScreen';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../../redux/slices/singleProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductPopup from '../../components/ProductPopup';

const ProductScreen = () => {
	const dispatch = useDispatch();
	let { id } = useParams();
	const product = useSelector((state) => state.singleProduct.product);
	React.useEffect(() => {
		dispatch(fetchSingleProduct(id));
	}, [id, dispatch]);
	return (
		<>
			<HomeScreen />
			{product && <ProductPopup product={product} />}
		</>
	);
};

export default ProductScreen;
