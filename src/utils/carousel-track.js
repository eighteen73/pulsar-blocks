import classnames from 'classnames';

export const CarouselTrack = ({ children, className, ...props }) => {
	return (
		<div className={classnames('splide__track', className)} {...props}>
			{children}
		</div>
	);
};

export default CarouselTrack;
