import React from 'react';

import s from './Counter.module.scss';

const Counter = ({ decreaseCount, increaseCount, count }) => {
	return (
		<div className={s.counter}>
			<button className={s.counterButton} onClick={decreaseCount}>
				-
			</button>
			<span className={s.count}>{count}</span>
			<button className={s.counterButton} onClick={increaseCount}>
				+
			</button>
		</div>
	);
};

export default Counter;
