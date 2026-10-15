/** BaoCut: sheet popup menu from cds-CIGM-LUe.js. */
import type { Dynamic } from "../../interop/legacy-dynamic";
import {
  BaseMenuBackdrop,
  BaseMenuPortal,
  BaseMenuPositioner,
  React,
  UiDesignSystemUseLayoutEffect,
  UiOverlaysAndIconsSurface,
  UiProviderAndLayersCreateContext13,
  UiShortcutsAndSizingCreateContext3,
  UiShortcutsAndSizingOverride,
  UiTooltipsAndControlsPanel,
  resolveUiDesignSystemValue2,
  resolveUiOverlaysAndIconsValue5,
  resolveUiProviderAndLayersBase2,
  resolveUiProviderAndLayersDataSize,
  resolveUiProviderAndLayersUseContext10,
  resolveUiProviderAndLayersUseContext9,
} from "../dependencies";
import { usePresentationCapture } from "../presentation";
import {
  SheetsComfortable,
  SheetsDataCdsSheetCovered,
  SheetsDataCdsSheetPeeling,
  SheetsDataCdsSheetTreeClosing,
  SheetsDisableAnchorTracking,
  SheetsState3,
  isSheetsFrom,
  resolveSheetsBottom,
  resolveSheetsFloor,
  resolveSheetsInnerHeight,
  resolveSheetsValue2,
  resolveSheetsValue3,
  sheetsValue0_5,
  sheetsValue0_9,
} from "../sheets/geometry";
import { SheetsCreateContext, resolveSheetsTall3 } from "../sheets/gestures";
import {
  SheetsCreateContext2,
  SheetsCreateContext3,
  SheetsState4,
  SheetsState5,
  SheetsState6,
  SheetsState7,
  SheetsStyles2,
  SheetsStyles3,
  SheetsStyles4,
  resolveSheetsSheet,
  resolveSheetsUseContext2,
} from "../sheets/stack";
import {
  MenuInteractionsCreateContext,
  MenuInteractionsCreateContext2,
  MenuInteractionsCreateContext3,
  MenuInteractionsHeader,
  resolveMenuInteractionsContextElement,
  resolveMenuInteractionsWarn,
  resolveMenuInteractionsWarn2,
} from "../menu/interactions";
import { MenuPopupsPopover } from "../menu/popup-frame";
import { MenuPopupsCell, resolveMenuPopupsCell } from "../menu/focus";
import {
  MenuPopupsAnchoredWithoutFinalFocus,
  useMenuPopupsEnabled,
  useMenuPopupsUseContext,
} from "../menu/popup";
import { resolveLabeledFieldsTransition } from "./height";
import {
  SheetPopupDrawPill,
  useSheetPopupClick,
  useSheetPopupTall,
} from "./layout";
import {
  isSheetPopupReady,
  isSheetPopupTarget,
  resolveSheetPopupHeight,
  useSheetPopupFocusout,
} from "./focus";
import {
  clearSheetPopupAriaHidden,
  resolveSheetPopupOutsidePress,
  resolveSheetPopupPreventDefault,
  updateSheetPopupAriaHidden,
  useSheetPopupNode,
} from "./modal";
import {
  SheetBackMenuItem,
  SheetCloseMenuItem,
} from "./content";

var MenuSheetPopup: Dynamic;

// BaoCut: called by cds-initialize in the recovered source order.
export function initializeSheetPopupMenuStep1(): void {
  MenuSheetPopup = (0, React.forwardRef)(
    (
      {
        side: input,
        align: input16 = `start`,
        sideOffset: input2,
        collisionPadding: input3,
        collisionAvoidance: input4,
        anchor: input5,
        container: input6,
        className: input7,
        children: input8,
        header: input9,
        footer: input10,
        maxVisibleItems: input11,
        layerOffset: input12,
        stableWhileOpen: input17 = false,
        "data-cds": input18 = `Menu`,
        style: input13,
        initialFocus: input14,
        ...input15
      }: Dynamic,
      options?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic => {
      "use no memo";
      let value: Dynamic = resolveUiProviderAndLayersUseContext9();
      let value2: Dynamic = (0, React.useContext)(
        MenuInteractionsCreateContext,
      );
      let value3: Dynamic =
        (0, React.useContext)(MenuInteractionsCreateContext3) &&
        value2 === null;
      let value4: Dynamic = resolveSheetsSheet();
      let value5: Dynamic = value4 && value2 !== null;
      let value6: Dynamic = (0, React.useContext)(
        UiShortcutsAndSizingCreateContext3,
      );
      let value7: Dynamic = input3 ?? value6?.collisionPadding;
      let value8: Dynamic = (0, React.useMemo)(
        (..._extraArguments: unknown[]): Dynamic =>
          input5 !== undefined || !value2
            ? input5
            : resolveMenuInteractionsContextElement(value2),
        [input5, value2],
      );
      let value9: Dynamic =
        input2 ?? (value3 ? undefined : value2 && input5 === undefined ? 2 : 6);
      let value10: Dynamic = useMenuPopupsEnabled({
        enabled: input17 && !value4 && !value3,
        side: input,
        align: input16,
      });
      let value11: Dynamic = (0, React.useContext)(SheetsCreateContext);
      let value12: Dynamic = (0, React.useContext)(
        MenuInteractionsCreateContext2,
      );
      let value13: Dynamic = (0, React.useRef)(null);
      let value14: Dynamic = (0, React.useRef)(null);
      let value15: Dynamic = (0, React.useCallback)(
        (..._extraArguments: unknown[]): undefined => {
          let current: Dynamic = value14.current;
          if (current !== null) {
            clearSheetPopupAriaHidden(current, value14);
            value14.current = null;
          }
        },
        [],
      );
      let value16: Dynamic = (0, React.useCallback)(
        (element?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          if (value2 === null) return;
          let value54: Dynamic =
            value11 === null
              ? null
              : (value2.triggerRef.current?.closest(
                  `[data-sheet-tree="${CSS.escape(value11.treeId)}"][data-presentation="sheet"]`,
                ) ?? null);
          if (value54 !== null && value14.current !== value54) {
            value15();
            updateSheetPopupAriaHidden(value54, value14);
            value14.current = value54;
          }
          if (!element.contains(element.ownerDocument.activeElement)) {
            element.focus({
              preventScroll: true,
            });
          }
        },
        [value2, value15, value11],
      );
      let [value17, value18]: Dynamic = (0, React.useState)(false);
      let value19: Dynamic = (0, React.useRef)(false);
      let value20: Dynamic = (0, React.useCallback)(
        (input19?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          value19.current = input19;
          value18(input19);
        },
        [],
      );
      let [value21, value22]: Dynamic = (0, React.useState)(null);
      let value23: Dynamic = value11?.takeCloseRequest;
      let value24: Dynamic = (0, React.useCallback)(
        (..._extraArguments: unknown[]): string =>
          resolveSheetPopupOutsidePress(value23?.() ?? null),
        [value23],
      );
      let value25: Dynamic = useSheetPopupNode({
        node: value21,
        open: value4 && !value5 && (value11?.open ?? false),
        liftOnClose: value24,
      });
      let value26: Dynamic = resolveSheetsUseContext2();
      let value27: Dynamic = (0, React.useContext)(SheetsCreateContext2);
      let value28: Dynamic = (0, React.useContext)(SheetsCreateContext3);
      let [value29, value30]: Dynamic = (0, React.useState)(null);
      let value31: Dynamic = (0, React.useCallback)(
        (element?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          value13.current = value4 ? element : null;
          value30(value4 ? element : null);
          value22(value4 && !value5 ? element : null);
          if (element === null) {
            value25();
            value15();
            value20(false);
            return;
          }
          if (!value4) {
            value20(false);
            return;
          }
          if (!value5) {
            let value54: boolean = resolveSheetsValue2(element);
            if (value54) {
              element.style.minHeight = SheetsState3;
              element.style.maxHeight = SheetsState3;
            }
            value20(value54);
            value11?.pinHeight(
              element.getBoundingClientRect().height,
              isSheetsFrom(element),
            );
            return;
          }
          value16(element);
          element.style.transition = `none`;
          element.style.translate =
            element.ownerDocument.defaultView?.getComputedStyle(element)
              .direction === `rtl`
              ? `-100% 0`
              : `100% 0`;
          element.getBoundingClientRect();
          element.style.transition = ``;
          element.style.translate = ``;
        },
        [value4, value5, value11, value15, value16, value20, value25],
      );
      useSheetPopupTall(value29, value11);
      useSheetPopupClick(value29);
      useSheetPopupFocusout(value29, value11, value26.covered);
      let value32: Dynamic = value4 && value26.covered;
      let value33: Dynamic = value4 && value26.inert;
      usePresentationCapture(
        value4 && (value5 ? value12.open : (value11?.open ?? false)),
        value5 ? value2?.close : value11?.dismiss,
      );
      let value34: Dynamic = (0, React.useRef)(false);
      let value35: Dynamic = value11?.open ?? false;
      UiDesignSystemUseLayoutEffect(
        (..._extraArguments: unknown[]): undefined => {
          let current: Dynamic = value13.current;
          let value54: Dynamic = value5 && value12.open && current !== null;
          let current2: Dynamic = value34.current;
          value34.current = value54;
          if (value54 && !current2) {
            value16(current);
          } else {
            if (!value54 && value35) {
              value15();
            }
          }
        },
        [value5, value12.open, value35, value16, value15],
      );
      let value36: Dynamic = (0, React.useRef)(false);
      let [value37, value38]: Dynamic = (0, React.useState)(false);
      UiDesignSystemUseLayoutEffect(
        (..._extraArguments: unknown[]): undefined => {
          let value54: Dynamic = value5 && value12.open;
          let current: Dynamic = value36.current;
          value36.current = value54;
          if (value54 !== current) {
            value38(!value54 && value35);
          }
        },
        [value5, value12.open, value35],
      );
      UiDesignSystemUseLayoutEffect(
        (..._extraArguments: unknown[]): undefined => {
          let current: Dynamic = value13.current;
          if (value5 && value12.open && current !== null) {
            resolveLabeledFieldsTransition(current);
          }
        },
        [value5, value12.open],
      );
      let value39: Dynamic = value11?.pushLevelHeight;
      let value40: Dynamic = value11?.drag;
      (0, React.useEffect)(
        (..._extraArguments: unknown[]): Dynamic => {
          if (
            !value5 ||
            !value12.open ||
            value29 === null ||
            value39 === undefined
          )
            return;
          let defaultView: Dynamic = value29.ownerDocument.defaultView;
          let value54: Dynamic;
          let value55: boolean = false;
          let value56 = (..._extraArguments: unknown[]): undefined => {
            let value61: Dynamic = defaultView?.innerHeight ?? 1 / 0;
            let value62: number =
              (defaultView
                ? resolveSheetsInnerHeight(defaultView, value29)
                : 1 / 0) * sheetsValue0_9;
            let value63: boolean = resolveSheetsValue2(value29);
            let value64: Dynamic = resolveSheetPopupHeight(value29);
            value55 = value64 > value62;
            let value65: number = value63
              ? value61 * sheetsValue0_5
              : Math.min(value64, value62);
            let value66: Dynamic = value63 || value55;
            if (value54 === undefined) {
              value54 = value39(value65, value66);
            } else {
              value54.set(value65, value66);
            }
          };
          let value57 = (..._extraArguments: unknown[]): undefined => {
            value59 = undefined;
            if (value40 !== undefined && value40.get() !== null) {
              value59 = defaultView?.requestAnimationFrame(value57);
              return;
            }
            if (value58.ready()) {
              value56();
            }
          };
          let value58: Dynamic = isSheetPopupReady(
            value29,
            (..._extraArguments: unknown[]): undefined => {
              if (value59 === undefined) {
                value59 = defaultView?.requestAnimationFrame(value57);
              }
            },
          );
          let value59: Dynamic = defaultView?.requestAnimationFrame(value57);
          let value60: Dynamic =
            defaultView !== null && defaultView.MutationObserver !== undefined
              ? new (defaultView.MutationObserver as Dynamic)(
                  (
                    input19?: Dynamic,
                    ..._extraArguments: unknown[]
                  ): undefined => {
                    if (
                      !(
                        value59 !== undefined ||
                        value54 === undefined ||
                        isSheetPopupTarget(input19, value55)
                      )
                    ) {
                      value59 = defaultView.requestAnimationFrame(value57);
                    }
                  },
                )
              : null;
          value60?.observe(value29, {
            childList: true,
            subtree: true,
          });
          return (..._extraArguments: unknown[]): undefined => {
            value60?.disconnect();
            value58.dispose();
            if (value59 !== undefined) {
              defaultView?.cancelAnimationFrame(value59);
            }
            value54?.release();
          };
        },
        [value5, value12.open, value29, value39, value40],
      );
      let value41: Dynamic = value11?.repinHeight;
      let value42: Dynamic = value11?.open ?? false;
      (0, React.useEffect)(
        (..._extraArguments: unknown[]): Dynamic => {
          if (
            !value4 ||
            value5 ||
            !value42 ||
            value29 === null ||
            value41 === undefined
          )
            return;
          let defaultView: Dynamic = value29.ownerDocument.defaultView;
          if (
            defaultView === null ||
            defaultView.MutationObserver === undefined
          )
            return;
          let index: number = 0;
          let value54: boolean = false;
          let value55 = (..._extraArguments: unknown[]): undefined => {
            index = 0;
            if (value40 !== undefined && value40.get() !== null) {
              index = defaultView.requestAnimationFrame(value55);
              return;
            }
            if (!value56.ready()) return;
            if (resolveSheetsValue2(value29)) {
              if (!value19.current) {
                value20(true);
                value41(defaultView.innerHeight * sheetsValue0_5, true);
              }
              return;
            }
            let value58: number =
              resolveSheetsInnerHeight(defaultView, value29) * sheetsValue0_9;
            let value59: Dynamic = resolveSheetPopupHeight(value29);
            value54 = value59 > value58;
            let value60: Dynamic = resolveSheetsValue3(
              defaultView.innerHeight,
              value19.current,
            );
            value41(Math.max(Math.min(value59, value58), value60), value54);
          };
          let value56: Dynamic = isSheetPopupReady(
            value29,
            (..._extraArguments: unknown[]): undefined => {
              if (index === 0) {
                index = defaultView.requestAnimationFrame(value55);
              }
            },
          );
          let value57: Dynamic = new (defaultView.MutationObserver as Dynamic)(
            (input19?: Dynamic, ..._extraArguments: unknown[]): undefined => {
              if (!(index !== 0 || isSheetPopupTarget(input19, value54))) {
                index = defaultView.requestAnimationFrame(value55);
              }
            },
          );
          value57.observe(value29, {
            childList: true,
            subtree: true,
          });
          return (..._extraArguments: unknown[]): undefined => {
            value57.disconnect();
            value56.dispose();
            if (index !== 0) {
              defaultView.cancelAnimationFrame(index);
            }
          };
        },
        [value4, value5, value42, value29, value41, value40, value20],
      );
      let value43: Dynamic = value11?.height;
      let value44: Dynamic = value11?.pinHeight;
      UiDesignSystemUseLayoutEffect(
        (..._extraArguments: unknown[]): undefined => {
          let current: Dynamic = value13.current;
          if (
            !(!value4 || value5 || value43 !== undefined || current === null)
          ) {
            resolveLabeledFieldsTransition(current);
            value44?.(
              current.getBoundingClientRect().height,
              isSheetsFrom(current),
            );
          }
        },
        [value4, value5, value43, value44],
      );
      let value45: Dynamic = useMenuPopupsUseContext(
        value2?.triggerRef,
        input15.finalFocus,
      );
      let value46: boolean = value3
        ? input15.finalFocus === undefined || input15.finalFocus === null
        : input5 != null && value2 === null && input15.finalFocus === undefined;
      let value47: Dynamic = resolveMenuPopupsCell(value2 === null);
      value47.root?.declareFocusProps(input14, input15.finalFocus);
      if (value2 !== null && input14 !== undefined) {
        resolveMenuInteractionsWarn2();
      }
      let state: Dynamic = {
        ...input15,
        onKeyDown: (
          input19?: Dynamic,
          ..._extraArguments: unknown[]
        ): undefined => {
          input15.onKeyDown?.(input19);
          resolveSheetPopupPreventDefault(input19);
        },
      };
      let value48: Dynamic = resolveUiOverlaysAndIconsValue5(
        (input19?: Dynamic, ..._extraArguments: unknown[]): undefined => {
          value10.popupRef(input19);
          value31(input19);
          value45(input19);
          value47.root?.registerPopup(input19);
        },
        options,
      );
      let value49: Dynamic = value4
        ? resolveSheetsFloor(value11, {
            floor: value17 ? `half` : `content`,
            parentFrameHeight: value5 ? undefined : value27?.frameHeight,
          })
        : undefined;
      let value50: Dynamic =
        value49 === undefined
          ? input13
          : typeof input13 == `function`
            ? (input19?: Dynamic, ..._extraArguments: unknown[]): Dynamic => ({
                ...input13(input19),
                ...value49,
              })
            : {
                ...input13,
                ...value49,
              };
      if (value2 !== null && input12 !== undefined) {
        resolveMenuInteractionsWarn();
      }
      let value51: Dynamic = resolveUiProviderAndLayersBase2(
        value3 ? `contextmenu` : `menu`,
        value2 === null ? input12 : undefined,
      );
      let value52: Dynamic = resolveSheetsTall3(
        value11,
        resolveUiProviderAndLayersUseContext10(),
        value29,
      );
      let value53: Dynamic = (0, React.useMemo)(
        (..._extraArguments: unknown[]): Dynamic =>
          value4 && value28 !== null
            ? {
                depth: value26.depth,
                frameHeight: value52,
                cover: value28,
              }
            : null,
        [value4, value28, value26.depth, value52],
      );
      return (
        <BaseMenuPortal container={input6 ?? value}>
        <UiOverlaysAndIconsSurface
          {...value51.portalProps}
          surface={UiTooltipsAndControlsPanel.popover}
          density={value4 ? SheetsComfortable : undefined}
          companionModalCatcher={!value4}
          closeOnActivityHide={true}
        >{value4 && !value5 && <BaseMenuBackdrop
          data-presentation={`sheet`}
          data-sheet-scrim={value11?.treeId}
          className={value26.depth > 0 ? `draggable-none fixed inset-0 bg-transparent` : SheetsState7}
        />}{<UiShortcutsAndSizingOverride override={value7} container={input6 ?? value} provideInherit={true}>
                {(input19?: Dynamic, ..._extraArguments: unknown[]): Dynamic => <UiProviderAndLayersCreateContext13.Provider value={value51.base}>
                    <BaseMenuPositioner ref={value10.positionerRef} data-sheet-tree={value4 ? value11?.treeId : undefined} style={value4 ? {
        ...value51.style,
        ...resolveSheetsBottom(value11)
      } : value10.held === null ? value51.style : {
        ...value51.style,
        ...value10.held.positionerStyle
      }} side={value10.side} align={value10.align} sideOffset={value9} collisionPadding={input19} collisionAvoidance={input4} anchor={value8} {...value4 ? SheetsDisableAnchorTracking : {}} className={value4 ? value5 ? SheetsStyles3 : value26.depth === 0 ? SheetsStyles2 : undefined : value10.held?.positionerClassName}>{<MenuPopupsCell cell={value4 ? null : value47.cell} nested={value2 !== null}>
                            {(input20?: Dynamic, ..._extraArguments: unknown[]): Dynamic => <MenuPopupsAnchoredWithoutFinalFocus anchoredWithoutFinalFocus={value46} cursorAnchored={value3} data-cds={input18} data-presentation={value4 ? `sheet` : undefined} data-sheet-tree={value4 ? value11?.treeId : undefined} data-cds-sheet-depth={value4 ? String(value26.depth) : undefined} {...value32 ? {
            [SheetsDataCdsSheetCovered]: ``
          } : {}} {...value33 ? SheetsState4 : {}} {...value5 && value11 !== null && !value11.open ? {
            [SheetsDataCdsSheetTreeClosing]: ``
          } : {}} {...value5 && value37 && !value12.open ? {
            [SheetsDataCdsSheetPeeling]: ``
          } : {}} {...value4 ? resolveUiProviderAndLayersDataSize(`lg`) : {}} ref={value48} {...input20(value4 ? state : input15)} style={value50} className={resolveUiDesignSystemValue2(MenuPopupsPopover, value10.held?.popupClassName, value4 && SheetsState5, value4 && (value5 ? `bg-transparent shadow-none [&[data-ending-style]:not([data-cds-sheet-tree-closing])]:translate-x-full rtl:[&[data-ending-style]:not([data-cds-sheet-tree-closing])]:-translate-x-full [&[data-ending-style][data-cds-sheet-peeling]]:translate-x-full rtl:[&[data-ending-style][data-cds-sheet-peeling]]:-translate-x-full [&[data-ending-style][data-cds-sheet-tree-closing]]:translate-y-[calc(100%+1.5rem)]` : `data-[starting-style]:translate-y-[calc(100%+1.5rem)] data-[ending-style]:translate-y-[calc(100%+1.5rem)]`), value4 && `origin-top [&[data-cds-sheet-covered]:not([data-starting-style]):not([data-ending-style])]:-translate-y-3 data-[cds-sheet-covered]:scale-[0.94] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-backdrop after:opacity-0 after:transition-opacity after:duration-sheet motion-reduce:after:transition-none data-[cds-sheet-covered]:after:opacity-100`, input7)}>{value4 ? <SheetsCreateContext2.Provider value={value53}>
                                      <SheetPopupDrawPill drawPill={!value5} />
                                      <div className={SheetsState6}>
                                        <MenuInteractionsHeader header={input9} headerClassName={SheetsStyles4} footer={input10} fill={true}>
                                          {input8}
                                          {!value5 && <SheetCloseMenuItem />}
                                        </MenuInteractionsHeader>
                                        <SheetBackMenuItem nested={value5} />
                                      </div>
                                    </SheetsCreateContext2.Provider> : <MenuInteractionsHeader header={input9} footer={input10} maxVisibleItems={input11}>
                                      {input8}
                                    </MenuInteractionsHeader>}</MenuPopupsAnchoredWithoutFinalFocus>}
                          </MenuPopupsCell>}</BaseMenuPositioner>
                  </UiProviderAndLayersCreateContext13.Provider>}
              </UiShortcutsAndSizingOverride>}</UiOverlaysAndIconsSurface>
      </BaseMenuPortal>
      );
    },
  );
  MenuSheetPopup.displayName = `MenuSheetPopup`;
}

export { MenuSheetPopup };
