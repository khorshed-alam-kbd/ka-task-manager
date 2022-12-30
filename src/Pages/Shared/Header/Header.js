import { Button, Navbar } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import logo from '../../../Images/blogo.jpg'

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleSignOut = () => {
        logOut().then(() => { })
            .catch((error) => { });
    }
    return (
        <Navbar
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand>
                <img
                    src={logo}
                    className="mr-3 h-6 sm:h-9"
                    alt="Brand Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    KA TASK MANAGER
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                {/* <Navbar.Link
                    active={true}
                >
                    <Link to='/'>Home</Link>
                </Navbar.Link> */}
                <Navbar.Link>
                    <Link to='/add-task'>Add Task</Link>
                </Navbar.Link>
                <Navbar.Link>
                    <Link to='/my-task'>My Task</Link>
                </Navbar.Link>
                <Navbar.Link>
                    <Link to='/complete-task'>Completed Task</Link>
                </Navbar.Link>
                {
                    user?.uid ?
                        <Navbar.Link >
                            <Link onClick={handleSignOut} className='bg-indigo-400 p-2 text-white rounded'>Log Out</Link>
                        </Navbar.Link>
                        :
                        <Navbar.Link >
                            <Link to='/login' className='bg-indigo-400 p-2 text-white rounded'>Login</Link>
                        </Navbar.Link>
                }
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;