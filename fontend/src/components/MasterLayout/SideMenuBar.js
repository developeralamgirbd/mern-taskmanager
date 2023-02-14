import React, {useRef} from 'react';
import {NavLink} from "react-router-dom";
/*import {
    AiOutlineCheckCircle,
    AiOutlineEdit, AiOutlineMenuUnfold,
    BsHourglass,
    BsListNested,
    MdOutlineCancelPresentation,
    RiDashboardLine
} from "react-icons/all";*/

import {AiOutlineCheckCircle, AiOutlineEdit, AiOutlineLogout, AiOutlineMenuUnfold, AiOutlineUser} from "react-icons/ai";
import {BsHourglass, BsListNested} from "react-icons/bs";
import logo from "../../assets/images/logo.svg";
import  { RiDashboardLine } from "react-icons/ri";
import { MdOutlineCancelPresentation } from 'react-icons/md';

import {Navbar} from "react-bootstrap";

const SideMenuBar = ({sideNavRef, contentRef}) => {

    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;

        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
        }
    };

    return (
        <>
            <div ref={(div) =>{sideNavRef=div}} className="side-nav-open">
                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/">
                    <RiDashboardLine className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Dashboard</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/create" >
                    <AiOutlineEdit className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Create New</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/All" >
                    <BsListNested className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">New Task</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/Progress" >
                    <BsHourglass className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">In Progress</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/Completed" >
                    <AiOutlineCheckCircle className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Completed</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/Canceled" >
                    <MdOutlineCancelPresentation className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Canceled</span>
                </NavLink>
            </div>

            <div className='position-absolute top-0' style={{zIndex: '99999'}}>
                <button className="btn" onClick={MenuBarClickHandler}><AiOutlineMenuUnfold/></button>
            </div>

        </>


    );
};

export default SideMenuBar;