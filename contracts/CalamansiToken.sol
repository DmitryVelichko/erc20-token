// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CalamansiToken {
    string public name = "CalamansiToken";
    string public symbol = "CALMNSI";
    string public standard = "CalamansiToken v.0.1";
    uint256 public totalSupply;
    uint256 public _userId;

    address public ownerOfContract;
    address[] public holderToken;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => TokenHolderInfo) public tokenHolderInfos;

    mapping(address => mapping(address => uint256)) public allowance;

    struct TokenHolderInfo {
        uint256 _tokenId;
        address _from;
        address _to;
        uint256 _totalToken;
        bool _tokenHolder;
    }

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) {
        ownerOfContract = msg.sender;
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function inc() internal {
        _userId++;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);
        inc();
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

