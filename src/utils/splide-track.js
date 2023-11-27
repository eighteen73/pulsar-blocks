import classnames from 'classnames';

export const SplideTrack = ({ children, className, ...props }) => {
	return (
		<div className={classnames('splide__track', className)} {...props}>
			{children}
		</div>
	);
};

export default SplideTrack;
