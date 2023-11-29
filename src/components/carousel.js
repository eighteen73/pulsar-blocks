import { forwardRef } from '@wordpress/element';
import classnames from 'classnames';

export const Carousel = forwardRef(
	({ children, className, hasList, ...props }, ref) => {
		return (
			<section
				className={classnames('splide', className)}
				ref={ref}
				{...props}
			>
				<div className="splide__track">
					{hasList ? (
						<ul className="splide__list">{children}</ul>
					) : (
						children
					)}
				</div>
			</section>
		);
	}
);

export default Carousel;
