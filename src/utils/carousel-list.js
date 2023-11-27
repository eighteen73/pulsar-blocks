import classnames from 'classnames';

export const CarouselList = ({ children, className, ...props }) => {
	return (
		<div className={classnames('embla__container', className)} {...props}>
			{children}
		</div>
	);
};

export default CarouselList;
