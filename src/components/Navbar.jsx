import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';
import {VscFeedback} from 'react-icons/vsc'
import {Link} from 'react-router-dom'
const Navbar = ({triggeron}) => {
  // Use media query to detect mobile devices
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const listyle={
    paddingLeft: isMobile? '0px': '8%',
    paddingRight: isMobile&& '28px',
    paddingTop: '2%',
    cursor: 'pointer'

  }

  return (
    <nav style={{ backgroundColor: '#3b5998',color:'white',paddingTop:isMobile&&'12px',paddingBottom:isMobile&&'12px' }}>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: isMobile ? 'space-between' : 'flex-start' }}>
        <li style={listyle}>
          <a href="/home" style={{ textDecoration: 'none', color: 'black' }}>
            <AiFillHome style={{ width: '2rem', height: '2rem',color:'white' }} />
          </a>
        </li>
        {isMobile ? (<>
          <li style={listyle} onClick={() => { triggeron() }}>
            <CgProfile style={{ width: '2rem', height: '2rem' }} />
          </li>
          <li style={listyle}>
          <Link to="/feedback" style={{ textDecoration: 'none', color: 'black' }}><VscFeedback style={{width: '2rem', height: '2rem', color:'white'}}/></Link>
        </li>
        </>
        ) : (
          <>
            <li style={listyle} onClick={() => { triggeron() }}>
              <CgProfile style={{ width: '2rem', height: '2rem' }} />
            </li>
            <li style={listyle}>
              <FiSettings style={{ width: '2rem', height: '2rem' }} />
            </li>
            <li style={listyle}>
              <Link to="/feedback" style={{ textDecoration: 'none', color: 'black' }}><VscFeedback style={{width: '2rem', height: '2rem', color:'white'}}/></Link>
            </li>

          </>
        )}
        <li style={listyle}>
          {!isMobile &&<h2>News Feed</h2>}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
