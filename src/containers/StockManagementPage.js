import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../components/utility/layoutWrapper';
import Papersheet from '../components/utility/papersheet';
import { FullColumn } from '../components/utility/rowColumn';
import IntlMessages from '../components/utility/intlMessages';

import Button, { IconButton } from '../components/uielements/button';
import TextField from '../components/uielements/textfield';
import Input, { InputLabel } from '../components/uielements/input';
import { MenuItem } from '../components/uielements/menus';
import Select from '../components/uielements/select';

import { DataService } from '../config/dataService/dataService';
import { API } from '../config/api';
import {
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
} from '../components/uielements/table';
import Icon from '../components/uielements/icon';
import moment from 'moment';
import _ from 'lodash';
import { FormControl, InputAdornment } from '@material-ui/core';
import {
	DatePicker,
} from '../components/uielements/materialUiPicker';

export default () => {
	const [manufactureList, setManufactureList] = useState([]);
	const [suppliersList, setSuppliersList] = useState([]);
	const [stocksList, setStocksList] = useState([]);
	const [commonDropdown, setCommonDropDown] = useState({});
	const [commonDropdownSizes, setCommonDropDownSizes] = useState({});
	const [enableAdd, setEnableAdd] = useState(false);
	const [stocks, setStocks] = useState({
		createdDate: moment()
	});
	const [meta, setMeta] = useState({});

	useEffect(() => {
		getManufacturesList();
		getSuppliersList();
		getCommonDropdownList();
		return;
	}, []);

	let getManufacturesList = () => {
		DataService.get(API.manufacture).then(resp => {
			setManufactureList(resp.data.data);
			console.log("MAMAM", resp.data.data)
		}).catch(err => {
			console.log(">>>>>>", err)
		})
	}

	let getSuppliersList = () => {
		DataService.get(API.suplliers).then(resp => {
			setSuppliersList(resp.data.data)
		}).catch(err => {
			console.log(">>>>>>", err)
		})
	}

	let getCommonDropdownList = () => {
		DataService.get(API.common).then(resp => {
			let result = _.groupBy(resp.data.data, 'FLD_IDENTITY');
			let resultSizes = _.groupBy(result['SIZE'], 'category');
			setCommonDropDown(result);
			setCommonDropDownSizes(resultSizes)
		}).catch(err => {
			console.log(">>>>>>", err)
		})
	}

	let handleStocksChange = (key) => (e) => {
		setStocks({ ...stocks, [key]: e.target.value });
		if (enableAdd) {
			setEnableAdd(false)
		}
	};

	let handleMetaChange = (key) => (e) => {
		setMeta({ ...meta, [key]: e.target.value });
	};
	let handleDateChange = date => {
		setStocks({ ...stocks, createdDate: date });
	};

	let handleStockBasic = () => {
		setEnableAdd(true);
		getAllCorrespondingStocks();
	}

	let addNewStocks = () => {
		let payload = {
			...stocks,
			createdDate: moment(stocks.createdDate),
			meta: meta,
		}
		console.log(">>>>>>>>>>>FINAL", payload);
		DataService.post(API.stocks, payload).then(resp => {
			console.log("so suppliers", resp.data);

			getAllCorrespondingStocks()
		}).catch(err => {
			console.log("err>>>>>>>", err)
		})
	}
	let getAllCorrespondingStocks = () => {
		let filter = {
			supplier: stocks.supplier,
			manufacture: stocks.manufacture,
		}
		console.log("FILTER PAA", filter)
		DataService.post(`${API.stocks}/filter`, filter).then(resp => {
			console.log("find by payloadd", resp);
			setStocksList(resp.data.data)
		}).catch(err => {
			console.log(">>>>>>", err)
		})
	}


	return (<LayoutWrapper>
		<FullColumn>
			<Papersheet title={<IntlMessages id="sidebar.stockManagement" />}>
				<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
					<FormControl style={{ flex: 1, margin: 10 }}>
						<InputLabel htmlFor="manufacturer">Select Manufacturer</InputLabel>
						<Select
							id="manufacturer"
							style={{ maxWidth: '20vw' }}
							value={stocks.manufacture}
							onChange={handleStocksChange('manufacture')}
						>
							{_.map(manufactureList, (item => {
								return <MenuItem value={item.title}>{item.title}</MenuItem>
							})
							)}
						</Select>
					</FormControl>
					<FormControl style={{ flex: 1, margin: 10 }}>
						<TextField
							label="Enter Invoice Number"
							id="invoiceNumber"
							style={{ maxWidth: '20vw' }}
							type={'number'}
							value={stocks.invoiceNumber}
							onChange={handleStocksChange('invoiceNumber')}
						/>
					</FormControl>

				</div>
				<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

					<FormControl style={{ flex: 1, margin: 10 }}>
						<InputLabel htmlFor="supplier">Select Supplier</InputLabel>
						<Select
							id="supplier"
							style={{ maxWidth: '20vw' }}
							value={stocks.supplier}
							onChange={handleStocksChange('supplier')}
						>
							{_.map(suppliersList, (item => {
								return <MenuItem value={item.name}>{item.name}</MenuItem>
							})
							)}
						</Select>
					</FormControl>
					<FormControl style={{ flex: 1, margin: 10 }}>
						<DatePicker
							label="Date"
							id="createdDate"
							style={{ maxWidth: '20vw' }}
							value={stocks.createdDate}
							onChange={(date) => handleDateChange(date)}

							animateYearScrolling={false}
						/>
					</FormControl>
				</div>
				<Button style={{ margin: '10px' }} onClick={() => handleStockBasic()} variant="contained" color="secondary">
					Proceed
				</Button>
			</Papersheet>
			{
				enableAdd ? <Papersheet>
					<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
						<FormControl style={{ flex: 1, margin: 10 }}>
							<InputLabel htmlFor="category">Select Category</InputLabel>
							<Select
								id="category"
								style={{ maxWidth: '20vw' }}
								value={meta.category}
								onChange={handleMetaChange('category')}
							>
								{_.map(commonDropdown.CATEGORY, (item => {
									return <MenuItem value={item.code}>{item.title}</MenuItem>
								})
								)}
							</Select>
						</FormControl>
						<FormControl style={{ flex: 1, margin: 10 }}>
							<InputLabel htmlFor="type">Select Type</InputLabel>
							<Select
								id="type"
								style={{ maxWidth: '20vw' }}
								value={meta.type}
								onChange={handleMetaChange('type')}
							>
								{_.map(commonDropdown.TYPES, (item => {
									return <MenuItem value={item.code}>{item.title}</MenuItem>
								})
								)}
							</Select>
						</FormControl>
						<FormControl style={{ flex: 1, margin: 10 }}>
							<InputLabel htmlFor="category">Select Container</InputLabel>
							<Select
								id="container"
								style={{ maxWidth: '20vw' }}
								value={meta.container}
								onChange={handleMetaChange('container')}
							>
								{_.map(commonDropdown.CONTAINER, (item => {
									return <MenuItem value={item.code}>{item.title}</MenuItem>
								})
								)}
							</Select>
						</FormControl>

					</div>
					<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
						<FormControl style={{ flex: 1, margin: 10 }}>
							<InputLabel htmlFor="width">Select width</InputLabel>
							<Select
								id="width"
								style={{ maxWidth: '20vw' }}
								value={meta.width}
								onChange={handleMetaChange('width')}
								startAdornment={<InputAdornment position="start">Mtr.</InputAdornment>}
							>
								{_.map(commonDropdownSizes.WIDTH, (item => {
									return <MenuItem value={item.code}>{item.title}</MenuItem>
								})
								)}
							</Select>
						</FormControl>
						<FormControl style={{ flex: 1, margin: 10 }}>
							<InputLabel htmlFor="height">Select Height</InputLabel>
							<Select
								id="height"
								style={{ maxWidth: '20vw' }}
								value={meta.height}
								onChange={handleMetaChange('height')}
								startAdornment={<InputAdornment position="start">Mtr.</InputAdornment>}
							>
								{_.map(commonDropdownSizes.HEIGHT, (item => {
									return <MenuItem value={item.code}>{item.title}</MenuItem>
								})
								)}
							</Select>
						</FormControl>
						<FormControl style={{ flex: 1, margin: 10 }}>
							<InputLabel htmlFor="weight">Select container Weight</InputLabel>
							<Select
								id="weight"
								style={{ maxWidth: '20vw' }}
								value={meta.weight}
								onChange={handleMetaChange('weight')}
								startAdornment={<InputAdornment position="start">Kg.</InputAdornment>}
							>
								{_.map(commonDropdownSizes.WEIGHT, (item => {
									return <MenuItem value={item.code}>{item.title}</MenuItem>
								})
								)}
							</Select>
						</FormControl>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

						<FormControl style={{ flex: 1, margin: 10 }}>
							<InputLabel htmlFor="color">Select Color</InputLabel>
							<Select
								id="color"
								style={{ maxWidth: '20vw' }}
								value={meta.color}
								onChange={handleMetaChange('color')}
							>
								{_.map(commonDropdown.COLOUR, (item => {
									return <MenuItem value={item.code}>{item.title}</MenuItem>
								})
								)}
							</Select>
						</FormControl>
						<FormControl style={{ flex: 1, margin: 10 }}>
							<TextField
								label="Enter Quantity"
								id="quantity"
								style={{ maxWidth: '20vw' }}
								type={'number'}
								value={meta.quantity}
								onChange={handleMetaChange('quantity')}
							/>
						</FormControl>
						<FormControl style={{ flex: 1, margin: 10 }}></FormControl>
					</div>

					<Button style={{ margin: '10px' }} onClick={() => addNewStocks()} variant="contained" color="primary">
						Add
					</Button>
				</Papersheet> : null
			}

			{stocksList.length > 0 ? <Papersheet>
				<TableHead>
					<TableRow>
						<TableCell>Sq.No</TableCell>
						<TableCell>Manufacturer</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Weight</TableCell>
						<TableCell>Length(Mtr.)</TableCell>
						<TableCell>Container</TableCell>
						<TableCell>Color</TableCell>
						<TableCell>Qty</TableCell>
						<TableCell>Bar Code</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{stocksList.map((n, index) => {
						return (
							<TableRow
								hover
								key={n._id}
							>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{n.manufacture}</TableCell>
								<TableCell>{`${n.meta.category}-${n.meta.type}`}</TableCell>
								<TableCell>{`${n.meta.weight}`}</TableCell>
								<TableCell>{`${n.meta.width} x ${n.meta.height}`}</TableCell>
								<TableCell>{`${n.meta.container}`}</TableCell>
								<TableCell>{`${n.meta.color}`}</TableCell>
								<TableCell>{`${n.meta.quantity}`}</TableCell>
								<TableCell>{`${n.barcode}`}</TableCell>
								<TableCell><IconButton onClick={() => console.log("click")} color="primary" aria-label="Add">
									<Icon>delete</Icon>
								</IconButton></TableCell>
							</TableRow>
						);
					})}
				</TableBody>
				<TableFooter>
					{/* <TableRow>
									<TablePagination
										count={data.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onChangePage={this.handleChangePage}
										onChangeRowsPerPage={this.handleChangeRowsPerPage}
									/>
								</TableRow> */}
				</TableFooter>



			</Papersheet> : null}
		</FullColumn>
	</LayoutWrapper>
	)
};
