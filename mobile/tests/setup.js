import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';
import 'jest-enzyme';

Enzyme.configure({ adapter: new Adapter() });

// Do not use development environment in the tests.
global.__DEV__ = false;

// Setup fetchMock global to be a sandbox which is restored after each test.
global.fetchMock = fetchMock;

// Setup sinon global to be a sandbox which is restored after each test.
const realSinon = sinon;

global.sinon = realSinon.sandbox.create();
global.sinon.createStubInstance = realSinon.createStubInstance;
global.sinon.format = realSinon.format;
global.sinon.assert = realSinon.assert;

beforeEach(() => {
  global.fetchMock.reset();
});

afterEach(() => {
  global.fetchMock.restore();
  global.sinon.restore();
});

jest.mock('react-native-camera', () => {
  const FakeComponent = () => null;

  FakeComponent.constants = {
    Aspect: {},
  };

  return FakeComponent;
});

jest.mock('react-native-config', () => {
  return {
    API_SERVER_URL: 'pauling.lelab.tailordev.fr',
  };
});

jest.mock('react-native-fetch-blob', () => ({
  DocumentDir: {},
  // Make the RNFetchBlob API compatible with `fetch`.
  fetch: (method, url, options) => global.fetch(url, {
    method,
    ...options,
  }),
}));

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}));
