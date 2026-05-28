# opo-promo-card



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute       | Description                                                                                                                                                                                             | Type                        | Default          |
| ----------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------- |
| `description`           | `description`   | Supporting text displayed below the heading.                                                                                                                                                            | `string`                    | `undefined`      |
| `fullWidth`             | `full-width`    | Makes the card take the full available width.                                                                                                                                                           | `boolean`                   | `false`          |
| `heading` _(required)_  | `heading`       | Main heading displayed in the card header.                                                                                                                                                              | `string`                    | `undefined`      |
| `headingLevel`          | `heading-level` | Semantic heading level. Visual style remains unchanged.                                                                                                                                                 | `2 \| 3 \| 4 \| 5 \| 6`     | `3`              |
| `imageAlt`              | `image-alt`     | Accessible image alternative text.  Defaults to an empty string because promo images are usually decorative when the meaningful information is already provided by the heading, description and action. | `string`                    | `""`             |
| `imageSrc` _(required)_ | `image-src`     | Image source used in the media area.                                                                                                                                                                    | `string`                    | `undefined`      |
| `layout`                | `layout`        | Defines how the card participates in external layouts.  - standalone: default isolated layout - subgrid: enables synchronized row alignment inside parent subgrids                                      | `"standalone" \| "subgrid"` | `"standalone"`   |
| `pending`               | `pending`       | Shows a non-interactive pending state instead of the action slot.                                                                                                                                       | `boolean`                   | `false`          |
| `pendingLabel`          | `pending-label` | Text displayed when the card is in pending state.                                                                                                                                                       | `string`                    | `"Próximamente"` |


## Shadow Parts

| Part            | Description |
| --------------- | ----------- |
| `"base"`        |             |
| `"description"` |             |
| `"footer"`      |             |
| `"header"`      |             |
| `"image"`       |             |
| `"media"`       |             |
| `"pending"`     |             |
| `"title"`       |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
