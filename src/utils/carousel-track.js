import { forwardRef } from '@wordpress/element';
import classnames from 'classnames';

export const CarouselTrack = forwardRef(
	({ children, className, ...props }, ref) => {
		return (
			<div
				className={classnames('embla__viewport', className)}
				{...props}
				ref={ref}
			>
				{children}
			</div>
		);
	}
);

export default CarouselTrack;
