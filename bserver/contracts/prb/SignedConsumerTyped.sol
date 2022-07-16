// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@prb/math/contracts/PRBMathSD59x18Typed.sol";

contract SignedConsumerTyped {
  using PRBMathSD59x18Typed for PRBMath.SD59x18;

  function signedLog2(int256 x) external pure returns (int256 result) {
    PRBMath.SD59x18 memory xsd = PRBMath.SD59x18({ value: x });
    result = xsd.log2().value;
  }

  /// @notice Calculates x*y÷1e18 while handling possible intermediary overflow.
  /// @dev Try this with x = type(int256).max and y = 5e17.
  function signedMul(int256 x, int256 y) external pure returns (int256 result) {
    PRBMath.SD59x18 memory xsd = PRBMath.SD59x18({ value: x });
    PRBMath.SD59x18 memory ysd = PRBMath.SD59x18({ value: y });
    result = xsd.mul(ysd).value;
  }

  /// @dev Assuming that 1e18 = 100% and 1e16 = 1%.
  function signedYield(int256 principal, int256 apr) external pure returns (int256 result) {
    PRBMath.SD59x18 memory principalSd = PRBMath.SD59x18({ value: principal });
    PRBMath.SD59x18 memory aprSd = PRBMath.SD59x18({ value: apr });
    result = principalSd.mul(aprSd).value;
  }
}