import React, { useEffect, useState, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Axios from 'axios';
import MaterialTable from 'material-table';

// eslint-disable-next-line no-unused-vars
import Product from '../Product';
import RTL from '../RTL';
// eslint-disable-next-line no-unused-vars
import { FetchData } from '../../interface';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  tableContainer: {
    backgroundColor: theme.palette.background.default,
    transition: 'background-color 250ms linear',
  },
}));


function AllProducts() {
  const classes = useStyles();
  const [data, setData] = useState<FetchData[]>([]);
  const tableRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get('/api/all');
      setData(result.data);
    };

    fetchData();
  }, []);

  if (data!.length !== 0) {
    data!.map((d) => console.log(d));
    return (
      <div className={classes.root}>
        <div>
          <RTL>
            <MaterialTable
              components={{
                Container: (props) => (
                  <div className={classes.tableContainer}>
                    <div {...props} />
                  </div>
                ),
              }}
              localization={{
                toolbar: { searchPlaceholder: 'جستوجو' },
              }}
              options={{
                pageSize: 10,
                pageSizeOptions: [10, 20, 30],
              }}
              title="محصولات"
              columns={[
                { title: 'نام', field: 'title' },
                { title: 'ID', field: '_id' },
                {
                  title: 'banner',
                  field: 'banner',
                  render: (rowData) => (rowData.banner ? 'true' : 'false'),
                },
                {
                  title: 'دسته بندی',
                  field: 'category',
                  render: (rowData) => (rowData.category),
                },
              ]}
              data={data}
              detailPanel={(rowData) => (
                <Product
                  description={rowData.description}
                  title={rowData.title}
                  path={rowData.path}
                />
              )}
              tableRef={tableRef}
              onRowClick={(_event, _rowData, toggleDetailPanel) => toggleDetailPanel!()}
            />
          </RTL>
        </div>
      </div>
    );
  }
  return (
    <div>
      بارگذاری ...
    </div>
  );
}

export default AllProducts;
