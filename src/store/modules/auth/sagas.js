import { takeLatest, call, put, all } from 'redux-saga/effects'

import history from '~/services/history'
import api from '~/services/api'
import msg from '~/utils/message'

import { signInSuccess, signFailure } from '~/store/modules/auth/actions'

export function* signIn({ payload }) {
  try {
    const { email, password } = payload

    const response = yield call(api.post, 'sessions', { email, password })

    const { token, user } = response.data

    api.defaults.headers.Authorization = `Bearer ${token}`

    yield put(signInSuccess(token, user))

    history.push('/order')
  } catch (error) {
    msg.box('Falha na autenticação, verifique seu dados!', 'error')
    yield put(signFailure())
  }
}

export function setToken({ payload }) {
  if (!payload) return

  const { token } = payload.auth

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export function signOut() {
  history.push('/')
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
])
