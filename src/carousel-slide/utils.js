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

export const IMAGE_BACKGROUND_TYPE = 'image';
export const VIDEO_BACKGROUND_TYPE = 'video';
export const COVER_MIN_HEIGHT = 50;
export const COVER_MAX_HEIGHT = 1000;
export const COVER_DEFAULT_HEIGHT = 300;
export const DEFAULT_FOCAL_POINT = { x: 0.5, y: 0.5 };
export const ALLOWED_MEDIA_TYPES = ['image', 'video'];

export function mediaPosition({ x, y } = DEFAULT_FOCAL_POINT) {
	return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
}

export function dimRatioToClass(ratio) {
	return ratio === 50 || !ratio === undefined
		? null
		: 'has-background-dim-' + 10 * Math.round(ratio / 10);
}

/**
 * Retrieves the className for the current contentPosition.
 *
 * @param {string} contentPosition The current content position.
 * @return {string} The className assigned to the contentPosition.
 */
export function getPositionClassName(contentPosition) {
	return POSITION_CLASSNAMES[contentPosition];
}

import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

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
