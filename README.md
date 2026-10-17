# Heat Pump Sizer

A single-page tool that estimates the heat pump size (in tons) and rough installed cost range for a home in Toronto.

**Live demo:** [https://unluckycodedev.github.io/heat-pump-sizer/](https://unluckycodedev.github.io/heat-pump-sizer/)

## The problem

Homeowners and contractors often over- or under-size heat pumps because the sizing math is opaque and scattered across installer quoting tools. This tool makes the estimate transparent and instant, using four inputs a homeowner actually knows.

## The formula

Sizing logic:

1. Start with **25 BTU/hr per square foot** of home area.
2. Multiply by an insulation factor: **poor = 1.3**, **average = 1.0**, **good = 0.8**.
3. Add **1,000 BTU/hr per window**.
4. Multiply by a climate factor (Toronto = 1.0 in v1).
5. Convert BTU/hr to tons: **1 ton = 12,000 BTU/hr**.
6. Round to the nearest **half ton**, because heat pumps are sold in half-ton increments.

Cost logic:

Multiply the recommended tonnage by a per-ton installed cost band, which varies by insulation tier:

| Insulation | Low ($/ton) | High ($/ton) |
|------------|-------------|--------------|
| Poor       | 4,500       | 6,500        |
| Average    | 4,000       | 5,500        |
| Good       | 3,500       | 5,000        |

The output is rounded to the nearest $100.

## How to use it

Open the live demo, enter your home's square footage, pick the closest insulation quality, enter the number of windows, and pick a climate zone. The output updates live.

Click the moon/sun button in the top-right to switch between light and dark themes. Your preference is remembered.

## Limitations

- **Toronto only** in v1.
- **Directional estimate, not a load calculation.** A real Manual J calculation uses wall/roof R-values, window orientation, air leakage, and ductwork. This tool is a starting point for a conversation, not a replacement for an HVAC site visit.
- **Costs are rough.** Actual installed cost depends on equipment brand, refrigerant type, electrical work, and rebates.

## Stack

- HTML, CSS, vanilla JavaScript
- No build tools, no frameworks
- Deployed on GitHub Pages

## Run locally

```bash
git clone https://github.com/UnluckyCodeDev/heat-pump-sizer.git
cd heat-pump-sizer
