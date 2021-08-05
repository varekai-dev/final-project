import React, { forwardRef } from 'react';
import clsx from 'clsx';
import s from './SelectWithPlaceholder.module.scss';
import { ChevronIcon, CloseIcon } from '../../../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../../../redux/slices/ordersSlice';

const SelectWithPlaceholder = forwardRef(({ helperText, error, name, label }, ref) => {
	const [isOpen, setOpen] = React.useState(false);
	const wrapperRef = React.useRef(null);
	const dispatch = useDispatch();
	const countries = useSelector((state) => state.orders.countries);
	const [selectedItem, setSelectedItem] = React.useState('');
	const toggleDropdown = () => {
		setOpen(!isOpen);
	};
	const handleItemClick = (id) => {
		selectedItem === id ? setSelectedItem(null) : setSelectedItem(countries[id].label);
	};

	const handleClickOutside = (event) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			setOpen(false);
		}
	};

	React.useEffect(() => {
		document.addEventListener('click', handleClickOutside, false);
		return () => {
			document.removeEventListener('click', handleClickOutside, false);
		};
	}, []);
	React.useEffect(() => {
		dispatch(fetchCountries());
	}, [dispatch]);
	const handleClose = (e) => {
		e.stopPropagation();
		setSelectedItem('');
	};

	return (
		<>
			<div className={s.dropdown}>
				<div className={s.dropdownHeader} onClick={toggleDropdown} ref={wrapperRef}>
					<label className={clsx(s.label, selectedItem && s.labelActive)}>{label}</label>
					<input ref={ref} value={selectedItem} readOnly name={name} />

					{!selectedItem ? (
						<i className={s.icon}>
							<ChevronIcon />
						</i>
					) : (
						<i onClick={handleClose} className={s.icon}>
							<CloseIcon width="16" height="16" />
						</i>
					)}
				</div>
				<div className={`${s.dropdownBody} ${isOpen && s.open}`}>
					{countries &&
						countries.map((item, index) => (
							<div id={index} className={s.dropdownItem} onClick={(e) => handleItemClick(e.target.id)} key={item.value}>
								{item.label}
							</div>
						))}
				</div>
			</div>
			{error && <span>{helperText}</span>}
		</>
	);
});

export default SelectWithPlaceholder;
