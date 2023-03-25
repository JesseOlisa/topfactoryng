/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			screens: {
				xs: '300px',
			},
			margin: {
				320: '320px',
			},
			width: {
				190: '190px',
				280: '17.5rem',
				300: '300px',
				340: '340px',
				350: '350px',
				656: '656px',
				880: '880px',
				508: '508px',
			},
			height: {
				80: '80px',
				340: '340px',
				370: '370px',
				420: '420px',
				510: '510px',
				600: '600px',
				685: '685px',
				800: '800px',
				'90vh': '90vh',
			},
			flex: {
				0.7: '0.7 1 0%',
			},
			maxHeight: {
				370: '370px',
			},
			minWidth: {
				210: '210px',
				280: '17.5rem',
				350: '350px',
				620: '620px',
			},
			gridTemplateColumns: {
				280: 'repeat(auto-fit, minmax(17.5rem, max-content))',
			},
			textColor: {
				lightGray: '#F1EFEE',
				primary: '#1B1212',
				secColor: '#efefef',
				navColor: '#BEBEBE',
				success: '#64E986',
			},
			backgroundColor: {
				mainColor: '#FBF8F9',
				secondaryColor: '#F0F0F0',
				blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
				blackOverlayDarker: 'rgba(0, 0 ,0 ,0.85)',
				productBg: '#FFC178',
				success: '#64E986',
			},
			backgroundSize: {
				100: '100%',
				120: '120%',
			},
			borderWidth: {
				2.5: '2.5px',
			},
			zIndex: {
				1: 1,
			},
			keyframes: {
				'slide-left': {
					'0%': {
						'-webkit-transform': 'translateX(-100px)',
						transform: 'translateX(-100px)',
					},
					'100%': {
						'-webkit-transform': 'translateX(0px)',
						transform: 'translateX(0px)',
					},
				},

				'slide-right': {
					'0%': {
						'-webkit-transform': 'translateX(200px)',
						transform: 'translateX(200px)',
					},
					'100%': {
						'-webkit-transform': 'translateX(0px)',
						transform: 'translateX(0px)',
					},
				},
				'fade-in': {
					'0%': {
						opacity: 0,
					},
					'100%': {
						opacity: 1,
					},
				},
				'fade-out': {
					'0%': {
						opacity: 1,
					},
					'100%': {
						opacity: 0,
					},
				},
			},
			animation: {
				'slide-in-right': 'slide-right 0.3s ease',
				'slide-in-left': ' slide-left 0.35s ease',
				'fade-in': 'fade-in 0.3s ease',
				'fade-out': 'fade-out 0.3s ease-out',
				'fade-in-slower': 'fade-in 1.3s ease',
			},
			transitionProperty: {
				height: 'height',
			},
		},
		cursor: {
			'zoom-in': 'zoom-in',
			pointer: 'pointer',
		},
	},
	plugins: [],
};
