import "./styles.css";
import MaterialTable from "material-table";
import _ from "lodash";
import { ArrowUpward } from "@material-ui/icons";
import React from "react";
import * as colors from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export default function App() {
  const theme = createMuiTheme({
    overrides: {
      MuiTableSortLabel: {
        root: {
          color: "#fff",
          "&:hover": {
            color: "#fff !important"
          }
        },
        active: {
          color: "#fff !important"
        }
      }
    }
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <MaterialTable
          title="Remote Data Sort Demo"
          columns={[
            {
              title: "Avatar",
              field: "avatar",
              sorting: false,
              render: (rowData) => (
                <img
                  style={{ height: 36, borderRadius: "50%" }}
                  src={rowData.avatar}
                  alt={rowData.avatar}
                />
              )
            },
            { title: "Id", field: "id" },
            { title: "First Name", field: "first_name" },
            { title: "Last Name", field: "last_name" }
          ]}
          options={{
            search: false,
            paging: false,

            headerStyle: {
              backgroundColor: "black",
              color: "white"
            }
          }}
          icons={{
            SortArrow: React.forwardRef((props, ref) => (
              <span>
                <ArrowUpward
                  {...props}
                  ref={ref}
                  style={{ color: colors.grey[100] }}
                />
              </span>
            ))
          }}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = "https://reqres.in/api/users?";
              url += "per_page=" + query.pageSize;
              url += "&page=" + (query.page + 1);
              console.debug(`request url: ${url}`);
              fetch(url)
                .then((response) => response.json())
                .then((result) => {
                  resolve({
                    data:
                      query.orderBy && query.orderDirection
                        ? _.orderBy(
                            result.data,
                            [query.orderBy.field],
                            [query.orderDirection]
                          )
                        : result.data,
                    page: result.page - 1,
                    totalCount: result.total
                  });
                });
            })
          }
        />
      </ThemeProvider>
    </div>
  );
}
