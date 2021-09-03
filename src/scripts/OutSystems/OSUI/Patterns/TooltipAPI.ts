// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OutSystems.OSUI.Patterns.TooltipAPI {
	const _tooltipsMap = new Map<string, OSUIFramework.Patterns.Tooltip.ITooltip>(); //tooltip.uniqueId -> Tooltip obj

	/**
	 * Function that will change the property of a given tooltip.
	 *
	 * @export
	 * @param {string} tooltipId ID of the Tooltip where the property will be changed.
	 * @param {string} propertyName Property name that will be updated
	 * @param {*} propertyValue Value that will be set to the property
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
	export function ChangeProperty(tooltipId: string, propertyName: string, propertyValue: any): void {
		const tooltip = GetTooltipById(tooltipId);

		tooltip.changeProperty(propertyName, propertyValue);
	}

	/**
	 * Function that will close a given tooltip.
	 *
	 * @export
	 * @param {string} tooltipId ID of the tooltip that will be closed
	 */
	export function Close(tooltipId: string): void {
		const tooltip = GetTooltipById(tooltipId);

		tooltip.close();
	}

	/**
	 * Create the new tooltip instance and add it to the tooltipsMap
	 *
	 * @export
	 * @param {string} tooltipId ID of the Tooltip where the instance will be created.
	 * @param {string} configs configurations for the Tooltip in JSON format.
	 * @return {*}  {OSUIFramework.Patterns.ITooltip}
	 */
	export function Create(tooltipId: string, configs: string): OSUIFramework.Patterns.Tooltip.ITooltip {
		if (_tooltipsMap.has(tooltipId)) {
			throw new Error(`There is already a tooltip registered under id: ${tooltipId}`);
		}

		const _newTooltip = new OSUIFramework.Patterns.Tooltip.Tooltip(tooltipId, JSON.parse(configs));

		_tooltipsMap.set(tooltipId, _newTooltip);

		return _newTooltip;
	}

	/**
	 * Function that will destroy the instance of the given tooltip
	 *
	 * @export
	 * @param {string} tooltipId
	 */
	export function Destroy(tooltipId: string): void {
		const tooltip = GetTooltipById(tooltipId);

		tooltip.dispose();

		_tooltipsMap.delete(tooltip.uniqueId);
	}

	/**
	 * Fucntion that will return the Map with all the Tooltip instances at the page
	 *
	 * @export
	 * @return {*}  {Map<string, OSUIFramework.Patterns.ITooltip>}
	 */
	export function GetAllTooltips(): Array<string> {
		return OSUIFramework.Helper.MapOperation.ExportKeys(_tooltipsMap);
	}

	/**
	 * Function that gets the instance of tooltip, by a given ID.
	 *
	 * @export
	 * @param {string} tooltipId ID of the Tooltip that will be looked for.
	 * @return {*}  {OSUIFramework.Patterns.ITooltip}
	 */
	export function GetTooltipById(tooltipId: string): OSUIFramework.Patterns.Tooltip.ITooltip {
		return OSUIFramework.Helper.MapOperation.FindInMap(
			'Tooltip',
			tooltipId,
			_tooltipsMap
		) as OSUIFramework.Patterns.Tooltip.ITooltip;
	}

	/**
	 * Fucntion that will open a given tooltip.
	 *
	 * @export
	 * @param {string} tooltipId ID of the tooltip that will be opened
	 */
	export function Open(tooltipId: string): void {
		const tooltip = GetTooltipById(tooltipId);

		tooltip.open();
	}

	/**
	 * Function that will initialize the pattern instance.
	 *
	 * @export
	 * @param {string} tooltipId ID of the Tooltip that will be initialized.
	 * @return {*}  {OSUIFramework.Patterns.ITooltip}
	 */
	export function Initialize(tooltipId: string): OSUIFramework.Patterns.Tooltip.ITooltip {
		const tooltip = GetTooltipById(tooltipId);

		tooltip.build();

		return tooltip;
	}
}