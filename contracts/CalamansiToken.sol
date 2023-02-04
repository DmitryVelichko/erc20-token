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

  
