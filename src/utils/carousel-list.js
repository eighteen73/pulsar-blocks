import classnames from 'classnames';

export const CarouselList = ({ children, className, ...props }) => {
	return (
		<ul className={classnames('embla__container', className)} {...props}>
			{children}
		</ul>
	);
};

export default CarouselList;
