jest.unmock('./index');

import React from 'react';
import { shallow, mount, render } from 'enzyme';

import NavPanel from './index'

describe('NavPanel testing', function() {
    it('Render buttons in nav panel', function() {
        const wrapper = shallow(<NavPanel />);
        expect(wrapper.find('button').length).toBe(3);
    });

    it('Render container', function() {
        expect(mount(<NavPanel />).find('.nav-panel').length).toBe(1);
    });

});
