import { forwardRef } from '@wordpress/element';
import classnames from 'classnames';

export const SplideSlide = forwardRef(
	({ children, className, ...props }, ref) => {
		return (
			<li
				className={classnames('splide__slide', className)}
				ref={ref}
				{...props}
			>
				{children}
			</li>
		);
	}
);

export default SplideSlide;
