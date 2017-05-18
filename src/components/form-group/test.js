jest.unmock('./index');

import React from 'react';
import { shallow, mount, render } from 'enzyme';

import FormGroup from './index'

describe('FormGroup testing', function() {
    it('Render label and input', function() {
        const wrapper = shallow(<FormGroup />);
        expect(wrapper.find('label').length).toBe(1);
        expect(wrapper.find('input').length).toBe(1);
    });
});
