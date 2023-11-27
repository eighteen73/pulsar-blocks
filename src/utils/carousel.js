import { forwardRef } from '@wordpress/element';
import classnames from 'classnames';

export const Carousel = forwardRef(
	({ children, className, ariaLabel, ...props }, ref) => {
		return (
			<section
				className={classnames('embla', className)}
				ref={ref}
				aria-label={ariaLabel}
				{...props}
			>
				{children}
			</section>
		);
	}
);

export default Carousel;
