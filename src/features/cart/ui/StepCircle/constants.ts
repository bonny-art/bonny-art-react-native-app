import { mscale, scale, vscale } from "@shared/lib/responsive";
import { sizes } from "@/shared/lib/tokens";

export const DOT_SIZE = mscale(sizes.orderStepper.dot);
export const DOT_SIZE_COMPACT = mscale(sizes.orderStepper.dotCompact);
export const LINE_THICKNESS = scale(sizes.orderStepper.lineThickness);
export const ROW_GAP_V = vscale(sizes.orderStepper.rowGap);
export const LABEL_ROW_GAP_V = vscale(sizes.orderStepper.labelRowGap);
export const STEP_BOX_MIN_W = mscale(sizes.orderStepper.stepMinWidth);

export const H_GAP = mscale(sizes.orderStepper.horizontalGap);
