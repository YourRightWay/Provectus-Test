jest.unmock('./index');

import React from 'react';
import { shallow, mount, render } from 'enzyme';

import StateNotify from './index'

describe('StateNotify testing', function() {
    it("Render container", function() {
        expect(mount(<StateNotify />).find('.get-state').length).toBe(1);
    });

    it('Render span', function() {
        const wrapper = shallow(<StateNotify />);
        expect(wrapper.find('span').length).toBe(1);
    });
});
