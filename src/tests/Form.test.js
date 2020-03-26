import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import Form from '../components/Form';


const setup = (props = {}) => {
    const component = shallow(<Form {...props}/>);
    return component;
}

describe('Alert component', () => {
    let component = setup();

    it('component should render', () => {
        const wrapper = component.find('.form-center');
        expect(wrapper.length).toBe(1);
    });

    it('snapshot should match', () => {
        const wrapper = component.find('.form-center');
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('component should render charge input', () => {
        const wrapper = component.find('[data-testid="form-charge-input"]');
        expect(wrapper.length).toBe(1);
    });

    it('component should render amount input', () => {
        const wrapper = component.find('[data-testid="form-amount-input"]');
        expect(wrapper.length).toBe(1);
    });
    

})