import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import {fetchData} from '../redux-store/action-creators';
import {connect} from 'react-redux';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;


  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };


  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </Box>
  );
}

function CustomPaginationActionsTable(props) {
  const {collection, dataItems = [], totalCount, newData} = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const {getData} = props;
    if ((dataItems.length === 0) || (dataItems.length < (page * rowsPerPage + 1))) {
      getData({tableName: collection, pageNumber: page + 1, limit: rowsPerPage});
    }
  }, [page]);

  let rows = (rowsPerPage > 0
    ? dataItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : dataItems
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataItems.length) : 0;
  
  if (newData && emptyRows > 0) {
    // Append newly added form data to last record
    rows = [...rows, newData];
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+(event.target.value));
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <TableContainer component={Paper} sx={{ width: '75vw', ml: 1.5 }}>
      <Table aria-label="custom pagination table">
        <caption>{collection.toUpperCase()}</caption>
        <TableHead sx={{backgroundColor: "#1976d2"}}>
          {rows.length > 0 &&
            <TableRow>
              {Object.keys(rows[0]).map((field, index) => 
                <StyledTableCell  key={`${index}-col-heading`} align="right">{field.toUpperCase()}</StyledTableCell>)}
          </TableRow>}
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={`${row.id}-row}`}>
              {
                Object.keys(row).map((field) =>
                (
                  <TableCell key={`${row.id}-data`} align='right'>
                    {row[field]}
                  </TableCell>
                ))
              }
            </TableRow>
          ))}

          {emptyRows > 0 && emptyRows < rowsPerPage && (
            <TableRow style={{ height: 53 * (newData ? emptyRows : emptyRows - 1) }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

const mapStatetoProps = (state, ownProps) => ({
  dataItems: state.dataSource && state.dataSource[ownProps.collection]?.items,
  totalCount: state.dataSource && state.dataSource[ownProps.collection]?.totalCount,
  newData: state.dataSource && state.dataSource[ownProps.collection]?.newData
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getData: ({pageNumber, limit = 10}) => {
    dispatch(fetchData({
        tableName: ownProps.dataSource || 'pets',
        pageNumber,
        limit
    }));
  }
});

export const ConnectedTable = connect(mapStatetoProps, mapDispatchToProps)(CustomPaginationActionsTable);