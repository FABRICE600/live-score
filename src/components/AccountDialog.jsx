import { useState } from 'react'
import { LockKeyhole, Mail, UserRound, X } from 'lucide-react'

export default function AccountDialog({
  account,
  configured,
  error,
  message,
  mode,
  onAuthenticate,
  onClose,
  onModeChange,
  onSignOut,
  open,
  pending,
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!open) return null

  async function handleSubmit(event) {
    event.preventDefault()
    await onAuthenticate({ email, password, mode })
  }

  return (
    <div className="account-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-title">
        <button type="button" className="account-close" onClick={onClose} aria-label="Close account dialog">
          <X size={18} />
        </button>

        {account ? (
          <>
            <div className="account-icon"><UserRound size={20} /></div>
            <p className="eyebrow">LiveScore account</p>
            <h2 id="account-title">You are signed in</h2>
            <p className="account-description">{account.email}</p>
            <p className="account-message">Your match favourites are synced to your account.</p>
            <button type="button" className="account-submit" onClick={onSignOut} disabled={pending}>
              {pending ? 'Please wait...' : 'Sign out'}
            </button>
          </>
        ) : (
          <>
            <div className="account-icon"><UserRound size={20} /></div>
            <p className="eyebrow">LiveScore account</p>
            <h2 id="account-title">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
            <p className="account-description">Save your favourite matches across devices.</p>

            {!configured ? (
              <p className="account-alert" role="alert">Supabase is not configured. Add the project URL and publishable key to the frontend environment.</p>
            ) : (
              <form className="account-form" onSubmit={handleSubmit}>
                <label>
                  Email
                  <span className="account-input"><Mail size={16} /><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></span>
                </label>
                <label>
                  Password
                  <span className="account-input"><LockKeyhole size={16} /><input type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required /></span>
                </label>
                {error && <p className="account-alert" role="alert">{error}</p>}
                {message && <p className="account-message" role="status">{message}</p>}
                <button type="submit" className="account-submit" disabled={pending}>
                  {pending ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Sign in'}
                </button>
              </form>
            )}

            {configured && (
              <button type="button" className="account-switch" onClick={() => onModeChange(mode === 'signup' ? 'signin' : 'signup')}>
                {mode === 'signup' ? 'Already have an account? Sign in' : 'New to LiveScore? Create an account'}
              </button>
            )}
          </>
        )}
      </section>
    </div>
  )
}