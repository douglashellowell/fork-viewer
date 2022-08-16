import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

const Nav = () => {
  const applyActiveClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? styles['nav__link--active'] : styles['nav__link--inactive'];

  return (
    <nav>
      <NavLink to="/" className={applyActiveClass}>
        Home
      </NavLink>
      <NavLink to="/student-management" className={applyActiveClass}>
        student-management
      </NavLink>
      <NavLink to="/get-forks" className={applyActiveClass}>
        get-forks
      </NavLink>
    </nav>
  );
};

export default Nav;
