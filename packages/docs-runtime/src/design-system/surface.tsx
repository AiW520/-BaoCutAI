/** BaoCut: surface from cds-CIGM-LUe.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import {
  React,
  UiProviderAndLayersCreateContext8,
  UiTooltipsAndControlsLight,
  UiTooltipsAndControlsLight2,
  UiTooltipsAndControlsPanel,
  originalJsxProps,
  resolveUiDesignSystemValue2,
  resolveUiProviderAndLayersCdsPageBg,
  resolveUiProviderAndLayersLight,
  resolveUiTooltipsAndControlsValue3,
} from "./dependencies";

function resolveSurfaceCdsFocusShadow(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = resolveUiProviderAndLayersLight();
  return {
    ...resolveUiProviderAndLayersCdsPageBg(input),
    "--cds-focus-shadow": UiTooltipsAndControlsLight[value],
    "--cds-focus-shadow-danger": UiTooltipsAndControlsLight2[value],
  };
}

var Surface: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeSurfaceStep1(): void {
  Surface = (0, React.forwardRef)(
    (
      {
        elevation: input,
        className: input2,
        style: input3,
        children: input4,
        ...input5
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      let value: Dynamic = resolveSurfaceCdsFocusShadow(
        UiTooltipsAndControlsPanel[input],
      );
      return (
        <div
          {...originalJsxProps({
            ref: options,
            "data-cds": `Surface`,
            "data-surface": input,
            ...input5,
            className: resolveUiDesignSystemValue2(
              resolveUiTooltipsAndControlsValue3(input),
              input2,
            ),
            style: {
              ...value,
              ...input3,
            },
            children: (
              <UiProviderAndLayersCreateContext8.Provider
                value={UiTooltipsAndControlsPanel[input]}
              >
              {input4}
            </UiProviderAndLayersCreateContext8.Provider>
            ),
          })}
        />
      );
    },
  );
  Surface.displayName = `Surface`;
}

export { Surface, resolveSurfaceCdsFocusShadow };
