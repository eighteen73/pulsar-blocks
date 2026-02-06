import { __ } from '@wordpress/i18n';
import { loop } from '@wordpress/icons';

import { Accordion } from '../components/icons';

const variations = [
	{
		name: 'default',
		title: __('Accordion', 'pulsar-blocks'),
		description: __(
			'Create an accordion with manually added items',
			'pulsar-blocks'
		),
		isDefault: true,
		scope: ['block'],
		icon: Accordion,
		innerBlocks: [
			[
				'pulsar/accordion-item',
				{},
				[
					[
						'core/paragraph',
						{
							placeholder: __('Add content…', 'pulsar-blocks'),
						},
					],
				],
			],
		],
	},
	{
		name: 'query',
		title: __('Query', 'pulsar-blocks'),
		description: __(
			'Create an accordion from a query loop (e.g., FAQs)',
			'pulsar-blocks'
		),
		scope: ['block'],
		icon: loop,
		innerBlocks: [
			[
				'core/query',
				{
					query: {
						perPage: 10,
						pages: 0,
						offset: 0,
						postType: 'post',
						order: 'desc',
						orderBy: 'date',
						author: '',
						search: '',
						exclude: [],
						sticky: '',
						inherit: true,
					},
				},
				[
					[
						'core/post-template',
						{},
						[
							[
								'pulsar/accordion-item',
								{},
								[
									[
										'core/paragraph',
										{
											placeholder: __(
												'Add content…',
												'pulsar-blocks'
											),
										},
									],
								],
							],
						],
					],
				],
			],
		],
	},
];

export default variations;
