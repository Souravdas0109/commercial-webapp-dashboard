export const helperText = {
  createRangeReset: {
    name: 'Please enter range reset name here',
    buyer: 'Please enter buyer name here',
    department: 'Trading Group in Oracle Heirarcy: example: BWS',
    departmentfind:'Please select a department from dropdown',
    category: 'Product Group in Oracle Heirarcy: example: (098) Wine',
    categoryfind:'Please select a category which will be populated based on department',
    buyerAssistant: 'Please enter buyer assistant name here',
    supplyChainSpecialist: 'Please enter supply chain specialist name here',
    targetLaunchDate: 'Range Reset Live date, should be a Monday',
    createdBy: 'Shows the created user name',
    productsAdd: 'Morrisons Item Number - 9 digit product MIN',
    productsUpload:
      'First column of excel should be min and second column should be store id, other column will be ignored. No headers in the spreadsheet',
    supplierCommitment:
      'Amount of remaining stock we have agreed to buy by GSCOP date.',
    stopPODate:
      'Calculated optimal date to stop orders based on stock and forecast data.',
    gscopDate: `Date agreed with supplier for final order to be placed. \n
    GSCOP date should be less than target date - depot clear week.`,
    autoClear:
      'EXCLUDE FROM MARKDOWN PRICING: Users will have to manually clear depot by allocating stock to stores ',
    autoClearBackUp:
      'Price Action 1 = Active from when last supplier order is placed \n Price Action 2 = Active from depot clearance date, or from week -4 on De-Range \n Price Action 3 = Active the week prior to the target launch',
    totalPurchaseOrdersForecast:
      'Purchase order Forecast based on Sales forecast calculated',
    total3MonthsPOHistory: 'Purchase order history for last 3 months',
    nameAutoPopulate:
      'Name will be auto populated based on selected Department, Category and Target Date',
    totalSalesForecast:
      'This data updates overnight.  If this column still shows N/A, please check whether it is live on Morrisons Ordering',
    copyGscopDate: 'Copy gscopdate date to selected min codes',
    copySupplierCommitment: 'Copy supplier commitment to selected min codes',
    totalStoreStock: 'Store stock is in units',
    totalWarehouseStock: 'Depot stock is in units',
    totalStockCount:
      'Store Stock Unit + Depot Stock Unit + Open POs + Supplier Commitment',
    newSetupPending: 'Please enter new-setup pending products count',
    // weeksCover:
    //   'Total stock (store + depot + open POs + commitment)/remaining forecast * weeks until target launch date',
    // forecastedWeeksCover:
    //   'PO Forecast +Total stock (store + depot + open POs + commitment)/remaining forecast * weeks until target launch date',
    weeksCover:
      '(Total stock(store stock + depot stock + open POs + supplier commitment)/forecast) * number of weeks remaining to target date',
    forecastedWeeksCover:
      '((Total stock(store stock + depot stock + open POs + supplier commitment) + PO Forecast)/forecast) * number of weeks remaining to target date',
  },
}
