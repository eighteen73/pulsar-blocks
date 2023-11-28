import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

export const CarouselPagination = ({ pages, selected, onClick, ...props }) => {
	return (
		<ul className="embla__pagination" {...props}>
			{pages.map((page, index) => (
				<li key={index} className="embla__pagination-item">
					<button
						onClick={onClick(index)}
						className={classnames('embla__pagination-button', {
							isActive: index === selected,
						})}
						aria-label={__('Go to slide') + ` ${index + 1}`}
					></button>
				</li>
			))}
		</ul>
	);
};

export default CarouselPagination;
