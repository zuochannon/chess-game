import { navItems } from '../data/constants/NavItems';
import { useState } from 'react'

function NavigationBar() {

    const [isActive, setIsActive] = useState(false);

    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };

    return (
        <div>
            <div className='bg-black justify-between items-center h-12 max-w-screen-2xl mx-auto px-4 text-white bg-fixed'>
                {/* LOGO */}
                <h1 className='w-full text-3xl font-bold text-[#6495ed] text-center'>
                    Mahjong
                </h1>
            </div>
            <div className='bg-[#0f0f0f] overflow-auto whitespace-nowrap'>
                {/* Display Navigation Items */}
                <ul className='overflow-auto md:flex'>
                    {navItems.map(item => (
                        <li key={item.id} className='inline-block p-4 hover:bg-[#ffffff] rounded-xl m-0 cursor-pointer duration-300 hover:text-black text-center'>
                            <a href={item.url}>
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
  }
  
  export default NavigationBar;