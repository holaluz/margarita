# Datepicker

Margarita has two types of datepickers: 
 - Single datepicker: lets you pick a date.
 - Range datepicker: lets you pick a date range.

## Props

`label` -> The label of the input.

`locale` -> i18n locale for the week and month names. Currently supported: `es-ES`, `ca-ES`, `en-US`.

`value` -> The value of the input (`v-model`).

`isRange` -> If `true`, the datepicker will behave like a range datepicker.

`startDate` -> The min selectable date in the datepicker. If `isRange = true` it will also be used to mark the start of the date range.

`endDate` -> The max selectable date in the datepicker. If `isRange = true` it will also be used to mark the end of the date range.

## Events

`input` -> fired when `value` changes (`v-model`).

