/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Button, Tooltip, VisuallyHidden } from '@wordpress/components';
import { forwardRef } from '@wordpress/element';
import { _x, sprintf } from '@wordpress/i18n';
import { create } from '@wordpress/icons';
import { Inserter } from '@wordpress/block-editor';

function ButtonBlockAppender(
	{
		rootClientId,
		className,
		__experimentalSelectBlockOnInsert: selectBlockOnInsert,
		onFocus,
		tabIndex,
		text,
		isSelected,
	},
	ref
) {
	if (isSelected) {
		return (
			<Inserter
				position="bottom center"
				rootClientId={rootClientId}
				__experimentalSelectBlockOnInsert={selectBlockOnInsert}
				renderToggle={({
					onToggle,
					disabled,
					isOpen,
					blockTitle,
					hasSingleBlockType,
				}) => {
					let label;
					if (hasSingleBlockType) {
						label = sprintf(
							// translators: %s: the name of the block when there is only one
							_x(
								'Add %s',
								'directly add the only allowed block',
								'pulsar-blocks'
							),
							blockTitle
						);
					} else {
						label = _x(
							'Add block',
							'Generic label for block inserter button',
							'pulsar-blocks'
						);
					}
					const isToggleButton = !hasSingleBlockType;
					return (
						<Tooltip text={label}>
							<Button
								ref={ref}
								onFocus={onFocus}
								tabIndex={tabIndex}
								className={clsx(
									className,
									'block-editor-button-block-appender'
								)}
								onClick={onToggle}
								aria-haspopup={
									isToggleButton ? 'true' : undefined
								}
								aria-expanded={
									isToggleButton ? isOpen : undefined
								}
								disabled={disabled}
								label={label}
								text={text ? text : false}
								icon={create}
								iconPosition="left"
								style={{
									flexDirection: 'row',
									justifyContent: 'center',
								}}
							>
								<VisuallyHidden as="span">
									{label}
								</VisuallyHidden>
							</Button>
						</Tooltip>
					);
				}}
				isAppender
			/>
		);
	}
}

export default forwardRef(ButtonBlockAppender);
