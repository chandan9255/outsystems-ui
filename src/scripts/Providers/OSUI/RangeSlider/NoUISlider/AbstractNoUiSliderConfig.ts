/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Providers.OSUI.RangeSlider.NoUiSlider {
	/**
	 * Class that represents the custom configurations received by the RangeSlider.
	 *
	 * @export
	 * @abstract
	 * @class AbstractNoUiSliderConfig
	 * @extends {OSFramework.OSUI.Patterns.RangeSlider
	 * 		.AbstractRangeSliderConfig}
	 */
	export abstract class AbstractNoUiSliderConfig extends OSFramework.OSUI.Patterns.RangeSlider
		.AbstractRangeSliderConfig {
		// Store the Provider Options
		private _providerOptions: NoUiSliderOptions;
		// Store configs set using extensibility
		protected _providerExtendedOptions: NoUiSliderOptions;
		// Store rangeslider mode is in use
		public rangeSliderMode: OSFramework.OSUI.Patterns.RangeSlider.Enum.Mode;

		/**
		 * Method to get the configs for the Pips option (ShowTickMarks)
		 *
		 * @return {*}  {unknown}
		 * @memberof Providers.OSUI.RangeSlider.NoUiSlider.AbstractNoUiSliderConfig
		 */
		public getPipsConfig(): NoUiSliderPips {
			let tickMarksValues = Math.floor(this.TickMarksInterval);

			//To avoid performance issues
			if (tickMarksValues > this.MaxValue) {
				tickMarksValues = this.MaxValue;
			}
			// Ticks, when they exist, can't be decimal (library restraint)
			if (tickMarksValues < 1) {
				console.warn(
					'The interval between tick marks, when they exist, can not be smaller than one or a decimal number (library restraint). If you do not want TickMarks to show, set the ShowTickMarks parameter to false.'
				);
				this.ShowTickMarks = true;
				return null;
			}

			// To avoid the creation of minor ticks, whatever the value
			const ticksDensity = tickMarksValues * 100;

			// array to receive the list of ticks
			const list = [];

			// tick iterator used on the while
			let tick = this.MinValue;

			// Fill the array with the numbers from min to max values, respecting the interval set on the TickMarksInterval
			while (tick <= this.MaxValue) {
				list.push(tick);
				tick += tickMarksValues;
			}

			// To make sure that a tick is always created for the MaxValue
			if (tick !== this.MaxValue) {
				list.push(this.MaxValue);
			}

			return {
				values: list,
				density: ticksDensity,
				mode: RangeSlider.NoUiSlider.Enum.NoUiSliderModeOptions.Values,
			};
		}

		/**
		 * Method to set the common configs for the provider
		 *
		 * @return {*}  {NoUiSliderOptions}
		 * @memberof Providers.OSUI.RangeSlider.NoUiSlider.AbstractNoUiSliderConfig
		 */
		public getProviderConfig(): NoUiSliderOptions {
			this._providerOptions = {
				direction: OutSystems.OSUI.Utils.GetIsRTL()
					? OSFramework.OSUI.GlobalEnum.Direction.RTL
					: OSFramework.OSUI.GlobalEnum.Direction.LTR,
				step: this.Step,
				orientation: this.Orientation,
				pips: this.ShowTickMarks ? this.getPipsConfig() : null,
				range: this.getRangeConfig(),
				tooltips: this.getTooltipFormat(),
			};

			return this.mergeConfigs(this._providerOptions, this._providerExtendedOptions);
		}

		/**
		 * Method to get the configs for the Range option (Min/Max values)
		 *
		 * @return {*}  {unknown}
		 * @memberof Providers.OSUI.RangeSlider.NoUiSlider.AbstractNoUiSliderConfig
		 */
		public getRangeConfig(): NoUiSliderRange {
			return {
				min: this.MinValue,
				max: this.MaxValue === this.MinValue ? 100 : this.MaxValue,
			};
		}

		/**
		 * Method to get the configs for the Tooltip option (ShowFloatingLabel)
		 *
		 * @return {*}  {string[]}
		 * @memberof Providers.OSUI.RangeSlider.NoUiSlider.AbstractNoUiSliderConfig
		 */
		public getTooltipFormat(): NoUISliderTooltip {
			const tooltipValue = this.ShowFloatingLabel ? window.wNumb({ decimals: 0 }) : false;
			let tooltipsFormat;

			if (this.rangeSliderMode === OSFramework.OSUI.Patterns.RangeSlider.Enum.Mode.Interval) {
				tooltipsFormat = [tooltipValue, tooltipValue];
			} else {
				tooltipsFormat = [tooltipValue];
			}

			return tooltipsFormat;
		}

		/**
		 * Method to validate and save the external provider configs
		 *
		 * @param {NoUiSliderOptions} newConfigs
		 * @memberof Providers.OSUI.RangeSlider.NoUiSlider.AbstractNoUiSliderConfig
		 */
		public setExtensibilityConfigs(newConfigs: NoUiSliderOptions): void {
			this._providerExtendedOptions = newConfigs;
		}
	}
}
