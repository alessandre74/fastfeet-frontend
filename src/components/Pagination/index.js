import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

const Pagination = ({ itensPerPage, totalItens, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItens / itensPerPage); i += 1) {
    pageNumbers.push(i)
  }

  return (
    <Container>
      <ul>
        {pageNumbers.map(number => (
          <li key={number}>
            <button type="button" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default Pagination

Pagination.propTypes = {
  itensPerPage: PropTypes.number.isRequired,
  totalItens: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
}
