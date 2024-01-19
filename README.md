# Pulsar Blocks

<p>
  <strong>A collection of blocks we use at eighteen73.</strong>
</p>

## Block list

### [Accordion](/src/accordion/)
An accessible accordion, supporting multiple open items, initially open first item and FAQs schema support.

### Attributes
- openMultiple
- startOpen
- level
- hasSchema

### [Carousel](/src/carousel/)

A [Splide](https://splidejs.com) powered carousel with innerBlocks support.

By default this uses a `pulsar/carousel-slide` innerBlock. However the block can be extended to be the foundation of any type of carousel block via the use of variations and custom child blocks.

### Attributes

- carouselOptions
- advancedCarouselOptions
- mergeOptions
- ariaLabel
- hasTrack
- template
- templateLock
- allowedBlocks

### Extending the carousel block

The carousel should be powerful and flexible enough to be extended via variations.

Here is a short example of the steps required:

#### 1. Register a variation

Lets assume we want to create a carousel that displays the latest posts. The important parts here are that we set `hasTrack` to `false` (so that we can wrap the posts in the child block), the `template` and `templateLock`.

```
import domReady from '@wordpress/dom-ready';
import { registerBlockVariation } from '@wordpress/blocks';

domReady(() => {
	registerBlockVariation('pulsar/carousel', {
		name: 'carousel-posts',
		title: 'Posts Carousel',
		attributes: {
			templateLock: 'all',
			hasTrack: false,
			template: [['pulsar/posts', {}]],
		},
		isActive: ['template'],
	});
});
```

#### 2. Create a child block to be used as the template

```

// Barebones example of the pulsar/posts child block edit function.
// Markup must include `splide__track` and `splide__list`.

import { useBlockProps } from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {
	const blockProps = useBlockProps({ className: 'splide__track' });

	return (
		<div {...blockProps}>
			<ul className="splide__list">
				// Your block content here
			</ul>
		</div>
	);
}
```

## Filters

### Carousel

```php
pulsar_blocks\carousel\force_carousel
```

The carousel contains logic to disable carousel functionality if the total number of slides is equal or less than the number of slides per page.
Use this filter if you would like to enable/disable this behaviour.

Example:

```php
add_filter( 'pulsar_blocks\carousel\force_carousel', '__return_true' );
```
