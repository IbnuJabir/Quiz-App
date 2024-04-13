import React from "react";
// import "./pagination.css";

const Pagination = ({
    totalPosts,
    postPerPage,
    setCurrentPage,
    currentPage,
    selectedOption,
    setSelectedOption
}) => {

    const handlePage = (page) => {
        setCurrentPage(page);
        setSelectedOption(false);
    };

    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className='pagination'>
            {pages.map((page, index) => (
                <button
                className='pagBtn'
                    key={index}
                    disabled={selectedOption}
                    onClick={() => handlePage(page)}
                    className={page === currentPage ? "active" : ""}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
