import { NavLink } from 'react-router-dom';
import { navItems } from '../data/constants/NavItems';

export function NavigationBar() {

    const activeState = ({ isActive }: { isActive: boolean }) => {
        return {
          color: isActive ? "rgb(253 230 138)" : "",
          fontWeight: isActive ? "bold" : "",
        };
    };

    return (
        <div className='w-screen'>
            <div className='bg-black justify-between items-center h-12 max-w-screen-2xl mx-auto px-4 text-white bg-fixed'>
                {/* LOGO */}
                <h1 className='w-full text-3xl font-bold text-[#6495ed] text-center'>
                    Mahjong
                </h1>
            </div>
            <div className='bg-[#0f0f0f] overflow-auto whitespace-nowrap'>
                {/* Display Navigation Items */}
                <ul className='overflow-auto md:flex w-full p-0.5'>
                    {navItems.map(item => (
                        <li key={item.id} className='inline-block p-4 hover:bg-[#ffffff] rounded-xl m-2 cursor-pointer duration-300 hover:text-black text-center'>
                            <NavLink to={item.url} style={activeState}>
                                {item.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
  }