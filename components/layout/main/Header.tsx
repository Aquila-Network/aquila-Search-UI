import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import Avatar from 'boring-avatars';

import Logo from '../../../public/img/logo.png';
import classes from './Header.module.scss';
import Container from "../../ui/layout/Container";

interface HeaderProps {
	onSignOut: Function
	isAuth: boolean;
	signedInUser: {
		firstName: string;
		lastName: string;
	} | null;
}


const Header: FC<HeaderProps> = (props: HeaderProps) => {
	const { signedInUser, onSignOut } = props;
	const [toggleDropDown, setToggleDropDown] = useState(false);

	const signOutHandler = (e: any) => {
		e.preventDefault();
		onSignOut();
	}

	const dropDownToggleHandler = (e: any) => {
		e.preventDefault();
		setToggleDropDown(!toggleDropDown);
	}

	return (
		<header className={classes.header}>
			<Container>
				<div className={classes.header__container}>
					<div>
						<Link href="/">
							<a className={classes["header__brand-link"]}>
								<div className={classes["header__brand-img-container"]}>
									<Image src={Logo} alt="Aquila Network Logo" objectFit="contain" />
								</div>
								<h2 className={classes["header__brand-text"]}>AQUILA NETWORK</h2>
							</a>
						</Link>
					</div>
					<nav>
						<ul className={classes["header__nav-list-container"]}>
							<li>
								<Link href="/"><a className={classes["header__nav-list-link"]} >Home</a></Link>
							</li>
							<li>
								<Link href="/home"><a className={classes["header__nav-list-link"]} >My Index</a></Link>
							</li>
							<li>
								<Link href="/subscription"><a className={classes["header__nav-list-link"]} >Subscription</a></Link>
							</li>
							<li>
								<Link href="/explore"><a className={classes["header__nav-list-link"]} >Explore</a></Link>
							</li>
							<li>
								<Link href="/"><a className={classes["header__nav-list-link"]} >Download</a></Link>
							</li>
							<li>
								<a className={classes["header__nav-list-link"]}  href="https://blog.aquila.network/">Blog</a>
							</li>
							<li>
								<a className={classes["header__nav-list-link"]} href="https://github.com/Aquila-Network">Github</a>
							</li>	
							{!props.isAuth &&	
							<li>
								<Link href="/sign-in"><a className={classes["header__nav-list-link"]} >Sign In</a></Link>
							</li>
							}
							{props.isAuth &&
							<li className={classes["header__nav-list-item"]}>
								<a href="#" onClick={dropDownToggleHandler}>
									<Avatar name={signedInUser ? `${signedInUser?.firstName} ${signedInUser.lastName}` : ''} size="40" variant="beam" />
								</a>
								{toggleDropDown &&
								<ul className={classes["header__nav-dropdown"]}>
									<li>
										<Link href="/account/edit-profile">
											<a className={classes["header__nav-dropdown-link"]}>Edit Profile</a>
										</Link>
									</li>	
									<li>
										<Link href="#">
											<a onClick={signOutHandler} className={classes["header__nav-dropdown-link"]}>Sign Out</a>
										</Link>
									</li>
								</ul>
								}
							</li>
							}
						</ul>
					</nav>
				</div>
			</Container>
		</header>
	)
}

export default Header;