import { IInputs, IOutputs } from "./generated/ManifestTypes";
import {BlurEffectBackground} from "./Components/BlurEffect"
import * as React from "react";
import { IBlurEffectProps } from "./Components/Component.types";

export class BlurEffect implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private context: ComponentFramework.Context<IInputs>;


    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
        context.mode.trackContainerResize(true)
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this.notifyOutputChanged();
        return React.createElement(
            BlurEffectBackground, this.getBlurEffectProps(context)
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }

    private getBlurEffectProps(context: ComponentFramework.Context<IInputs>) {
        const allocatedWidth = parseInt(
          context.mode.allocatedWidth as unknown as string
        );
        const allocatedHeight = parseInt(
          context.mode.allocatedHeight as unknown as string
        );
    
        return {
          blur: defaultIfEmpty(context.parameters.Blur,"8px"),
          width: allocatedWidth,
          height: allocatedHeight,
        } as IBlurEffectProps;
      }
}

function undefinedIfEmpty(property: ComponentFramework.PropertyTypes.Property) {
    return defaultIfEmpty(property, undefined);
  }
  
  function defaultIfEmpty<T>(
    property: ComponentFramework.PropertyTypes.Property,
    defaultValue: T
  ) {
    return (property.raw as T) ? property.raw : defaultValue;
  }
  