import React from 'react';
import APP_CONSTANTS from "../../../../core/app_constants";
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar} from '@material-ui/data-grid';
import { Slider } from '@material-ui/core';


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
        <div className="container col-md-8">
            <div className={classes.root} style={{ height: 600, width: '100%' }} >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    filterModel={customerCondFilterModel}
                    density="compact"
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    autoHeight="true"

                    columnBuffer={2}
                    onSelectionModelChange={(newSelection) => {
                        onclick= async () => {
                            if (newSelection.selectionModel) {
                                sessionStorage.setItem(APP_CONSTANTS.CONFIG.sessionStorage.targetedUsername, rows[newSelection.selectionModel - 1]["username"]);
                                newSelection.selectionModel = ""
                                window.location.href = "/UserDetails";
                            } else {
                                newSelection.selectionModel = ""
                                //window.location.href = "/UserDetails";
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}