import classnames from 'classnames';

export const CarouselTrack = ({ children, className, ...props }) => {
	return (
		<div className={classnames('embla__viewport', className)} {...props}>
			{children}
		</div>
	);
};

export default CarouselTrack;
