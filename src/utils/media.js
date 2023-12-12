import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

const POSITION_CLASSNAMES = {
	'top left': 'is-position-top-left',
	'top center': 'is-position-top-center',
	'top right': 'is-position-top-right',
	'center left': 'is-position-center-left',
	'center center': 'is-position-center-center',
	'center right': 'is-position-center-right',
	'bottom left': 'is-position-bottom-left',
	'bottom center': 'is-position-bottom-center',
	'bottom right': 'is-position-bottom-right',
};

/**
 * Retrieves the className for the current contentPosition.
 *
 * @param {string} contentPosition The current content position.
 * @return {string} The className assigned to the contentPosition.
 */
export function getPositionClassName(contentPosition) {
	return POSITION_CLASSNAMES[contentPosition];
}

/**
 * Fetch a media item and return its details.
 * @param {number} id the ID of the image
 */
export function useMedia(id) {
	return useSelect(
		(select) => {
			const { getMedia, isResolving, hasFinishedResolution } =
				select(coreStore);

			const mediaParameters = [id, { context: 'view' }];

			return {
				media: getMedia(...mediaParameters),
				isResolvingMedia: isResolving('getMedia', mediaParameters),
				hasResolvedMedia: hasFinishedResolution(
					'getMedia',
					mediaParameters
				),
			};
		},
		[id]
	);
}
