import { SVG, Path, Polygon, G, Rect } from '@wordpress/components';

export const LinkedCarousels = (
	<SVG
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		fillRule="evenodd"
		strokeLinejoin="round"
		strokeMiterlimit="2"
		clipRule="evenodd"
		viewBox="0 0 24 24"
	>
		<Path d="M18.003 19.399H5.931a.11.11 0 0 0-.11.11v1.537c0 .06.049.11.11.11h12.072a.11.11 0 0 0 .11-.11v-1.537a.11.11 0 0 0-.11-.11ZM5.931 18.082c-.788 0-1.427.639-1.427 1.427v1.537c0 .788.639 1.427 1.427 1.427h12.072c.789 0 1.427-.639 1.427-1.427v-1.537c0-.788-.638-1.427-1.427-1.427H5.931Z" />
		<Path
			fillRule="nonzero"
			d="M17.837 3.191v11.647H6.19V3.191h11.647Zm0-1.664H6.19c-.915 0-1.663.749-1.663 1.664v11.647c0 .915.748 1.663 1.663 1.663h11.647c.915 0 1.664-.748 1.664-1.663V3.191a1.67 1.67 0 0 0-1.664-1.664Z"
		/>
		<Path
			fillRule="nonzero"
			d="m13.794 9.014-2.496 3.132-1.78-2.096-2.496 3.124h9.983l-3.211-4.16Z"
		/>
		<Path d="M7.022 6.519h9.983v.832H7.022zM7.022 4.855h9.983v.832H7.022z" />
		<Path
			fillRule="nonzero"
			d="M22.476 9.014 19.98 11.51V6.519l2.496 2.495ZM1.524 9.014 4.02 6.519v4.991L1.524 9.014Z"
		/>
	</SVG>
);

export const Carousel = (
	<SVG
		className="icon-carousel"
		width="26px"
		height="18px"
		viewBox="0 0 26 18"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<G strokeWidth="1">
			<G transform="translate(0.000000, -3.000000)">
				<Path
					d="M20,5 L20,19 L6,19 L6,5 L20,5 L20,5 Z M20,3 L6,3 C4.9,3 4,3.9 4,5 L4,19 C4,20.1 4.9,21 6,21 L20,21 C21.1,21 22,20.1 22,19 L22,5 C22,3.9 21.1,3 20,3 Z"
					fillRule="nonzero"
				></Path>
				<Polygon
					fillRule="nonzero"
					points="15.14 12 12.14 15.7645914 10 13.2451362 7 17 19 17"
				></Polygon>
				<Rect x="7" y="9" width="12" height="1"></Rect>
				<Rect x="7" y="7" width="12" height="1"></Rect>
				<Polygon
					transform="translate(24.500000, 12.000000) rotate(-270.000000) translate(-24.500000, -12.000000) "
					points="24.5 10.5 27.5 13.5 21.5 13.5"
				></Polygon>
				<Polygon
					transform="translate(1.500000, 12.000000) rotate(-90.000000) translate(-1.500000, -12.000000) "
					points="1.5 10.5 4.5 13.5 -1.5 13.5"
				></Polygon>
			</G>
		</G>
	</SVG>
);

export const CarouselSlide = (
	<SVG
		className="icon-carousel-slide"
		width="26px"
		height="18px"
		viewBox="0 0 26 18"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<G strokeWidth="1">
			<G transform="translate(0.000000, -3.000000)">
				<Path
					d="M20,5 L20,19 L6,19 L6,5 L20,5 L20,5 Z M20,3 L6,3 C4.9,3 4,3.9 4,5 L4,19 C4,20.1 4.9,21 6,21 L20,21 C21.1,21 22,20.1 22,19 L22,5 C22,3.9 21.1,3 20,3 Z"
					fillRule="nonzero"
				></Path>
				<Polygon
					fillRule="nonzero"
					points="15.14 12 12.14 15.7645914 10 13.2451362 7 17 19 17"
				></Polygon>
				<Rect x="7" y="9" width="12" height="1"></Rect>
				<Rect x="7" y="7" width="12" height="1"></Rect>
			</G>
		</G>
	</SVG>
);

export const Accordion = (
	<SVG
		fill="none"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
	>
		<Path
			clipRule="evenodd"
			d="m19 7c0-.27614-.2239-.5-.5-.5h-13c-.27614 0-.5.22386-.5.5v4.5c0 .2761.22386.5.5.5h13c.2761 0 .5-.2239.5-.5zm-.125 10h-13.75c-.06904 0-.125.056-.125.125v1.75c0 .069.05596.125.125.125h13.75c.069 0 .125-.056.125-.125v-1.75c0-.069-.056-.125-.125-.125zm-13.75-13.5c-.89746 0-1.625.72754-1.625 1.625v6.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-6.75c0-.89746-.7275-1.625-1.625-1.625zm0 12c-.89746 0-1.625.7275-1.625 1.625v1.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-1.75c0-.8975-.7275-1.625-1.625-1.625z"
			fill="currentColor"
			fillRule="evenodd"
		></Path>
	</SVG>
);

export const AccordionItem = (
	<SVG
		fill="none"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
	>
		<Path
			d="m19 9c0-.27614-.2239-.5-.5-.5h-13c-.27614 0-.5.22386-.5.5v7.5c0 .2761.22386.5.5.5h13c.2761 0 .5-.2239.5-.5zm-13.875-3.5c-.89746 0-1.625.72754-1.625 1.625v9.75c0 .8975.72754 1.625 1.625 1.625h13.75c.8975 0 1.625-.7275 1.625-1.625v-9.75c0-.89746-.7275-1.625-1.625-1.625z"
			fill="currentColor"
			fillRule="evenodd"
		></Path>
	</SVG>
);

export default {
	LinkedCarousels,
	Carousel,
	CarouselSlide,
	Accordion,
	AccordionItem,
};
