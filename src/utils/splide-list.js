import classnames from 'classnames';

export const SplideList = ({ children, className, ...props }) => {
	return (
		<ul className={classnames('splide__list', className)} {...props}>
			{children}
		</ul>
	);
};

export default SplideList;
