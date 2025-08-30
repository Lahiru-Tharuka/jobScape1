import reducer, { register } from '../../frontend/src/store/slices/userSlice.js';
import axios from 'axios';

jest.mock('axios');

describe('userSlice reducers', () => {
  it('handles registerRequest', () => {
    const state = reducer(undefined, { type: 'user/registerRequest' });
    expect(state.loading).toBe(true);
  });
});

describe('userSlice register thunk', () => {
  it('dispatches success on resolve', async () => {
    axios.post.mockResolvedValue({ data: { user: { name:'A' }, message:'done' } });
    const dispatch = jest.fn();
    await register({})(dispatch);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'user/registerSuccess' }));
  });
});
