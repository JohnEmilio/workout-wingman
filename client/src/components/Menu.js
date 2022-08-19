import { slide as Menu } from 'react-burger-menu'

export default function NavMenu() {

  function logout() {
    sessionStorage.setItem('authUser', false);
  }

  return (
    <Menu right>
      <a id="home" className="menu-item" href="/">Home</a>
      <a id="about" className="menu-item" href="/user">Profile</a>
      {sessionStorage.getItem('authUser') !== 'true' && <a id="contact" className="menu-item" href="/login">Login</a>}
      {sessionStorage.getItem('authUser') === 'true' && <a id="contact" className="menu-item" href="/" onClick={() => logout()}>Logout</a>}
    </Menu>
  );
}