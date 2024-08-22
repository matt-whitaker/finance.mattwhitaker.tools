const INTRA_INCOME = "Income";
const INTRA_DIVIDEND = "Dividend";
const ACCOUNT_TOTAL_KEY = "Account Total";
const POS_CASH = "Cash & Cash Investments";
const HDIV = " ---- ---- ---- ---- ---- ----";
const RISK_PROFILE = .9;
const CURRENT_YEAR = new Date().getFullYear();

const COL_TITLE = letterToColumn("A");
const COL_DESC = letterToColumn("E");
const COL_MACRO_NAME = letterToColumn("B");
const COL_INTRA_NAME = letterToColumn("C");

const COL_POS_SYMB = letterToColumn("D");
const COL_POS_DESC = letterToColumn("E");
const COL_POS_QUANT = letterToColumn("F");
const COL_POS_MARKET = letterToColumn("G");
const COL_POS_BASIS = letterToColumn("H");
const COL_POS_CHANGE = letterToColumn("I");
const COL_POS_REINV = letterToColumn("J");

const COL_ACTUAL_VALUE = letterToColumn("K");
const COL_ACTUAL_PERC = letterToColumn("L");
const COL_ACTUAL_ALLOC = letterToColumn("M");
const COL_TARGET_VALUE = letterToColumn("N");
const COL_TARGET_PERC = letterToColumn("O");
const COL_TARGET_ALLOC = letterToColumn("P");
const COL_DIFF_VALUE = letterToColumn("Q");
const COL_DIFF_COUNT = letterToColumn("R");
const COL_EXP_RATIO = letterToColumn("T");

const STRAT_INDX_MACRO_TARGET_PERC = 0;
const STRAT_INDX_INTRA_TARGET_PERC = 1;
const STRAT_INDX_POS_TARGET_PERC = 2;

const STRAT_INDX_MACRO_NAME = 1;
const STRAT_INDX_INTRA_NAME = 2;
const STRAT_INDX_POS_SYMB = 3;

const STRAT_INDX_EXP_RATIO = 4;
const STRAT_INDX_REINVEST = 5;