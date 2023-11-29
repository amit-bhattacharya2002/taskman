"use client"

import React from 'react'
import { styled } from 'styled-components'
import {useGlobalState} from "@/app/Context/GlobalProvider"
import Image from 'next/image'
import Link from 'next/link'
import menu from "@/app/utils/menu"
import { usePathname, useRouter } from 'next/navigation'
import SignOutButton from '@/app/utils/Signout'
import { UserButton, useUser } from '@clerk/nextjs'
import { arrowLeft, bars } from '@/app/utils/Icons'


function Sidebar() {
    const {theme, collapsed, collapseMenu} = useGlobalState()

    const {user} = useUser()

    const {firstName, lastName, imageUrl} = user || {firstName : "", lastName: "" , imageUrl: ""}
    // console.log(theme)
    const router = useRouter();
    const pathname = usePathname()

    const handleClick = (link : string) =>{
      router.push(link)
    };
  return (
    <SidebarStyled theme={theme} collapsed={collapsed}>
      <button className='toggle-nav' onClick={collapseMenu}>
        {collapsed? bars : arrowLeft}
      </button>
      <div className="profile">
        <div className="profile-overlay">
          
        
        </div>
        <div className="image">
          <Image
          width={70}
          height={70}
          src={imageUrl} 
          alt='profile'
          ></Image>
          </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton/>
        </div>
        <h1 className='capitalize'>
          <span>{firstName}</span>
          <span>{lastName}</span>
          
        </h1>
        
      </div>

      <ul className='nav-items'>
        {menu.map((item) => {
          const link = item.link
          return <li className={`nav-item ${pathname === link ? "active" : ""}`} onClick={() =>{
            handleClick(link)
          }}>
            {item.icon}
            <Link href={link}> {item.title}</Link>
          </li>
        })}
      </ul>

      <div className="button">
        <SignOutButton></SignOutButton>
      </div>
    </SidebarStyled>
  )
}

const SidebarStyled = styled.nav<{collapsed: boolean}>`
    position: relative;
    width: ${(props) => props.theme.sidebarWidth};
    background-color: ${(props) => props.theme.colorBg2};
    border : 2px solid ${(props)=> props.theme.borderColor2};
    border-radius: 0.25rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    color: ${(props)=> props.theme.colorGrey3};

    
    .user-btn{
      .cl-rootBox{
        width: 100%;
        height: 100%;

        .cl-userButtonBox{
          width: 100%;
          height: 100%;

          .cl-userButtonTrigger{
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }
      }


    }

    .profile{
      margin: 1.5rem;
      padding: 1rem 0.8rem;
      position: relative;

      border-radius: 1rem;
      cursor: pointer;

      font-weight: 500;
      color: ${(props) => props.theme.colorGrey0};

      display: flex;
      align-items: center;
      
      .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      transition: all 0.55s linear;
      border-radius: 1rem;

      border: 2px solid ${(props) => props.theme.borderColor2};
      opacity: 0.2;
      }

    h1{

      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
    }

    .image, h1{
      position: relative;
      z-index:1;
    }

    .image{
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;

      width: 70px;
      height: 70px;

      img{
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }

    > h1{
      margin-left: 0.8rem;
      font-size: clamp(0.5rem, 0.75rem, 1.2rem);
      line-height: 100%;
    }

    &:hover{
      .profile-overlay{
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};

      }

      img{
        transform: scale(1.1);
      }

    }

    }
    .nav-item {
        padding: 0.6rem 1rem;
        padding-left: 2.1rem;
        position: relative;
        display: grid;
        grid-template-columns: 40px 1fr;

        cursor: pointer;

        &::after{
          position: absolute;
          content: "";
          left: 0;
          top: 0;
          width: 0;
          height: 100%;
          background-color: ${(props) => props.theme.activeNavLinkHover};
          border-bottom-left-radius: 5px;
          border-top-left-radius: 5px;
          transition: all 0.3s ease-in-out;
        }

        &::before{
          position: absolute;
          content: "";
          left: 0;
          top: 0;
          width: 0;
          height: 100%;
          background-color: ${(props) => props.theme.colorGreenDark};
          border-bottom-left-radius: 5px;
          border-top-left-radius: 5px;
        }

        a{
          font-weight: 500;
        }

        i{
          display: flex;
          align-items: center;
          color: ${(props) => props.theme.colorIcons}
        }
        &:hover{
          &::after{
            width: 100%;
          }
        }
    }

    .active{
      background-color: ${(props) => props.theme.activeNavLink};

      i, a{
        color: ${(props) => props.theme.colorIcons2};
      }
    }

    .active::before {
      width: 0.3rem;
    }


    .button{
      display: flex;
      height: 10vh;
      justify-content: center;
    }

    

    @media screen and (max-width: 768px){
      position: fixed;
      height: calc(100vh - 2rem);
      z-index: 10;

      transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${(props)=> props.collapsed ? "translateX(-110%)" : "translateX(0)"};
    .toggle-nav{
      display: block !important;
    }
    }

    .toggle-nav{
      display: none;
      position: absolute;
      right: -48px;
      top: 2rem;
      padding: 1rem;
      background-color: ${(props) => props.theme.colorBg2};
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;

      border-right: 2px solid ${(props) => props.theme.borderColor2};
      border-top: 2px solid ${(props) => props.theme.borderColor2};
      border-bottom: 2px solid ${(props) => props.theme.borderColor2};
    }
   
    
`

export default Sidebar