/**
 * WordPress dependencies
 */
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';
import { Popover, VisuallyHidden } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { useMemo, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';

/**
 * Given the Link block's type attribute, return the query params to give to
 * /wp/v2/search.
 *
 * @param {string} type Link block's type attribute.
 * @param {string} kind Link block's entity of kind (post-type|taxonomy)
 * @return {{ type?: string, subtype?: string }} Search query params.
 */
export function getSuggestionsQuery(type, kind) {
	switch (type) {
		case 'post':
		case 'page':
			return { type: 'post', subtype: type };
		case 'category':
			return { type: 'term', subtype: 'category' };
		case 'tag':
			return { type: 'term', subtype: 'post_tag' };
		case 'post_format':
			return { type: 'post-format' };
		default:
			if (kind === 'taxonomy') {
				return { type: 'term', subtype: type };
			}
			if (kind === 'post-type') {
				return { type: 'post', subtype: type };
			}
			return {
				// for custom link which has no type
				// always show pages as initial suggestions
				initialSuggestionsSearchOptions: {
					type: 'post',
					subtype: 'page',
					perPage: 20,
				},
			};
	}
}

export function LinkUI(props) {
	const [showBackdrop, setShowBackdrop] = useState(true);

	const { label, url, opensInNewTab, type, kind } = props.link;

	// Memoize link value to avoid overriding the LinkControl's internal state.
	// This is a temporary fix. See https://github.com/WordPress/gutenberg/issues/50976#issuecomment-1568226407.
	const link = useMemo(
		() => ({
			url,
			opensInNewTab,
			title: label && stripHTML(label),
		}),
		[label, opensInNewTab, url]
	);

	const dialogTitleId = useInstanceId(LinkUI, `link-ui-link-control__title`);
	const dialogDescritionId = useInstanceId(
		LinkUI,
		`link-ui-link-control__description`
	);

	return (
		<>
			{showBackdrop && (
				<div
					className="components-popover-pointer-events-trap"
					aria-hidden="true"
					onClick={() => setShowBackdrop(false)}
				/>
			)}
			<Popover
				placement="bottom"
				onClose={props.onClose}
				anchor={props.anchor}
				shift
			>
				<div
					role="dialog"
					aria-labelledby={dialogTitleId}
					aria-describedby={dialogDescritionId}
				>
					<VisuallyHidden>
						<h2 id={dialogTitleId}>{__('Add link')}</h2>

						<p id={dialogDescritionId}>
							{__(
								'Search for and add a link to your Navigation.'
							)}
						</p>
					</VisuallyHidden>
					<LinkControl
						hasTextControl
						hasRichPreviews
						value={link}
						showInitialSuggestions
						noDirectEntry={!!type}
						noURLSuggestion={!!type}
						suggestionsQuery={getSuggestionsQuery(type, kind)}
						onChange={props.onChange}
						onRemove={props.onRemove}
						onCancel={props.onCancel}
					/>
				</div>
			</Popover>
		</>
	);
}
