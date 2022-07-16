// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@prb/math/contracts/PRBMathUD60x18.sol";

contract UnsignedConsumer {
  using PRBMathUD60x18 for uint256;

  /// @dev Note that "x" must be greater than or equal to 1e18, lest the result would be negative, and negative
  /// numbers are not supported by the unsigned 60.18-decimal fixed-point representation.
  function unsignedLog2(uint256 x) external pure returns (uint256 result) {
    result = x.log2();
  }

  /// @notice Calculates x*y÷1e18 while handling possible intermediary overflow.
  /// @dev Try this with x = type(uint256).max and y = 5e17.
  function unsignedMul(uint256 x, uint256 y) external pure returns (uint256 result) {
    result = x.mul(y);
  }

  /// @dev Assuming that 1e18 = 100% and 1e16 = 1%.
  function unsignedYield(uint256 principal, uint256 apr) external pure returns (uint256 result) {
    result = principal.mul(apr);
  }
}