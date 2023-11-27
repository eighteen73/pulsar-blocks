import classnames from 'classnames';

export const CarouselList = ({ children, className, ...props }) => {
	return (
		<ul className={classnames('splide__list', className)} {...props}>
			{children}
		</ul>
	);
};

export default CarouselList;
