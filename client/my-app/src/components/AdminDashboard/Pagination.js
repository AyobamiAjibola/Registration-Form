import React from 'react';

export default function Pagination({postsPerPage, totalPosts, paginate}) {
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumber.push(i);
    }

  return (
    <nav aria-label="...">
        <ul className='pagination pagination-sm justify-content-center"'>
            <li className="page-item disable">
                <span className="page-link" aria-disabled="true" style={{color: 'red'}}>Pages</span>
            </li>
            {pageNumber.map(number => (
                <li key={number} className='page-item'>
                    <span onClick={() => paginate(number)} style={{cursor: 'pointer', color: 'black'}} className='page-link'>
                        {number}
                    </span>
                </li>
            ))}
        </ul>
    </nav>
  )
}
