import React from 'react';
import LayoutWrapper from '../components/utility/layoutWrapper';
import Papersheet from '../components/utility/papersheet';
import { FullColumn } from '../components/utility/rowColumn';
import IntlMessages from '../components/utility/intlMessages';

export default () => (
	<LayoutWrapper>
		<FullColumn>
			<Papersheet title={<IntlMessages id="sidebar.contacts" />}>
				This is a Contacts page of all vendors
			</Papersheet>
		</FullColumn>
	</LayoutWrapper>
);
