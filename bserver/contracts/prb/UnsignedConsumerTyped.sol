// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@prb/math/contracts/PRBMathUD60x18Typed.sol";

contract UnsignedConsumerTyped {
  using PRBMathUD60x18Typed for PRBMath.UD60x18;

  function unsignedLog2(uint256 x) external pure returns (uint256 result) {
    PRBMath.UD60x18 memory xud = PRBMath.UD60x18({ value: x });
    result = xud.log2().value;
  }

  /// @notice Calculates x*y÷1e18 while handling possible intermediary overflow.
  /// @dev Try this with x = type(uint256).max and y = 5e17.
  function unsignedMul(uint256 x, uint256 y) external pure returns (uint256 result) {
    PRBMath.UD60x18 memory xud = PRBMath.UD60x18({ value: x });
    PRBMath.UD60x18 memory yud = PRBMath.UD60x18({ value: y });
    result = xud.mul(yud).value;
  }

  /// @dev Assuming that 1e18 = 100% and 1e16 = 1%.
  function unsignedYield(uint256 principal, uint256 apr) external pure returns (uint256 result) {
    PRBMath.UD60x18 memory principalUd = PRBMath.UD60x18({ value: principal });
    PRBMath.UD60x18 memory aprUd = PRBMath.UD60x18({ value: apr });
    result = principalUd.mul(aprUd).value;
  }
}