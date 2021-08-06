import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LikeIcon } from '../../assets/icons';
import { addProductToFavorite, removeProductFromFavorite } from '../../redux/slices/favoritesSlice';
import { setActivePopup, setActiveProduct } from '../../redux/slices/popupSlice';
import s from './ProductItem.module.scss';

const ProductItem = ({ id, picture, price, favorite, title }) => {
	const user = useSelector((state) => state.user.userData);
	const dispatch = useDispatch();
	const toogleFavorite = (e) => {
		e.stopPropagation();
		if (user) {
			if (!favorite) {
				dispatch(addProductToFavorite(id));
			} else {
				dispatch(removeProductFromFavorite(id));
			}
		} else {
			dispatch(setActivePopup('guestPopup'));
		}
	};

	const openProduct = () => {
		dispatch(setActiveProduct(id));
		dispatch(setActivePopup('product'));
	};
	return (
		<div className={s.productItem}>
			<div className={s.productImage} onClick={openProduct}>
				<img src={picture} alt={price} height="147" />

				<div className={s.productFavorite}>
					<LikeIcon onClick={toogleFavorite} favorite={favorite} width="22" height="22" className={s.productIcon} />
				</div>
			</div>

			<div className={s.description}>
				<div className={s.title}>{title}</div>
				<div className={s.price}>${price}</div>
			</div>
		</div>
	);
};

export default ProductItem;
