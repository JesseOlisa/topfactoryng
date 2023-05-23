import React from 'react';

interface PaginationProps {
	totalItems: number;
	currentPage: number;
	pageSize: number;
	onPageChange: (page: number) => void;
}

const Pagination = ({
	totalItems,
	currentPage,
	pageSize,
	onPageChange,
}: PaginationProps) => {
	const pagesCount = Math.ceil(totalItems / pageSize);
	const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
	// const activeButtonStyle =
	return (
		<div className='flex-center mb-6 flex w-full overflow-x-auto px-4'>
			<div className='flex gap-1.5'>
				{pages.map((item) => (
					<button
						key={item}
						onClick={() => {
							window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
							onPageChange(item);
						}}
						className='cursor-pointer rounded-sm px-3 text-xl font-light'
						style={{
							color: currentPage === item ? 'white' : 'black',
							backgroundColor:
								currentPage === item ? 'black' : 'rgb(243 244 246)',
						}}
					>
						{item}
					</button>
				))}
			</div>
		</div>
	);
};

export default Pagination;
