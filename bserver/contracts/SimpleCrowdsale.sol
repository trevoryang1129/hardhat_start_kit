// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
interface Itoken{
    function decimals() external view returns (uint8);
    function transfer(address recipient, uint amount) external returns (bool);
    function balanceOf(address account) external view returns (uint);
}
contract SimpleCrowdsale 
{
    //受益人地址, 构造函数传入的是合约的创建者，但也可以指定不同的受益地址
    address  public immutable beneficiary; 
     //发行代币的地址
    address  public token;
    //发行代币的地址精度
    uint8 public decimals;
    
    //众筹目标，单位是ether
    uint public fundingGoal; 
    //已筹集金额数量， 单位是ether 
    uint public amountRaised;
    //截止时间
    uint public deadline;
    //代币价格
    uint public price;
    //是否达成众筹目标
    bool public fundingGoalReached = false; 
    //众筹关闭
    bool public crowdsaleClosed = false; 

    //保存众筹地址及对应的以太币数量
    mapping(address => uint256) public balance;
    //保存所有众筹地址
    address[] public fundingList;

     // 受益人将众筹金额转走的通知
    event GoalReached(address _beneficiary, uint _amountRaised);

    // 用来记录众筹资金变动的通知，_isContribution表示是否是捐赠，因为有可能是捐赠者退出或发起者转移众筹资金
    event FundTransfer(address _backer, uint _amount, bool _isContribution);

    /**
     * @param fundingGoalInEthers 众筹以太币总量
     * @param durationInDays 众筹截止,单位是天
     * @param _token 奖励代币地址
     */
    constructor(uint fundingGoalInEthers,uint durationInDays,address _token) {
        beneficiary=msg.sender;
        fundingGoal = fundingGoalInEthers * 1 ether;
        // deadline = block.timestamp + durationInDays * 1 days; //最后换算出来是秒
        //测试时我们使用minutes 分钟，因为时间到期后，要检测众筹目标,
        deadline = block.timestamp + durationInDays * 1 minutes; //最后换算出来是秒
        price = 0.5 ether; 
        token=_token;
        decimals=Itoken(_token).decimals();
    }
    //购买代币
    function buyToken() public payable
    {
        //判断是否关闭众筹
        require(!crowdsaleClosed,"Crowdsale closeed");
        uint amount = msg.value;
        //转入amount 个ETH 根据price能买入多少个 ERC20 代币 
        uint tokenBuyAmount=amount / price * 10 ** uint256(decimals);
        Itoken _t=Itoken(token);
        //合约账号代币余额不足
        require(_t.balanceOf(address(this))>=tokenBuyAmount,"Crowsale contract token amount insufficient");
        require(_t.transfer(msg.sender,tokenBuyAmount),"Token transfer failed");
        //捐款人的金额累加
        balance[msg.sender] += amount;
        //捐款总额累加
        amountRaised += amount;
        fundingList.push(msg.sender);
        //转帐操作，转多少代币给捐款人
        emit FundTransfer(msg.sender, amount, true);
    }
    /**
     * 默认函数，可以向合约直接打款
     */
    receive() external payable 
    {
      buyToken();
    }
     /**
     * 判断是否已经过了众筹截止限期
     */
    modifier afterDeadline() { if (block.timestamp >= deadline) _; }
    /**
     *  时间到期后，检测众筹目标是否已经达到,
     */
    function checkGoalReached() afterDeadline public {
        if (amountRaised >= fundingGoal){
            //达成众筹目标
            fundingGoalReached = true;
            emit GoalReached(beneficiary, amountRaised);
        }
        //关闭众筹
        crowdsaleClosed = true;
    }
    /**
     * 资金去留处理
     * 检查是否达到了目标或时间限制，如果有，并且达到了资金目标，
     * 将全部金额发送给受益人。如果没有达到目标，每个贡献者都可以退出并撤资
     * 注：这里代码应该是限制了众筹时间结束且众筹目标没有达成的情况下才允许退出。如果去掉限制条件afterDeadline，应该是可以允许众筹时间还未到且众筹目标没有达成的情况下退出
    */
    function safeWithdrawal()  public payable afterDeadline {
        //如果没有达成众筹目标
        if (!fundingGoalReached) {
            //获取合约调用者已捐款余额
            uint amount = balance[msg.sender];

            if (amount > 0) {
                //返回合约发起者所有余额
                payable(msg.sender).transfer(amount);
                emit FundTransfer(msg.sender, amount, false);
                balance[msg.sender] = 0;
            }
        }

        //如果达成众筹目标，并且合约调用者是受益人
        if (fundingGoalReached && beneficiary == msg.sender) {
            //将所有捐款从合约中给受益人
            payable(beneficiary).transfer(amountRaised);
            emit FundTransfer(beneficiary,balance[msg.sender],false);
        }
    }
}