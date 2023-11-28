import { forwardRef } from '@wordpress/element';
import classnames from 'classnames';

export const CarouselSlide = forwardRef(
	({ children, className, ...props }, ref) => {
		return (
			<li
				className={classnames('embla__slide', className)}
				ref={ref}
				{...props}
			>
				{children}
			</li>
		);
	}
);

export default CarouselSlide;
