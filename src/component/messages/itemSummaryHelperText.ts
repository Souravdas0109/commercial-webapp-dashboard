export const itemSummaryHelperText = {
  rangeResetItem: {
    itemNumber: 'Product ID/MIN number',
    itemDescription: 'Item description',
    productTargetDate: 'Range Reset Live date',
    department: 'Trading Group in Oracle Heirarcy: example: BWS',
    category: 'Product Group in Oracle Heirarcy: example: (098) Wine',
    productEndDate: '21 Weeks from the date of Range reset meeting',
    gscopDate: `Date agreed with supplier for final order to be placed. \n
    GSCOP date should be less than target date - depot clear week.`,
    autoClear:
      'EXCLUDE FROM MARKDOWN PRICING: Users will have to manually clear depot by allocating stock to stores ',
    autoClearBackUp:
      'Price Action 1 = Active from when last supplier order is placed \n Price Action 2 = Active from depot clearance date, or from week -4 on De-Range \n Price Action 3 = Active the week prior to the target launch',
    type: `De-List: Remove from ALL stores \n
    De-Range: Remove from a selection of stores`,
    status: `Draft - not approved. No run down or price action will be taken \n
    Confirmed - approved by business. Will begin run down and price action.\n
    Cancelled: Item no longer part of range reset`,
    supplierCommitment:
      'Amount of remaining stock we have agreed to buy by GSCOP date.',
    depoClearWeek: 'Week that depot stock will be cleared by and in store.',
    poForecast: 'Purchase order Forecast based on Sales forecast calculated',
    suggestedSTopOrderDate:
      'Calculated optimal date to stop orders based on stock and forecast data.',
    lastPODate:
      'week-4 [depot to be cleared date] from the product end date less the supplier lead time',
    stopPODate:
      'Calculated optimal date to stop orders based on stock and forecast data.',
    poHistory3Months: 'Purchase order history for last 3 months',
    salesForecastToTargetDate:
      'This data updates overnight.  If this column still shows N/A, please check whether it is live on Morrisons Ordering',
    aggregatedStoreStock: 'Store stock is in units',
    wareHouseStock: 'Depot stock is in units',
    // weeksCover:
    //   'Total stock (store + depot + open POs + commitment)/remaining forecast * weeks until target launch date',
    // forecastedWeeksCover:
    //   'PO Forecast +Total stock (store + depot + open POs + commitment)/remaining forecast * weeks until target launch date',
    weeksCover:
      '(Total stock(store stock + depot stock + open POs)/forecast) * number of weeks remaining to target date',
    forecastedWeeksCover:
      '((Total stock(store stock + depot stock + open POs) + PO Forecast)/forecast) * number of weeks remaining to target date',
  },
}
