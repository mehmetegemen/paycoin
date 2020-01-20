const INVALID_INPUT_ERROR = Error("Transaction Error: Invalid Input");
const INVALID_OUTPUT_ERROR = Error("Transaction Error: Invalid Output");
const NOT_ENOUGH_STACK_ITEM_ERROR = Error("Stack error: not enough items to operate on");
const STACK_ITEMS_NOT_EQUAL_ERROR = Error("Stack error: last two items are not equal");

module.exports = {
  INVALID_INPUT_ERROR,
  INVALID_OUTPUT_ERROR,
  NOT_ENOUGH_STACK_ITEM_ERROR,
  STACK_ITEMS_NOT_EQUAL_ERROR
};
