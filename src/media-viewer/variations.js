import { Rect, SVG } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'one',
		title: __('One'),
		description: __('One item'),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
			>
				<Rect y="8" width="48" height="32" rx="2" />
			</SVG>
		),
		innerBlocks: [['core/image']],
		scope: ['block'],
		attributes: {
			initialItems: 1,
		},
	},
	{
		name: 'two',
		title: __('Two'),
		description: __('Two items'),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
			>
				<Rect y="8" width="23" height="32" rx="2" />
				<Rect x="25" y="8" width="23" height="32" rx="2" />
			</SVG>
		),
		innerBlocks: [['core/image'], ['core/image']],
		scope: ['block'],
		attributes: {
			initialItems: 2,
		},
	},
	{
		name: 'three',
		title: __('Three'),
		description: __('Three items'),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
			>
				<Rect y="8" width="23" height="32" rx="2" />
				<Rect x="25" y="8" width="23" height="15" rx="2" />
				<Rect x="25" y="25" width="23" height="15" rx="2" />
			</SVG>
		),
		innerBlocks: [['core/image'], ['core/image'], ['core/image']],
		scope: ['block'],
		isDefault: true,
		attributes: {
			initialItems: 3,
		},
	},
	{
		name: 'four',
		title: __('Four'),
		description: __('Four items'),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
			>
				<Rect y="8" width="23" height="18" rx="2" />
				<Rect y="28" width="23" height="12" rx="2" />
				<Rect x="25" y="8" width="23" height="12" rx="2" />
				<Rect x="25" y="22" width="23" height="18" rx="2" />
			</SVG>
		),
		innerBlocks: [
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
		],
		scope: ['block'],
		attributes: {
			initialItems: 4,
		},
	},
	{
		name: 'five',
		title: __('Five'),
		description: __('Five items'),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
			>
				<Rect y="8" width="14.6667" height="18" rx="2" />
				<Rect y="28" width="14.6667" height="12" rx="2" />
				<Rect x="16.6667" y="8" width="14.6667" height="32" rx="2" />
				<Rect x="33.3333" y="8" width="14.6667" height="12" rx="2" />
				<Rect x="33.3333" y="22" width="14.6667" height="18" rx="2" />
			</SVG>
		),
		innerBlocks: [
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
		],
		scope: ['block'],
		attributes: {
			initialItems: 5,
		},
	},
	{
		name: 'six',
		title: __('Six'),
		description: __('Six items'),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
			>
				<Rect y="8" width="14.6667" height="18" rx="2" />
				<Rect y="28" width="14.6667" height="12" rx="2" />
				<Rect
					x="31.3333"
					y="40"
					width="14.6667"
					height="18"
					rx="2"
					transform="rotate(180 31.3333 40)"
				/>
				<Rect
					x="31.3333"
					y="20"
					width="14.6667"
					height="12"
					rx="2"
					transform="rotate(180 31.3333 20)"
				/>
				<Rect
					x="48"
					y="40"
					width="14.6667"
					height="12"
					rx="2"
					transform="rotate(180 48 40)"
				/>
				<Rect
					x="48"
					y="26"
					width="14.6667"
					height="18"
					rx="2"
					transform="rotate(180 48 26)"
				/>
			</SVG>
		),
		innerBlocks: [
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
		],
		scope: ['block'],
		attributes: {
			initialItems: 6,
		},
	},
	{
		name: 'seven',
		title: __('Seven'),
		description: __('Seven items'),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
			>
				<Rect
					x="10.5"
					y="23"
					width="10.5"
					height="15"
					rx="2"
					transform="rotate(180 10.5 23)"
				/>
				<Rect
					x="23"
					y="23"
					width="10.5"
					height="15"
					rx="2"
					transform="rotate(180 23 23)"
				/>
				<Rect
					x="35.5"
					y="23"
					width="10.5"
					height="15"
					rx="2"
					transform="rotate(180 35.5 23)"
				/>
				<Rect
					x="48"
					y="23"
					width="10.5"
					height="15"
					rx="2"
					transform="rotate(180 48 23)"
				/>
				<Rect
					x="14.6667"
					y="40"
					width="14.6667"
					height="15"
					rx="2"
					transform="rotate(180 14.6667 40)"
				/>
				<Rect
					x="31.3333"
					y="40"
					width="14.6667"
					height="15"
					rx="2"
					transform="rotate(180 31.3333 40)"
				/>
				<Rect
					x="48"
					y="40"
					width="14.6667"
					height="15"
					rx="2"
					transform="rotate(180 48 40)"
				/>
			</SVG>
		),
		innerBlocks: [
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
		],
		scope: ['block'],
		attributes: {
			initialItems: 7,
		},
	},
	{
		name: 'eight',
		title: __('Eight'),
		description: __('Eight items'),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
			>
				<Rect
					x="10.5"
					y="23.3333"
					width="10.5"
					height="15.3333"
					rx="2"
					transform="rotate(180 10.5 23.3333)"
				/>
				<Rect
					x="23"
					y="23.3333"
					width="10.5"
					height="15.3333"
					rx="2"
					transform="rotate(180 23 23.3333)"
				/>
				<Rect
					x="35.5"
					y="23.3333"
					width="10.5"
					height="15.3333"
					rx="2"
					transform="rotate(180 35.5 23.3333)"
				/>
				<Rect
					x="48"
					y="23.3333"
					width="10.5"
					height="15.3333"
					rx="2"
					transform="rotate(180 48 23.3333)"
				/>
				<Rect
					x="10.5"
					y="40"
					width="10.5"
					height="15.3333"
					rx="2"
					transform="rotate(180 10.5 40)"
				/>
				<Rect
					x="23"
					y="40"
					width="10.5"
					height="15.3333"
					rx="2"
					transform="rotate(180 23 40)"
				/>
				<Rect
					x="35.5"
					y="40"
					width="10.5"
					height="15.3333"
					rx="2"
					transform="rotate(180 35.5 40)"
				/>
				<Rect
					x="48"
					y="40"
					width="10.5"
					height="15.3333"
					rx="2"
					transform="rotate(180 48 40)"
				/>
			</SVG>
		),
		innerBlocks: [
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
			['core/image'],
		],
		scope: ['block'],
		attributes: {
			initialItems: 8,
		},
	},
];

export default variations;
