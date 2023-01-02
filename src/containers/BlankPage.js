import React, { useState } from 'react';
import LayoutWrapper from '../components/utility/layoutWrapper';
import Papersheet from '../components/utility/papersheet';
import { FullColumn } from '../components/utility/rowColumn';
import IntlMessages from '../components/utility/intlMessages';
import { Field, reduxForm } from 'redux-form';
import {
	FormControl,
	FormHelperText,
	FormControlLabel,
} from '../components/uielements/form';
import Button from '../components/uielements/button';
import TextField from '../components/uielements/textfield';
import Radio, { RadioGroup } from '../components/uielements/radio';
import Checkbox from '../components/uielements/checkbox';
import asyncValidate from '../helpers/asyncValidate';
import validate from '../helpers/validate';
import { DataService } from '../config/dataService/dataService';
import { API } from '../config/api';



export default () => {
	const [state, setState] = useState({
		image_url:''
	});
	let handleSubmit = () => {
		// do final logic of submittion
		console.log(">>>>", state)
		DataService.post(API.manufacture, state).then(resp => {
			console.log("so respo", resp.data)
		}).catch(err => {
			console.log("err>>>>>>>", err)
		})
	}

	let handleChange = (key) => (e) => {
		setState({ ...state, [key]: e.target.value });
	};

	return (
		<LayoutWrapper>
			<FullColumn>
				<Papersheet title={<IntlMessages id="sidebar.adminMaster" />}>
					<form >
						<div >
							<div >
								<TextField
									label="Enter Title"
									id="title"
									value={state.title}
									onChange={handleChange('title')}
								/>
							</div>
							<div >
								<TextField
									label="Enter Description"
									id="description"
									value={state.description}
									onChange={handleChange('description')}

								/>
							</div>

						</div>

						<div >
							<div >
								<Button
									variant="contained"
									color='primary'
									onClick={() => handleSubmit(state)}
								>
									Submit
								</Button>
							</div>
						</div>
					</form>
				</Papersheet>
			</FullColumn>
		</LayoutWrapper>
	)
};
