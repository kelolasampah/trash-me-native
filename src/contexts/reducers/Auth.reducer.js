import {SET_CURRENT_PROFILE, SET_CURRENT_USER} from '../actions/Auth.actions';
import isEmpty from '../../assets/common/is-empty';

export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        userAccount: action.userAccount,
      };
    case SET_CURRENT_PROFILE:
      return {
        ...state,
        userProfile: action.userProfile,
      };
    default:
      return state;
  }
}
