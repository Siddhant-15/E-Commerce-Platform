//handles complex pagination logic for navigating through multiple pages of data.
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const ComplexPaginationContainer = () => {
    //The useLoaderData hook is called to retrieve loader data provided by the parent route component. The meta object is destructured from the loader data.
    const { meta } = useLoaderData();
    //pageCount represents the total number of pages, and page represents the current page number.
    const { pageCount, page } = meta.pagination;
    //The useLocation hook is used to get the current location object, including the URL query parameters.
    const { search, pathname } = useLocation();
    //The useNavigate hook is used to get the navigate function, which allows for programmatic navigation to other pages within the application.
    const navigate = useNavigate();


    const handlePageChange = (pageNumber) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', pageNumber);
        navigate(`${pathname}?${searchParams.toString()}`);
    };

    const addPageButton = ({ pageNumber, activeClass }) => {
        return (
            <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`btn btn-xs sm:btn-md border-none join-item ${activeClass ? 'bg-base-300 border-base-300 ' : ''
                    }`}
            >
                {pageNumber}
            </button>
        );
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        // first button
        pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

        // dots
        if (page > 2) {
            pageButtons.push(
                <button className='join-item btn btn-xs sm:btn-md' key='dots-1'>
                    ...
                </button>
            );
        }

        // active/current page
        if (page !== 1 && page !== pageCount) {
            pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
        }
        // dots
        if (page < pageCount - 1) {
            pageButtons.push(
                <button className='join-item btn btn-xs sm:btn-md' key='dots-2'>
                    ...
                </button>
            );
        }

        // last button
        pageButtons.push(
            addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
        );
        return pageButtons;
    };

    if (pageCount < 2) return null;

    return (
        <div className='mt-16 flex justify-end'>
            <div className='join'>
                <button
                    className='btn btn-xs sm:btn-md join-item'
                    onClick={() => {
                        let prevPage = page - 1;
                        if (prevPage < 1) prevPage = pageCount;
                        handlePageChange(prevPage);
                    }}
                >
                    Prev
                </button>
                {renderPageButtons()}
                <button
                    className='btn btn-xs sm:btn-md join-item'
                    onClick={() => {
                        let nextPage = page + 1;
                        if (nextPage > pageCount) nextPage = 1;
                        handlePageChange(nextPage);
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
export default ComplexPaginationContainer;