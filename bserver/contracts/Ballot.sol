// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Ballot 
{
     //Voter 代表投票人的结构体
    struct Voter {
        uint weight; // 该投票人手上有多少条票可以投，因为有可能出现一个投票人代理几个投票人选票
        bool voted;  //  true, 则已经投票
        address delegate; // 投票人可以委托给其他人进行投票
        uint vote;   // 该投票把票投给谁了，也就是 proposals 数组中的索引 所代表的人或者决议 （注意投票不一定投人，也可以是投一项决议）
    }
     //代表一个单一投票选项，比如选举中的候选人，又或者DAO 中一个单独的投资决议，比如是否花钱去买入一个NFT
    struct Proposal {
        bytes32 name;   // 投票选项名称 (up to 32 bytes)
        uint voteCount; // 该选项获得的票数
    }
     //投票发起人地址
    address public chairperson;
    string  public title;

    //记录每一个投票人
    mapping(address => Voter) public voters;
    address[] public votersList;

    // 本轮投票所有投票选项数组
    Proposal[] public proposals;

    event VoterJoin(address indexed chairperson,address voter);
    //代表一次有效投票
    event Voted(address voter);
    constructor(bytes32[] memory proposalNames,address _chairperson,string memory _title) 
    {
        //不能再使用msg.sender ，因为msg.sender 有可能是ContractProxy代理地像
        // chairperson = msg.sender;
        chairperson = _chairperson;
        title=_title;
        voters[chairperson].weight = 1;
        votersList.push(chairperson);
        // console.log(string(bytes.concat("Ballot init0=>",proposalNames[0])));
        // console.log(string(bytes.concat("Ballot init1=>",proposalNames[1])));
        //在构造函数中初始化此次投票内容，比如选举候选人，则传入所有候选人名单。
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }
     // `chairperson` 投票发起人集结所有投票人
    function giveRightToVote(address voter) external {
        require(msg.sender == chairperson,"Only chairperson can give right to vote.");
        require(!voters[voter].voted,"The voter already voted.");
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
        votersList.push(voter);
        emit VoterJoin(chairperson,voter);
    }
    function getProposalLength() public view returns (uint){
        return proposals.length;        
    }
    function getVotersList() public view returns(address[] memory)
    {
        return votersList;
    }
    function getProposal() public view returns (Proposal[] memory){
        return proposals;        
    }

    /// 投票人把投票权委派给其他投票人 `to` 也必须是 voters 数组里面的人才可以
    function delegate(address to) external {
        Voter storage sender = voters[msg.sender];
        //投票人完成投票也无法行使委派权
        require(!sender.voted, "You already voted.");
        //不能自己委派给自己
        require(to != msg.sender, "Self-delegation is disallowed.");

        // B->C->D   假设现在的代理关系是这样的，如果A 委派给B 做代理，那么下面这段代码就要把D 这个最终委派人给找出来
        // 此处循环有执行风险，因为如果委派层次过深，可能会导致Gas 消耗完或者过高成本增加，也有可能导致合约挂死
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // 不允许相互委派 
            require(to != msg.sender, "Found loop in delegation.");
        }

        // 获取最终的委派人delegate_
        Voter storage delegate_ = voters[to];

        // 委派人delegate_ 必须有投票权限weight>=1 ,当完成委派关系后，投票人需要设置为已经已经投票：voted = true 记录其代理人：delegate=to 
        require(delegate_.weight >= 1);
        sender.voted = true;
        sender.delegate = to;
        if (delegate_.voted) {
            //如果委派人delegate_ 已经投票完成，那么需要将sender 的投票计入委派人所投票之人，也就是 proposals[delegate_.vote].
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            // 如果委派人delegate_ 尚未投票，则把他手上的票数+1 ，这就是为什么使用weight的原因，需要记录每个人身上有多少条票可以投。
            //注意，当前规则只支持投票给单一选项，不能说投票人手上
            delegate_.weight += sender.weight;
        }
    }
     //给proposal索引对应的候选人或者候选项目发起投票
    function vote(uint proposal) external {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        //如果proposal 索引不在数组范围，会抛出异常，事务发生回滚，并不对投票结果产生影响
        proposals[proposal].voteCount += sender.weight;
        emit Voted(msg.sender);
    }
    /// 计算投票胜出的候选人或者候选项目 返回的是proposals 的索引，需要使用 winnerName 方法获取候选人名单
    function winningProposal() public view returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }
    //获取投票胜出的候选人或者候选项目名称
    function winnerName() external view returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }
}