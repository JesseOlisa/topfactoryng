import React from 'react';

interface NavProps {
	isNavOpen: boolean;
	setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
	// handleClick: () => void;
}

const NavMenu = ({ isNavOpen, setIsNavOpen }: NavProps) => {
	return (
		<div className='relative z-10 bg-transparent'>
			<button
				className='relative h-8 w-8 bg-transparent focus:outline-none'
				onClick={() => setIsNavOpen((prev) => !prev)}
			>
				<span className='sr-only'>Open main menu</span>
				<div className='flex-center absolute w-full'>
					<span
						aria-hidden='true'
						className={`absolute mb-2 block h-0.5 w-5 transform rounded bg-black transition duration-500 ease-in-out ${
							isNavOpen && 'translate-y-1 -rotate-45'
						}`}
					></span>
					<span
						aria-hidden='true'
						className={`absolute block h-0.5 w-5 transform rounded bg-black transition duration-500 ease-in-out ${
							isNavOpen && 'opacity-0 '
						}`}
					></span>
					<span
						aria-hidden='true'
						className={`absolute mt-2 block h-0.5 w-5 transform rounded bg-black transition duration-500 ease-in-out ${
							isNavOpen && '-translate-y-1 rotate-45'
						} `}
					></span>
				</div>
			</button>
		</div>
	);
};

export default NavMenu;
