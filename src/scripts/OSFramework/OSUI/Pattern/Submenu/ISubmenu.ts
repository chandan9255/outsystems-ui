// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSFramework.OSUI.Patterns.Submenu {
	/**
	 * Defines the interface for OutSystemsUI Submenu Pattern
	 */
	export interface ISubmenu
		extends Interface.IPattern,
			Interface.IOpenable,
			Interface.IRenderUpdate,
			Interface.ICallback {
		setOpenOnHover(): void;
	}
}
