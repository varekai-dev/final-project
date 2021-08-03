import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CloseIcon } from '../../assets/icons';
import Button from '../Button';
import Popup from '../Popup';
import s from './ProductPopup.module.scss';

const ProductPopup = ({ product }) => {
	const [count, setCount] = React.useState(1);
	const { title, favorite, price, picture, description } = product;
	console.log(favorite);
	const history = useHistory();
	const increaseCount = () => {
		setCount((prev) => prev + 1);
	};
	const decreaseCount = () => {
		if (count === 1) {
			return;
		}
		setCount((prev) => prev - 1);
	};
	return (
		<Popup>
			<div className={s.product}>
				<div className={s.productWrapper}>
					<i className="close-btn" onClick={() => history.push('/')}>
						<CloseIcon width="18" height="18" />
					</i>
					<div className={s.content}>
						<div className={s.image}>
							<img src={picture} alt={title} />
						</div>
						<div className={s.description}>
							<h2>{title}</h2>
							<p>{description}</p>
							<div className={s.price}>
								<span>PRICE</span>
								<span>${price}</span>
							</div>
							<div className={s.counter}>
								<button className={s.counterButton} onClick={decreaseCount}>
									-
								</button>
								<span className={s.count}>{count}</span>
								<button className={s.counterButton} onClick={increaseCount}>
									+
								</button>
							</div>
							<div className={s.items}>
								<span>Items:</span>
								<span>{count}</span>
							</div>
							<div className={s.items}>
								<span>Total: </span>
								<span>${count * price}</span>
							</div>
						</div>
					</div>
					<div className={s.buttons}>
						<Button color="transparent">ADD TO CART</Button>
						<Button color={favorite ? 'orange' : 'transparent'} className={clsx(favorite && s.favorite)}>
							ADD TO FAVORITES
						</Button>
						<Button color="orange">BUY NOW</Button>
					</div>
				</div>
			</div>
		</Popup>
	);
};

export default ProductPopup;
