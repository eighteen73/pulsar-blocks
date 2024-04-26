const wordpressConfig = require('@wordpress/scripts/config/webpack.config');
const { mergeWithRules } = require('webpack-merge');

/**
 * Pulsar blocks default config.
 */
const pulsarBlocksConfig = {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: require.resolve('css-loader'),
						options: {
							url: false,
						},
					},
				],
			},
			{
				test: /\.(sc|sa)ss$/,
				use: [
					{
						loader: require.resolve('css-loader'),
						options: {
							url: false,
						},
					},
				],
			},
			{
				test: /\.svg$/,
				issuer: /\.(j|t)sx?$/,
				use: ['@svgr/webpack'],
				type: 'javascript/auto',
			},
		],
	},
	stats: 'minimal',
};

module.exports = mergeWithRules({
	module: {
		rules: {
			test: 'match',
			use: {
				loader: 'match',
				options: 'replace',
			},
		},
	},
})(wordpressConfig, pulsarBlocksConfig);
