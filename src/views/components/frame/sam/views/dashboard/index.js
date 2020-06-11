import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  titleInterns: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  titleInternship: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  paperContainer: {
    marginLeft: '15%',
    marginRight: '15%',
  },
});

function createData( key, value ) {
  return { key, value };
}

const interns = [
  createData( 'Available (No Applications)', 1386 ),
  createData( 'Applied, Shortlisted or Interviewed', 548 ),
  createData( 'Offered', 116 ),
  createData( 'Placed (Waiting To Start)', 31 ),
  createData( 'In Progress', 249 ),
  createData( 'Completed (Internships)', 32 ),
];

const internships = [
  createData( 'Available (No Applications)', 153 ),
  createData( 'Applied, Shortlisted or Interviewed', 202 ),
  createData( 'Offered', 68 ),
  createData( 'Placed (Waiting To Start)', 25 ),
  createData( 'In Progress', 89 ),
  createData( 'Completed (Internships)', 0 ),
];

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paperContainer}>
      <Typography className={classes.titleInterns}>
Interns
      </Typography>
      <Table
        className={classes.table}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>
All Interns
            </TableCell>
            <TableCell align="right">
2362
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {interns.map(( row ) => (
            <TableRow key={row.key}>
              <TableCell
                component="th"
                scope="row"
              >
                {row.key}
              </TableCell>
              <TableCell align="right">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography className={classes.titleInternship}>
Internships
      </Typography>

      <Table
        className={classes.table}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>
All Internships
            </TableCell>
            <TableCell align="right">
537
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {internships.map(( row ) => (
            <TableRow key={row.key}>
              <TableCell
                component="th"
                scope="row"
              >
                {row.key}
              </TableCell>
              <TableCell align="right">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableContainer />
    </Paper>

  );
};

export default Dashboard;
