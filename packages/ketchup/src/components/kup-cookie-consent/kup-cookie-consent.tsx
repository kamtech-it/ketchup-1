import {
    Component,
    Element,
    forceUpdate,
    h,
    Host,
    Method,
    Prop,
} from '@stencil/core';
import { kupManagerInstance } from '../../managers/kup-manager/kup-manager';
import { KupManager } from '../../managers/kup-manager/kup-manager-declarations';
import { GenericObject, KupComponent } from '../../types/GenericTypes';
import { componentWrapperId } from '../../variables/GenericVariables';
import {
    KupCookieConsentData,
    KupCookieConsentProps,
} from './kup-cookie-consent-declarations';
import { getProps, identify, setProps } from '../../utils/utils';
import { FButtonProps } from '../../f-components/f-button/f-button-declarations';
import { FButton } from '../../f-components/f-button/f-button';

@Component({
    tag: 'kup-cookie-consent',
    styleUrl: 'kup-cookie-consent.scss',
    shadow: true,
})
export class KupCell {
    /**
     * References the root HTML element of the component (<kup-text-field>).
     */
    @Element() rootElement: HTMLElement;

    /*-------------------------------------------------*/
    /*                    P r o p s                    */
    /*-------------------------------------------------*/

    /**
     * Custom style of the component.
     * @default ""
     * @see https://ketchup.smeup.com/ketchup-showcase/#/customization
     */
    @Prop() customStyle: string = '';
    /**
     * The data of the cell.
     * @default false
     */
    @Prop() data: KupCookieConsentData = null;

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    /**
     * Instance of the KupManager class.
     */
    private kupManager: KupManager = kupManagerInstance();

    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/

    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    @Method()
    async getProps(descriptions?: boolean): Promise<GenericObject> {
        return getProps(this, KupCookieConsentProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    @Method()
    async refresh(): Promise<void> {
        forceUpdate(this);
    }
    /**
     * Sets the props to the component.
     * @param {GenericObject} props - Object containing props that will be set to the component.
     */
    @Method()
    async setProps(props: GenericObject): Promise<void> {
        setProps(this, KupCookieConsentProps, props);
    }

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    componentWillLoad() {
        this.kupManager.debug.logLoad(this, false);
        this.kupManager.language.register(this);
        this.kupManager.theme.register(this);
    }

    componentDidLoad() {
        this.kupManager.debug.logLoad(this, true);
    }

    componentWillRender() {
        this.kupManager.debug.logRender(this, false);
    }

    componentDidRender() {
        this.kupManager.debug.logRender(this, true);
    }

    render() {
        const gotItButtonProp: FButtonProps = {
            label: 'Got it!',
            onClick: () => {},
        };

        return (
            <Host>
                <style>
                    {this.kupManager.theme.setKupStyle(
                        this.rootElement as KupComponent
                    )}
                </style>
                <div id={componentWrapperId}>
                    <div>
                        This website uses cookies to ensure you get the best
                        experience.
                    </div>
                    <a href="https://cookiesandyou.com/" target="_blank">
                        Learn more
                    </a>
                    <FButton {...gotItButtonProp} />
                </div>
            </Host>
        );
    }

    disconnectedCallback() {
        this.kupManager.language.unregister(this);
        this.kupManager.theme.unregister(this);
    }
}
