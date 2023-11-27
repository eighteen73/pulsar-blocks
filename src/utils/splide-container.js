import { forwardRef } from '@wordpress/element';
import classnames from 'classnames';

export const SplideContainer = forwardRef(
	({ children, className, ariaLabel, ...props }, ref) => {
		return (
			<section
				className={classnames('splide', className)}
				ref={ref}
				aria-label={ariaLabel}
				{...props}
			>
				{children}
			</section>
		);
	}
);

export default SplideContainer;
