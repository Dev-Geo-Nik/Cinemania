import styles from "./navigation.module.scss";
import Logo from "../assets/img/logo.svg";
import Avatar from "../assets/img/avatar.png";

// Libraries
import { NavLink } from "react-router-dom";
import { MdViewList, MdLocalMovies, MdLiveTv, MdBookmark, MdPersonAddAlt1, MdLogin, MdFilterListAlt } from "react-icons/md";
import { useGeneralContext } from "../context/GeneralContext";

const Navigation: React.FC = () => {
	const {
		state: { user },
	} = useGeneralContext();
	return (
		<div className={styles.nav_wrapper}>
			<nav className={styles.navigation}>
				<div className={styles.logo_wrapper}>
					<NavLink to="/" end>
						<img src={Logo} alt="" className={styles.logo} />
					</NavLink>
				</div>
				<ul className={styles.list}>
					<li>
						<NavLink to="/" end className={({ isActive }) => (isActive ? ` ${styles.active} ` : `${styles.inactive}`)}>
							<MdViewList className={styles.icon} />
						</NavLink>
					</li>
					<li>
						<NavLink to="/media/movies" end className={({ isActive }) => (isActive ? ` ${styles.active}  active` : `${styles.inactive}`)}>
							<MdLocalMovies className={styles.icon} />
						</NavLink>
					</li>
					<li>
						<NavLink to="/media/movies/filter" end className={({ isActive }) => (isActive ? ` ${styles.active}  active` : `${styles.inactive}`)}>
							<MdFilterListAlt className={styles.icon} />
						</NavLink>
					</li>
					<li>
						<NavLink to="/media/bookmarked" end className={({ isActive }) => (isActive ? ` ${styles.active}  active` : `${styles.inactive}`)}>
							<MdBookmark className={styles.icon} />
						</NavLink>
					</li>
				</ul>
				{user && (
					<div className={styles.avatar_container}>
						<img src={Avatar} alt="user avatar" className={styles.avatar} />
					</div>
				)}
				<div className={styles.user_links}>
					<li>
						<NavLink to="/user/login" end className={({ isActive }) => (isActive ? ` ${styles.active}  active` : `${styles.inactive}`)}>
							<MdLogin className={styles.icon} />
						</NavLink>
					</li>
					<li>
						<NavLink to="/user/register" end className={({ isActive }) => (isActive ? ` ${styles.active}  active` : `${styles.inactive}`)}>
							<MdPersonAddAlt1 className={styles.icon} />
						</NavLink>
					</li>
				</div>
			</nav>
		</div>
	);
};

export default Navigation;
