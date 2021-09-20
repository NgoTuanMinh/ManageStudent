import { Button, Grid } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
  createStyles, createTheme, makeStyles, Theme,
  ThemeProvider
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { City, ListParams } from 'models';
import { useRef } from 'react';
import { ChangeEvent, default as React } from 'react';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
      marginRight: theme.spacing(2)
    },
    formControl: {
      margin: theme.spacing(1),
    }
  }),
);


const theme = createTheme({
  palette: {
    primary: blueGrey,
  },
});


export interface StudentFiltersProps {
    filter?: ListParams,
    cityList?: City[],
    onChange?: (newFilter: ListParams) => void,
    onSearchChange?: (newFilter: ListParams) => void
}

export default function StudentFilters({filter, cityList, onChange, onSearchChange}: StudentFiltersProps) {
  const classes = useStyles();
  const searchRef = useRef<HTMLInputElement>();
  const handleSearchChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (!onSearchChange) return ;
      var newFilter = {
          ...filter,
          _page: 1,
          name_like: event.target.value
      }
    onSearchChange(newFilter);
    }
  const handleSelectChange = (event: ChangeEvent<{name?: string, value: unknown}>) => {
    if (!onChange) return;
    var newFilter = {
      ...filter,
      _page: 1,
      city: (event.target.value as string) || undefined
    }
    onChange(newFilter);
  }
  const handleSort = (event: ChangeEvent<{name?: string, value: unknown}>) => {
    if (!onChange) return;
    var value = event.target.value;
    var [_sort, _order] = (value as string).split("_")
    var newFilter = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    }
    onChange(newFilter);
  }

  const clearFilter = () => {
    if (!onChange) return;
    const filterClear = {
      ...filter,
      _page: 1,
      _limit: 10,
      city: undefined,
      name_like: undefined,
      _sort: undefined,
      _order: undefined
    }
    onChange(filterClear);
    if (searchRef.current) {
      searchRef.current.value = '';
    }
    toast.success('hellooooooooooo');
    console.log("123333333");
    toast.error('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  return (
    <form className={classes.root} noValidate>
        <Grid container >
          <Grid item sm={12} md={4}>
            <ThemeProvider theme={theme}>
              <TextField
                className={classes.margin}
                label="Search by name"
                variant="outlined"
                size="small"
                onChange={handleSearchChange}
                fullWidth
                inputRef={searchRef}
              />
            </ThemeProvider>
          </Grid>
          <Grid item sm={12} md={3}>
              <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
                <InputLabel id="filter_by_city">City</InputLabel>
                <Select
                  labelId="filter_by_city"
                  id="demo-simple-select-outlined"
                  value={filter?.city ? filter?.city : ''}
                  onChange={handleSelectChange}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {cityList?.map((city, index) => <MenuItem key={index} value={city.code}>{city.name}</MenuItem>)}
                </Select>
              </FormControl>
          </Grid>
          <Grid item sm={12} md={3}>
              <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
                <InputLabel id="sort">Sort by</InputLabel>
                <Select
                  labelId="sort"
                  id="demo-simple-select-outlined"
                  value={filter?._sort ? `${filter._sort}_${filter._order}` : ''}
                  onChange={handleSort}
                  label="Sort by"
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value={"name_asc"}>Sort by Name ASC</MenuItem>
                  <MenuItem value={"name_desc"}>Sort by Name DESC</MenuItem>
                  <MenuItem value={"mark_asc"}>Sort by Mark ASC</MenuItem>
                  <MenuItem value={"mark_desc"}>Sort by Mark DESC</MenuItem>
                </Select>
              </FormControl>
          </Grid>
          <Button className={classes.formControl} variant="contained" color="secondary" size="small" onClick={clearFilter}>Clear filter</Button>
        </Grid>
      
    </form>
  );
}
