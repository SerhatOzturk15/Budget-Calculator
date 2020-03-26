import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import Alert from '../components/Alert';

const setup = (props = {}) => {
    const component = shallow(<Alert {...props}/>);
    return component;
}

describe('Alert component without props', () => {
    let component = setup();

    it('component should render', () => {
        const wrapper = component.find('.alert');
        expect(wrapper.length).toBe(1);
    });

    it('snapshot should match', () => {
        const wrapper = component.find('.alert');
        expect(toJson(wrapper)).toMatchSnapshot();
    });

})

describe('Alert component with props', () => {
    const props = {
        type: 'danger',
        text: 'text'
    }
    let component =setup(props);

    it('component should render .alert-danger class', () => {
        const wrapper = component.find('.alert-danger');
        expect(wrapper.length).toBe(1);
    });


    it('component should render amount input', () => {
        const wrapper = component.find('[data-testid="alert-test"]');
        expect(wrapper.length).toBe(1);
    });

})