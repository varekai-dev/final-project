import React from 'react';

const CloseIcon = ({ width = 20, height = 20, fill = '#707070' }) => {
	return (
		<svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
			<path d="M20 2.01429L17.9857 0L10 7.98572L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429Z" />
		</svg>
	);
};

export default CloseIcon;
