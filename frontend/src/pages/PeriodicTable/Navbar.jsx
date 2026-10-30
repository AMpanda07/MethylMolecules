import { Link } from 'react-router-dom';

const LINKS = [
  { label: 'Table', to: '/table', active: true },
  { label: 'About', to: '/table#about' },
];

export const Navbar = ({ search, onSearch }) => (
  <nav className="zp-nav">
    <Link to="/table" className="zp-brand">
      <img src="/assets/images/zperiod.png" alt="Zperiod logo" width="30" height="30" />
      <span>Zperiod</span>
    </Link>

    <div className="zp-navlinks" aria-label="Sections">
      <Link className={`zp-navlink ${LINKS[0].active ? 'is-active' : ''}`} to={LINKS[0].to}>
        {LINKS[0].label}
      </Link>
      {LINKS.slice(1).map((l) => (
        <a key={l.label} className="zp-navlink" href={l.to}>
          {l.label}
        </a>
      ))}
    </div>

    <label className="zp-nav-search">
      <img src="/assets/svg/element-search-icon.svg" alt="" />
      <input
        type="search"
        name="q"
        placeholder="Search elements…"
        autoComplete="off"
        spellCheck={false}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Search elements"
      />
    </label>
  </nav>
);

export default Navbar;
