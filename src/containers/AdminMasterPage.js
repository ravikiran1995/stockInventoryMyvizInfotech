import React, { useState, useEffect } from 'react';
import LayoutWrapper from '../components/utility/layoutWrapper';
import Papersheet from '../components/utility/papersheet';
import { FullColumn } from '../components/utility/rowColumn';
import IntlMessages from '../components/utility/intlMessages';

import Button, { IconButton } from '../components/uielements/button';
import TextField from '../components/uielements/textfield';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '../components/uielements/dialogs';

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

export default () => {
	const [manufactureList, setManufactureList] = useState([]);
	const [suppliersList, setSuppliersList] = useState([]);
	const [manufactureDilog, setManufactureDilog] = useState(false);
	const [suppliersDilog, setSuppliersDilog] = useState(false);

	const [manufacturesState, setManufacturesState] = useState({
		image_url: ''
	});
	const [suppliersState, setSuppliersState] = useState({
		image_url: ''
	});
	let handleManufactureSubmit = () => {
		// do final logic of submittion
		DataService.post(API.manufacture, manufacturesState).then(resp => {
			console.log("so respo", resp.data);
			handleRequestClose("MD")
			getManufacturesList();
			setManufacturesState({})
		}).catch(err => {
			console.log("err>>>>>>>", err)
		})
	}
	let handleSupplierSubmit = () => {
		// do final logic of submittion
		DataService.post(API.suplliers, suppliersState).then(resp => {
			console.log("so suppliers", resp.data)
			handleRequestClose("SD")
			getSuppliersList();
			setSuppliersState({})
		}).catch(err => {
			console.log("err>>>>>>>", err)
		})
	}


	let handleManufacturesChange = (key) => (e) => {
		setManufacturesState({ ...manufacturesState, [key]: e.target.value });
	};

	let handleSuppliersChange = (key) => (e) => {
		setSuppliersState({ ...suppliersState, [key]: e.target.value });
	};

	useEffect(() => {
		getManufacturesList();
		getSuppliersList();
		return
	}, []);

	let getManufacturesList = () => {
		DataService.get(API.manufacture).then(resp => {
			setManufactureList(resp.data.data)
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


	let renderActions = (action) => {
		return <IconButton onClick={() => handleOpenRequest(action)} color="primary" size={'medium'} aria-label="Add">
			<Icon>add_circle</Icon>
		</IconButton>
	}
	let handleRequestClose = (action) => {
		if (action === "MD") {
			setManufactureDilog(false)
		}
		if (action === "SD") {
			setSuppliersDilog(false)
		}
	}
	let handleOpenRequest = (action) => {
		if (action === "MD") {
			setManufactureDilog(true)
		}
		if (action === "SD") {
			setSuppliersDilog(true)
		}
	}
	return (
		<LayoutWrapper>
			<FullColumn>
				<Dialog open={manufactureDilog} onClose={() => handleRequestClose("MD")}>
					<DialogTitle>Add new Manufacturer</DialogTitle>
					<DialogContent style={{flexDirection:'column',display:'flex',width:'50vw'}}>
						<TextField
							label="Enter Title"
							id="title"
							style={{margin:'10px',maxWidth:'30vw'}}
							value={manufacturesState.title}
							onChange={handleManufacturesChange('title')}
						/>
						<TextField
							label="Enter Description"
							id="description"
							maxRows={2}
							style={{margin:'10px',maxWidth:'30vw'}}
							value={manufacturesState.description}
							onChange={handleManufacturesChange('description')}

						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => handleRequestClose("MD")} color="primary">
							Cancel
						</Button>
						<Button onClick={() => handleManufactureSubmit()} variant="contained" color="primary">
							Submit
						</Button>
					</DialogActions>
				</Dialog>
				<Papersheet title={<IntlMessages id="Manufactures List" />} actions={renderActions('MD')}>
					<TableHead>
						<TableRow>
							<TableCell>Manufacturer Name</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Manufactured On</TableCell>
							<TableCell>Edit</TableCell>
							<TableCell>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{manufactureList.map(n => {
							return (
								<TableRow
									hover
									onClick={event => this.handleClick(event, n.id)}
									onKeyDown={event => this.handleKeyDown(event, n.id)}
									key={n.id}
								>
									<TableCell>{n.title}</TableCell>
									<TableCell>{n.description}</TableCell>
									<TableCell>{moment(n.row_ts).format("DD/MM/YYYY")}</TableCell>
									<TableCell><IconButton onClick={()=>console.log("click")} color="secondary" aria-label="Add">
										<Icon>edit</Icon>
									</IconButton></TableCell>
									<TableCell><IconButton onClick={()=>console.log("click")} color="primary" aria-label="Add">
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

				</Papersheet>

				{/* suppliers Dilog */}

				<Dialog open={suppliersDilog} onClose={() => handleRequestClose("SD")}>
					<DialogTitle>Add new Suppliers</DialogTitle>
					<DialogContent style={{flexDirection:'column',display:'flex',width:'50vw'}}>
						<TextField
							label="Enter supplier name"
							id="name"
							style={{margin:'10px',maxWidth:'30vw'}}
							value={suppliersState.name}
							onChange={handleSuppliersChange('name')}
						/>
						<TextField
							label="Enter supplier email"
							id="email"
							style={{margin:'10px',maxWidth:'30vw'}}
							value={suppliersState.email}
							onChange={handleSuppliersChange('email')}
						/>
						<TextField
							label="Enter supplier phone no"
							id="phone"
							style={{margin:'10px',maxWidth:'30vw'}}
							value={suppliersState.phone}
							onChange={handleSuppliersChange('phone')}
						/>
						<TextField
							label="Enter supplier address"
							id="address"
							maxRows={3}
							style={{margin:'10px',maxWidth:'30vw'}}
							value={suppliersState.address}
							onChange={handleSuppliersChange('address')}
						/>
						
					</DialogContent>

					<DialogActions>
						<Button onClick={() => handleRequestClose("SD")} color="primary">
							Cancel
						</Button>
						<Button onClick={() => handleSupplierSubmit()} color="primary">
							Submit
						</Button>
					</DialogActions>
				</Dialog>
				<Papersheet title={<IntlMessages id="Suppliers List" />}
					actions={
						renderActions('SD')
					}
				>
					<TableHead>
						<TableRow>
							<TableCell>Supplier Name</TableCell>
							<TableCell>Supplier Email</TableCell>
							<TableCell>Supplier Contact</TableCell>
							<TableCell>Supplier Address</TableCell>
							<TableCell>Created On</TableCell>
							<TableCell>Edit</TableCell>
							<TableCell>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{suppliersList.map(n => {
							return (
								<TableRow
									hover
									onClick={event => this.handleClick(event, n.id)}
									onKeyDown={event => this.handleKeyDown(event, n.id)}
									key={n.id}
								>
									<TableCell>{n.name}</TableCell>
									<TableCell>{n.email}</TableCell>
									<TableCell>{n.phone}</TableCell>
									<TableCell>{n.address}</TableCell>
									<TableCell>{moment(n.row_ts).format("DD/MM/YYYY")}</TableCell>
									<TableCell><IconButton onClick={()=>console.log("click")} color="secondary" aria-label="Add">
										<Icon>edit</Icon>
									</IconButton></TableCell>
									<TableCell><IconButton onClick={()=>console.log("click")} color="primary" aria-label="Add">
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

				</Papersheet>

			</FullColumn>
		</LayoutWrapper>
	)
};
