import React from 'react';
import { shallow } from 'enzyme';

import QRScan from './presenter';

describe(__filename, () => {
  it('validates Pauling URLs', () => {
    const wrapper = shallow(<QRScan onBarCodeRead={jest.fn()} />);

    const instance = wrapper.instance();
    expect(instance.isValidPaulingUrl('')).toEqual(false);
    expect(
      instance.isValidPaulingUrl(
        'https://pauling.lelab.tailordev.fr/posters/987b0371-ea96-46c1-a77c-04ff279c0b3a'
      )
    ).toEqual(true);
    expect(
      instance.isValidPaulingUrl(
        'http://pauling.lelab.tailordev.fr/posters/987b0371-ea96-46c1-a77c-04ff279c0b3a'
      )
    ).toEqual(true);
    expect(
      instance.isValidPaulingUrl(
        'http://pauling.lelab.tailordev.fr/posters/invalid-uuid'
      )
    ).toEqual(false);
  });
});
