// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Cirti {
    struct cirtificate{
        string name;
        string course;
        string grade;
        string date;
         
    }
    event issued(string,uint256,string); //event declaration

    address admin;
    constructor(){
        admin = msg.sender;
    }

    mapping (uint256 => cirtificate)public cirty;

    modifier onlyadmin(){
        require(msg.sender== admin,"Unautherized access");
        _;
    }

    function issue(uint256 _id,string memory _name,string memory _course,string memory _grade,string memory _date)public onlyadmin{
        require(bytes(cirty[_id].name).length == 0,"cirtificate already exist");
        cirty [_id]=cirtificate(_name,_course,_grade,_date);
        emit issued(_course,_id,_grade); //emit
    }

}