import React from 'react';
import APP_CONSTANTS from "../../../../core/app_constants";
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar} from '@material-ui/data-grid';


const customerCondFilterModel = {
    items: [{ columnField: 'id', operatorValue: 'contains', value: '' }],
  };

  const useStyles = makeStyles({
    root: {
      '& .super-app-theme--header': {
        backgroundColor: 'blue',
      },
    },
  });
export default function BasicToolbarFilteringGrid(test) {
    const rows = test.data;
    const columns = test.cols;
    const classes = useStyles();
    return (
        <div className="container">
            <div className={classes.root} style={{ height: 600, width: '100%' }} >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    filterModel={customerCondFilterModel}
                    density="compact"
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    columnBuffer={2}
                    onSelectionModelChange={(newSelection) => {
                        console.log(newSelection.selectionModel);
                        onclick= async () => {
                            if (!newSelection.selectionModel) {
                                alert(newSelection.selectionModel)
                            } else {
                                sessionStorage.setItem(APP_CONSTANTS.CONFIG.sessionStorage.targetedCustomerId, newSelection.selectionModel);
                                window.location.href = "/CustomerDetails";
                            }
                            newSelection.selectionModel = "";
                        }
                    }}
                />
            </div>
        </div>
    );
}