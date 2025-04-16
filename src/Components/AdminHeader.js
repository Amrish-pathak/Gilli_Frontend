// import react from "react"
import {  useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { PiArrowRight } from 'react-icons/pi';


const AdminHeader = () => {
    const location = useLocation();

    const linksTo = [
        {
            link: '/dashboardAdx/stats',
            title: 'Dashboard',
        },
        {
            link: '/dashboardAdx/managetasks',
            title: 'Project TG Tasks',
        },
        {
            link: '/dashboardAdx/externaltasks',
            title: 'Other Tasks',
        },
        {
            link: '/dashboardAdx/promo',
            title: 'Adverts/Promo Tasks',
        },
        {
            link: '/dashboardAdx/ranks',
            title: 'Users Ranks',
        },
        {
          link: '/dashboardAdx/youtube',
          title: 'Youtube Tasks',
      },
        {
            link: '/dashboardAdx/airdroplist',
            title: 'Airdrop List',
        },
        {
            link: '/dashboardAdx/search',
            title: 'Users list',
        },
        {
            link: '/dashboardAdx/settings',
            title: 'Settings',
        },
      ] 

    return (
        <>

<div className='flex flex-col space-y-4 w-full'>

{linksTo.map((menu, index) => (
    <NavLink to={menu.link} key={index} className={`bg-[#7e7d7e] px-4 py-4 flex rounded-[6px] justify-between items-center space-x-1 font-medium`}>

       <span className=''>
         {menu.title}
         </span>
         <span className=''>
    <PiArrowRight size={16} className=''/>
</span>
    </NavLink>
))}
    </div>
        </>

    );
};
export default AdminHeader;
